import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { chromium } from 'playwright-core';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const htaccess = await readFile(resolve(dist, '.htaccess'), 'utf8');
const csp = htaccess.match(/Content-Security-Policy "([^"]+)"/)[1];
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
let browser;
before(async () => { browser = await chromium.launch({ channel: 'chrome', headless: true }); });
after(async () => { await browser?.close(); });

const turnstileMock = `window.__verification = {token:'', options:null, resets:0};
window.turnstile = {
  render(container, options) { window.__verification.options=options; return 'test-widget'; },
  reset() { window.__verification.token=''; window.__verification.resets++; },
  getResponse() { return window.__verification.token; },
  isExpired() { return !window.__verification.token; }
};`;

async function fixture({ privacy, hostname = 'lectix.fr', blockTurnstile = false } = {}) {
  const context = await browser.newContext();
  if (privacy) await context.addInitScript((key) => Object.defineProperty(navigator, key, {get: () => key === 'doNotTrack' ? '1' : true}), privacy);
  const events = [];
  const posts = [];
  const unexpected = [];
  const pageErrors = [];
  // Toutes les requêtes sont interceptées : aucun événement ni message réel n'est envoyé.
  await context.route('**/*', async (route) => {
    const request = route.request();
    if (process.env.TEST_DEBUG) console.log('request', request.method(), request.url(), request.postDataBuffer()?.subarray(0,100).toString('hex'));
    const url = new URL(request.url());
    if (url.hostname === 'challenges.cloudflare.com') {
      if (blockTurnstile) return route.abort();
      return route.fulfill({ contentType:'application/javascript', body:turnstileMock });
    }
    if (['eu.i.posthog.com', 'eu-assets.i.posthog.com'].includes(url.hostname)) {
      const feature = url.pathname.includes('web-vitals') ? 'web-vitals' : url.pathname.includes('exception-autocapture') ? 'exception-autocapture' : null;
      if (feature) return route.fulfill({contentType:'application/javascript', body:await readFile(resolve(root, `node_modules/posthog-js/dist/${feature}.js`))});
      let body = request.postDataBuffer();
      if (body?.length) {
        if (body[0] === 0x1f && body[1] === 0x8b) body = gunzipSync(body);
        let text = body.toString();
        if (text.startsWith('data=')) text = Buffer.from(new URLSearchParams(text).get('data'), 'base64').toString();
        try {
          const payload = JSON.parse(text);
          if(process.env.TEST_DEBUG) console.log('payload',JSON.stringify(payload).slice(0,1600));
          events.push(...(payload.batch || (Array.isArray(payload) ? payload : [payload])));
        } catch { unexpected.push(`undecodable analytics payload ${url.pathname}`); }
      }
      return route.fulfill({contentType:'application/json', body:'{"status":1}'});
    }
    if (url.hostname !== hostname) { unexpected.push(url.hostname); return route.abort(); }
    if (request.method() === 'POST') { posts.push(request.postData()); return route.fulfill({contentType:'text/html', body:'<p>Test local : aucun e-mail envoyé.</p>'}); }
    let path = resolve(dist, '.' + decodeURIComponent(url.pathname));
    if (!path.startsWith(dist + sep) && path !== dist) return route.abort();
    if (url.pathname.endsWith('/')) path = resolve(path, 'index.html');
    let body, status = 200;
    try { body = await readFile(path); }
    catch { body = await readFile(resolve(dist, '404.html')); path = resolve(dist, '404.html'); status = 404; }
    return route.fulfill({status, body, contentType:mime[extname(path)] || 'application/octet-stream', headers:{'Content-Security-Policy':csp}});
  });
  const page = await context.newPage();
  page.on('pageerror', error => { pageErrors.push(error.message); if(process.env.TEST_DEBUG) console.log('pageerror',error.message); });
  if(process.env.TEST_DEBUG) page.on('console',message=>console.log('console',message.text()));
  return { context, page, events, posts, unexpected, pageErrors, base:`https://${hostname}` };
}

async function eventually(predicate, message, timeout=10000) {
  const end = Date.now()+timeout;
  while (Date.now()<end) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve,50)); }
  assert.ok(predicate(), message);
}

for (const privacy of ['doNotTrack','globalPrivacyControl','local']) {
  test(`aucune collecte : ${privacy}`, async () => {
    const f = await fixture({privacy:privacy === 'local' ? undefined : privacy, hostname:privacy === 'local' ? 'localhost' : 'lectix.fr'});
    try {
      await f.page.goto(f.base+'/');
      await f.page.waitForTimeout(600);
      assert.equal(f.events.length,0);
      assert.equal(await f.page.evaluate(() => sessionStorage.length),0);
      assert.deepEqual(await f.context.cookies(),[]);
      assert.deepEqual(f.pageErrors,[]);
      assert.deepEqual(f.unexpected,[]);
    } finally { await f.context.close(); }
  });
}

