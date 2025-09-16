import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  // By removing React.StrictMode, we prevent components from rendering twice in development.
  // This can resolve rare race conditions, such as the "invalid document state" error that
  // sometimes occurs during service worker registration in specific environments.
  <App />
);

// Register the service worker after the page has fully loaded.
// This is the most robust approach to avoid race conditions and "invalid state" errors.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use an absolute URL to prevent cross-origin errors in certain hosting environments.
    const swUrl = `${location.origin}/sw.js`;
    navigator.serviceWorker.register(swUrl)
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.error('ServiceWorker registration failed: ', err);
      });
  });
}