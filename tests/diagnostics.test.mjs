import assert from 'node:assert/strict';
import { test } from 'node:test';
import { navigationDiagnostics } from '../src/lib/analytics-diagnostics.ts';

test('temps réseau, traitement et transfert restent séparés', () => {
  const result=navigationDiagnostics({type:'reload',startTime:0,requestStart:50,responseStart:180,responseEnd:200,domInteractive:250,domContentLoadedEventEnd:300,loadEventEnd:0,transferSize:5000,encodedBodySize:4500,decodedBodySize:10000},{effectiveType:'3g',saveData:true});
  assert.equal(result.navigation_ttfb_ms,180);
  assert.equal(result.navigation_server_wait_ms,130);
  assert.equal(result.navigation_download_ms,20);
  assert.equal(result.navigation_dom_ready_ms,300);
  assert.equal(result.navigation_type,'reload');
  assert.equal(result.network_effective_type,'3g');
  assert.equal(result.network_save_data,true);
  assert.equal('navigation_load_ms' in result,false,'chargement non terminé : ne pas publier zéro');
});
test('API absente, valeurs invalides et données arbitraires sont ignorées', () => {
  assert.deepEqual(navigationDiagnostics(),{});
  const result=navigationDiagnostics({type:'private string',startTime:0,requestStart:0,responseStart:0,responseEnd:NaN,domInteractive:-10,domContentLoadedEventEnd:0,loadEventEnd:Infinity,transferSize:-1,encodedBodySize:NaN,decodedBodySize:Infinity},{effectiveType:'private string',saveData:'private string',ip:'private@example.test'});
  assert.deepEqual(result,{});
});
