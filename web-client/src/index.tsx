import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { LoginPage } from "./components/LoginPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<App />} />
              <Route path={"layout"} element={<Layout />} >
                  <Route path={"login"} element={<LoginPage />}/>
              </Route>
              <Route path={"*"} element={<p>404</p>} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);