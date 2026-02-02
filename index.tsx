import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.tsx';

const html = htm.bind(React.createElement);

// Polyfill process.env for browser ESM compatibility
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: { API_KEY: (window as any)._env_?.API_KEY || '' } };
}

const mount = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  const dismissLoader = (window as any).dismissLoader || (() => {
    const loader = document.getElementById('emergency-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 600);
    }
  });

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      html`
        <${React.StrictMode}>
          <${App} />
        <//>
      `
    );
    
    // Attempt dismissal immediately after render request
    dismissLoader();
  } catch (err) {
    console.error("Critical Mount Failure:", err);
    dismissLoader();
  }
};

mount();
