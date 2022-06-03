import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { LoginPage } from "./components/LoginPage";
import DevTimetable from "./Timetable.dev";
import {ScheduleEditor} from "./components/ScheduleEditor";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Layout />}>
                  <Route index element={<App />} />
                  <Route path={"login"} element={<LoginPage />} />
                  <Route path={"editor"} element={<ScheduleEditor />} />
                  <Route path={"timetable"} element={<DevTimetable />} />
              </Route>
              <Route path={"*"} element={<p>404</p>} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);