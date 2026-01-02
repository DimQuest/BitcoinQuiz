
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Shim process.env for the browser to prevent crashes when accessing process.env.API_KEY
// This is a safety layer in case the bundler's define setting is skipped.
if (typeof window !== 'undefined') {
  (window as any).process = (window as any).process || { env: {} };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element to mount to. Ensure <div id='root'></div> exists in index.html");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
