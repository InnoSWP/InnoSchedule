import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/LoginPage";
import DevTimetable from "./pages/Timetable.dev";
import { ScheduleEditor } from "./pages/ScheduleEditor";
import store from "./store/store";
import { Provider } from "react-redux";
import { ScheduleStorage } from "./pages/ScheduleStorage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <Routes>
                  <Route path={"/"} element={<Layout />}>
                      <Route index element={<App />} />
                      <Route path={"login"} element={<LoginPage />} />
                      <Route path={"storage"} element={<ScheduleStorage />} />
                      <Route path={"editor/:id"} element={<ScheduleEditor />}>
                      </Route>
                      <Route path={"timetable"} element={<DevTimetable />} />
                  </Route>
                  <Route path={"*"} element={<p>404</p>} />
              </Routes>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);