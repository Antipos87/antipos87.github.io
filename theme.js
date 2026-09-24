(() => {
  'use strict';
  const key = 'kotovasia-theme';
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem(key); } catch (_) {}
  if (saved !== 'dark' && saved !== 'light') saved = null;
  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1d2420' : '#faf6ed');
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.textContent = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
      button.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
    });
  };
  apply(saved || (preference.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(saved || (preference.matches ? 'dark' : 'light'));
    document.querySelectorAll('.theme-toggle').forEach(button => button.addEventListener('click', () => {
      saved = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, saved); } catch (_) {}
      apply(saved);
    }));
  });
  preference.addEventListener('change', event => {
    if (!saved) apply(event.matches ? 'dark' : 'light');
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    saved = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
    apply(saved || (preference.matches ? 'dark' : 'light'));
  });
})();
