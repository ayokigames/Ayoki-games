import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import MathHubApp from './App.tsx';

const html = htm.bind(React.createElement);

const mount = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        html`
          <${React.StrictMode}>
            <${MathHubApp} />
          <//>
        `
      );
    } catch (error) {
      console.error("Critical: Math Hub initialization failed.", error);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
