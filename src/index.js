// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store'; // ✅ redux store
import { SearchProvider } from './context/SearchContext'; // ✅ search context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SearchProvider> {/* ✅ wrap App here */}
      <App />
    </SearchProvider>
  </Provider>
);
