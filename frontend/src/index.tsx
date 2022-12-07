import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './components/Layout/Layout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reduce } from './redux/reducer';
import { AppState } from './redux/app-state';

const store = configureStore({ reducer: reduce });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Layout />
  </Provider>
);