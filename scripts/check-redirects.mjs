import assert from 'node:assert/strict';

const base = process.env.LECTIX_TEST_BASE_URL;
if (!base) throw new Error('Définir LECTIX_TEST_BASE_URL vers un serveur Apache de test servant dist/.');
const cases = [
  ['/produit/dcc-braking-module/', '/produit/module-de-freinage-dcc/'],
  ['/produit/dcc-braking-module', '/produit/module-de-freinage-dcc/'],
  ['/produit/dcc-braking-module-3a/', '/produit/module-de-freinage-dcc-3a/'],
  ['/produit/lec011001/documents/manual_fr.pdf/', '/notices/LEC011001-notice-fr.pdf'],
  ['/produit/lec011001/documents/manual_fr.pdf', '/notices/LEC011001-notice-fr.pdf'],
  ['/produit/lec008011/documents/LEC008011_manual_FR.pdf/', '/notices/LEC008011-notice-fr.pdf'],
  ['/produit/lec001020/documents/Breaking_module_manual.pdf/', '/notices/LEC001020-notice-fr.pdf'],
  ['/basket/', '/produits/'], ['/commander', '/produits/'],
  ['/validation-de-commande/', '/produits/'], ['/sitemap.xml/', '/sitemap-index.xml'],
  ['/static/LEC001021/BM1-wiring-diagram.png/', '/downloads/schemas/lec001021-cablage.png'],
  ['/produits/lost-password/', '/produits/'],
];
for (const [from, to] of cases) {
  const response = await fetch(new URL(from, base), { redirect:'manual', signal:AbortSignal.timeout(5000) });
  assert.equal(response.status,301,from);
  const location=new URL(response.headers.get('location'),base);
  await response.arrayBuffer();
  assert.equal(location.pathname,to,from);
  const destination=await fetch(new URL(to,base),{redirect:'manual', signal:AbortSignal.timeout(5000)});
  assert.equal(destination.status,200,to);
  await destination.arrayBuffer();
  console.log(`301 → 200 : ${from} → ${to}`);
}
const unknown=await fetch(new URL('/page-absente-pour-le-test/',base),{redirect:'manual'});
assert.equal(unknown.status,404,'Les URL inconnues doivent rester des 404');
console.log('404 conservée pour une URL inconnue.');
