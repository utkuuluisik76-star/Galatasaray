import test from 'node:test';
import assert from 'node:assert/strict';
import {players} from './dist/squad-data.js';
import {sanitiseLineup,choosePlayer,lastEleven} from './dist/squad-state.js';
test('Stored favourites recover from stale IDs, duplicate players and unknown positions',()=>{
  assert.deepEqual(sanitiseLineup({st:'45',lw:'45',am:'retired-player',gk:'1',unknown:'11'},players),{st:'45',gk:'1'});
  for(const corrupt of [null,[],42,'unexpected'])assert.deepEqual(sanitiseLineup(corrupt,players),{});
});
test('Any current squad member can be chosen for any slot, but not two slots at once',()=>{
  const first=choosePlayer({},'st','1',players);
  assert.equal(first.st,'1');
  assert.throws(()=>choosePlayer(first,'gk','1',players),/already-selected/);
  const changed=choosePlayer(first,'st','45',players);
  const result=choosePlayer(changed,'gk','1',players);
  assert.deepEqual(result,{st:'45',gk:'1'});
  assert.deepEqual(first,{st:'1'});
});
test('Last eleven contains eleven distinct, verified squad members',()=>{
  const valid=sanitiseLineup(lastEleven,players);
  assert.equal(Object.keys(valid).length,11);
  assert.equal(new Set(Object.values(valid)).size,11);
  assert.throws(()=>choosePlayer(valid,'invalid','45',players),/invalid-selection/);
  assert.throws(()=>choosePlayer(valid,'st','not-in-squad',players),/invalid-selection/);
});

