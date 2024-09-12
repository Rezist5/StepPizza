import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';

export const Context = createContext();

const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);
appRoot.render(
  <Context.Provider
    value={{
      user: new UserStore(),
    }}
  >
    <App />
  </Context.Provider>
);