import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    const swUrl = `${location.origin}/sw.js`;
    navigator.serviceWorker.register(swUrl)
      .then(registration => {
        console.log('ServiceWorker registered with scope: ', registration.scope);
      })
      .catch(err => {
        console.error('ServiceWorker registration failed: ', err);
      });
  }
};

// The page might have already loaded by the time this script runs,
// especially with module scripts which are deferred. We check the document
// readyState to ensure the service worker is registered correctly.
if (document.readyState === 'complete') {
  registerServiceWorker();
} else {
  window.addEventListener('load', registerServiceWorker);
}
