import assert from 'node:assert/strict';
import test from 'node:test';
import React, { createElement, useContext } from 'react';
import { act, create, type ReactTestRenderer } from 'react-test-renderer';
import { Window } from 'happy-dom';
import { ThemeContext, ThemeProvider, type ThemeContextValue } from './ThemeContext';

(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;
(globalThis as Record<string, unknown>).React = React;

test('warm defaults, persisted preferences, mode switching and palette cleanup work through the provider', async () => {
  const window = new Window({ url: 'http://localhost' });
  Object.assign(globalThis, { window, document: window.document, localStorage: window.localStorage });
  let current!: ThemeContextValue;
  function Probe() { current = useContext(ThemeContext); return null; }
  let tree!: ReactTestRenderer;
  const mount = async () => { await act(async () => { tree = create(createElement(ThemeProvider, null, createElement(Probe))); }); };
  const unmount = async () => { await act(async () => { tree.unmount(); }); };
  await mount();
  assert.equal(current.colorTheme, 'warm-light');
  assert.equal(current.uiFont, 'humanist');
  assert.equal(document.documentElement.style.getPropertyValue('--pc-bg-base'), '#f5f2eb');
  await act(async () => current.setTheme('dark'));
  assert.equal(current.colorTheme, 'warm-dark');
  assert.equal(document.documentElement.style.getPropertyValue('--pc-bg-base'), '#20221f');
  await act(async () => current.setColorTheme('operator-dark'));
  assert.equal(document.documentElement.hasAttribute('data-warm-home'), false);
  assert.equal(document.documentElement.style.getPropertyValue('--color-status-success'), '');
  await unmount();

  localStorage.setItem('zeroclaw-theme', JSON.stringify({ theme: 'dark', accent: 'cyan', colorTheme: 'operator-dark', uiFont: 'system', monoFont: 'system-mono', uiFontSize: 17, monoFontSize: 14 }));
  await mount();
  assert.equal(current.colorTheme, 'warm-dark');
  assert.equal(current.uiFont, 'humanist');
  assert.equal(current.uiFontSize, 17);
  await unmount();

  localStorage.setItem('zeroclaw-theme', JSON.stringify({ theme: 'dark', accent: 'violet', colorTheme: 'dracula', uiFont: 'system', monoFont: 'system-mono', uiFontSize: 16, monoFontSize: 14 }));
  await mount();
  assert.equal(current.colorTheme, 'dracula');
  assert.equal(current.accent, 'violet');
  assert.equal(current.uiFont, 'system');
  await unmount();
  await window.happyDOM.close();
});