test('pages vues, clics, Web Vitals, exceptions et diagnostics sans cookie', async () => {
  const f = await fixture();
  try {
    await f.page.goto(f.base+'/?email=private@example.test#private');
    await f.page.evaluate(() => { const link = document.querySelector('a[href="/usages/"]'); link.addEventListener('click',e=>e.preventDefault()); link.click(); setTimeout(()=>{throw new Error('lectix-test-exception');},0); });
    await eventually(()=>['$pageview','$autocapture','$web_vitals','$exception'].every(name=>f.events.some(e=>e.event===name)), 'les quatre familles d’événements doivent être conservées');
    const view=f.events.find(e=>e.event==='$pageview');
    assert.equal(view.properties.$current_url,'https://lectix.fr/');
    assert.equal(view.properties.site_page_status,200);
    assert.ok(view.properties.$app_version);
    assert.equal(typeof view.properties.navigation_ttfb_ms,'number');
    assert.ok(f.events.some(e=>e.event==='$web_vitals' && typeof e.properties.$web_vitals_FCP_value==='number'));
    await f.page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=> 'hidden'});document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new PageTransitionEvent('pagehide'));});
    await eventually(()=>f.events.some(e=>e.event==='$pageleave'),'page quittée conservée');
    assert.equal(JSON.stringify(f.events).includes('private@example.test'),false);
    assert.deepEqual(await f.context.cookies(),[]);
    assert.equal(await f.page.evaluate(()=>localStorage.length),0);
    assert.deepEqual(f.unexpected,[]);
    assert.ok(f.pageErrors.every(message=>message==='lectix-test-exception'));
  } finally { await f.context.close(); }
});

test('une page introuvable est identifiée séparément', async () => {
  const f=await fixture();
  try {
    const response=await f.page.goto(f.base+'/page-absente/');
    assert.equal(response.status(),404);
    await eventually(()=>f.events.some(e=>e.event==='$pageview'),'vue 404 capturée');
    assert.equal(f.events.find(e=>e.event==='$pageview').properties.site_page_status,404);
  } finally { await f.context.close(); }
});

test('Contact : erreur, reprise, expiration, protection de la saisie et absence de fuite', async () => {
  const f=await fixture();
  try {
    await f.page.goto(f.base+'/contact/?status=%22%5Dinvalid%5B');
    await f.page.waitForFunction(()=>Boolean(window.__verification?.options));
    const submit=f.page.locator('button[type="submit"]');
    assert.equal(await submit.isDisabled(),true);
    assert.equal(await f.page.locator('[data-verification-retry]').isVisible(),false);
    for(const [name,value] of Object.entries({name:'Private Name',email:'private@example.test',subject:'Private Subject',message:'Private Message'})) await f.page.locator(`[name="${name}"]`).fill(value);
    await f.page.evaluate(()=>window.__verification.options['error-callback']('110200'));
    assert.equal(await f.page.locator('[data-verification-retry]').isVisible(),true);
    await f.page.locator('[data-verification-retry]').click();
    assert.equal(await f.page.evaluate(()=>window.__verification.resets),1);
    assert.equal(await f.page.locator('[name="message"]').inputValue(),'Private Message');
    await f.page.evaluate(()=>{window.__verification.token='private-turnstile-token';window.__verification.options.callback('private-turnstile-token');});
    assert.equal(await submit.isEnabled(),true);
    assert.equal(await f.page.locator('[data-verification-retry]').isVisible(),false);
    await f.page.evaluate(()=>window.__verification.options['expired-callback']());
    assert.equal(await submit.isDisabled(),true);
    await f.page.evaluate(()=>document.querySelector('form').requestSubmit());
    assert.equal(f.posts.length,0);
    await f.page.evaluate(()=>{window.__verification.token='private-turnstile-token';window.__verification.options.callback('private-turnstile-token');});
    await eventually(()=>f.events.some(e=>e.event==='contact_verification_error'),'diagnostic technique de vérification capturé');
    const serialized=JSON.stringify(f.events);
    for(const privateValue of ['Private Name','private@example.test','Private Subject','Private Message','private-turnstile-token']) assert.equal(serialized.includes(privateValue),false,privateValue);
    const technical=f.events.find(e=>e.event==='contact_verification_error');
    assert.equal(technical.properties.reason,'challenge');
    assert.equal(technical.properties.code,'110200');
    await submit.click();
    await eventually(()=>f.posts.length===1,'soumission autorisée après vérification');
    assert.deepEqual(f.pageErrors,[]);
    assert.deepEqual(f.unexpected,[]);
  } finally { await f.context.close(); }
});

test('Contact : script bloqué, réessai et retour arrière', async () => {
  const f=await fixture({blockTurnstile:true});
  try {
    await f.page.goto(f.base+'/contact/');
    await f.page.locator('[data-verification-retry]').waitFor({state:'visible'});
    assert.match(await f.page.locator('[data-verification-status]').textContent(),/n’a pas pu se charger/);
    assert.equal(await f.page.locator('button[type="submit"]').isDisabled(),true);
    await f.page.route('https://challenges.cloudflare.com/**',route=>route.fulfill({contentType:'application/javascript',body:turnstileMock}));
    await f.page.locator('[data-verification-retry]').click();
    await f.page.waitForFunction(()=>Boolean(window.__verification?.options));
    await f.page.evaluate(()=>{window.__verification.token='test';window.__verification.options.callback('test');window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));});
    assert.equal(await f.page.locator('button[type="submit"]').isDisabled(),true);
    assert.equal(await f.page.evaluate(()=>window.__verification.resets),1);
    assert.deepEqual(f.pageErrors,[]);
  } finally { await f.context.close(); }
});
