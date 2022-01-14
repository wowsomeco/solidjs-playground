import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faBars,
  faHome,
  faSearch,
  faTimes,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { render } from 'solid-js/web';

import App from './app';

library.add(
  faHome,
  faTimesCircle,
  faSearch,
  faTimes,
  faBars,
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight
);

render(() => <App />, document.getElementById('root'));
