import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "pages/Layout";
import { LoginPage } from "pages/LoginPage";
import DevTimetable from "./pages/Timetable.dev";
import { ScheduleEditor } from "pages/ScheduleEditor";
import store from "./store/store";
import { Provider } from "react-redux";
import { ScheduleStorage } from "pages/ScheduleStorage";
import { ResourcesStorage } from "pages/ResourcesStorage";

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
                      <Route path={"storage"} element={<ScheduleStorage />} />
                      <Route path={"resources"} element={<ResourcesStorage />} />
                      <Route path={"editor/:uuid"} element={<ScheduleEditor />}></Route>
                      <Route path={"timetable"} element={<DevTimetable onTimeslotClick={() => {console.log("bruh")}} />} />
                  </Route>
                  <Route path={"*"} element={<p>404</p>} />
                  <Route path={"login"} element={<LoginPage />} />
              </Routes>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);