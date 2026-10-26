import assert from 'node:assert/strict';
import test from 'node:test';
import themes from './themes.json';

function luminance(hex: string): number {
  const rgb = hex.slice(1).match(/../g)!.map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  const [r, g, b] = rgb;
  assert.ok(r !== undefined && g !== undefined && b !== undefined);
  return r * .2126 + g * .7152 + b * .0722;
}
function contrast(a: string, b: string): number {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
for (const id of ['warm-light', 'warm-dark']) {
  test(`${id} retains legible body, secondary and state text on its surfaces`, () => {
    const vars = themes.find(t => t.id === id)!.vars as Record<string, string>;
    for (const surface of ['--pc-bg-base', '--pc-bg-surface', '--pc-bg-input']) {
      for (const text of ['--pc-text-primary', '--pc-text-secondary', '--pc-text-muted', '--pc-text-faint', '--pc-accent', '--color-status-success', '--color-status-warning', '--color-status-error', '--color-status-info']) {
        assert.ok(contrast(vars[text]!, vars[surface]!) >= 4.5, `${id}: ${text} on ${surface} must meet normal-text contrast`);
      }
    }
  });
}
