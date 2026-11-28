// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Edmund P. Valdez
// Parallel Bibles: the step buttons beside the verse (book, chapter, verse, history).
(async () => {
const sl = ms => new Promise(r => setTimeout(r, ms)), out = [], ok = (c, m) => out.push((c ? '✓ ' : '✗ ') + m), $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
try {
  await sl(1500);
  const ids = state.modules.bibles.map(b => b.id).slice(0, 2);
  state.settings.parSets = [{ id: 'p1', name: 'T', bibles: ids, base: ids[0] }]; state.settings.parSetId = 'p1';
  save({ parFollow: false, parRef: { b: 2, c: 25, v: 2 } });
  TimotheosDock.show('par', { quiet: true }); await sl(2200);
  const lab = () => $('#tab-par .parpill .np-lbl').textContent.trim(), btn = k => $(`#tab-par [data-pn="${k}"]`);
  ok($$('#tab-par .parsteps [data-pn]').length === 9, '9 step buttons');
  ok(/25:2/.test(lab()), 'starts at ' + lab());
  btn('nextVerse').click(); await sl(900); ok(/25:3/.test(lab()), 'next verse: ' + lab());
  btn('prevVerse').click(); await sl(900); ok(/25:2/.test(lab()), 'previous verse: ' + lab());
  btn('nextChap').click(); await sl(900); ok(/26:1/.test(lab()), 'next chapter: ' + lab());
  btn('prevChap').click(); await sl(900); ok(/25:1/.test(lab()), 'previous chapter: ' + lab());
  btn('back').click(); await sl(900); ok(/26:1/.test(lab()), 'back: ' + lab());
  btn('fwd').click(); await sl(900); ok(/25:1/.test(lab()), 'forward: ' + lab());
  const bkName = lab().replace(/ \d+:\d+$/, ''); btn('nextBook').click(); await sl(900); ok(/ 1:1$/.test(lab()) && lab().replace(/ 1:1$/, '') !== bkName, 'next book: ' + lab());
  btn('prevBook').click(); await sl(900); ok(/ 1:1$/.test(lab()), 'previous book: ' + lab());
  btn('hist').click(); await sl(300); ok(!!$('.histmenu button[data-hdir]'), 'history list opens');
} catch (e) { ok(false, 'error ' + e.message); }
console.log('RESULT ' + out.join(' | '));
})();
