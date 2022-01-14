import { Route, Router, Routes } from 'solid-app-router';
import type { Component } from 'solid-js';
import { lazy } from 'solid-js';

import Notif from '~lib/notif/components/notif';

const Dashboard = lazy(() => import('./app/pages/dashboard'));
const Forms = lazy(() => import('./app/pages/forms'));
const Mapping = lazy(() => import('./app/pages/mapping'));
const NotFound = lazy(() => import('./app/pages/notfound'));

const App: Component = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/forms' element={<Forms />} />
          <Route path='/mapping' element={<Mapping />} />
          <Route path='/*all' element={<NotFound />} />
        </Routes>
      </Router>
      <Notif duration={2000} />
    </>
  );
};

export default App;
