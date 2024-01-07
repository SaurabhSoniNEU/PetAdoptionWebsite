import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store';

// Use ReactDOM.createRoot to create a root for concurrent React rendering
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the React application within the root
root.render(
  <React.StrictMode>
    {/* Wrap App component with Provider and pass the store */}
    <Provider store={store}>
      <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

