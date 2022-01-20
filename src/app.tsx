import { Route, Router, Routes } from 'solid-app-router';
import type { Component } from 'solid-js';
import { lazy } from 'solid-js';
import { Portal } from 'solid-js/web';

import Notif from '~lib/notif/components/notif';

const Dashboard = lazy(() => import('./app/pages/dashboard'));
const Forms = lazy(() => import('./app/pages/forms'));
const Mapping = lazy(() => import('./app/pages/mapping'));
const Erd = lazy(() => import('./app/pages/erd'));
const Builder = lazy(() => import('./app/pages/builder'));
const NotFound = lazy(() => import('./app/pages/notfound'));

const App: Component = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/forms' element={<Forms />} />
          <Route path='/mapping' element={<Mapping />} />
          <Route path='/erd' element={<Erd />} />
          <Route path='/builder' element={<Builder />} />
          <Route path='/*all' element={<NotFound />} />
        </Routes>
      </Router>
      <Portal mount={document.body}>
        <Notif duration={2000} />
      </Portal>
    </>
  );
};

export default App;
