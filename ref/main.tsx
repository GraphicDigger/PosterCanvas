import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './shared/styles/index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
