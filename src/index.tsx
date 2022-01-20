import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faBars,
  faCheck,
  faEdit,
  faHome,
  faImage,
  faMinus,
  faParagraph,
  faPlus,
  faSave,
  faSearch,
  faTimes,
  faTimesCircle,
  faVideo
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
  faAngleRight,
  faPlus,
  faMinus,
  faCheck,
  faSave,
  faEdit,
  faTimes,
  faImage,
  faParagraph,
  faVideo
);

render(() => <App />, document.getElementById('root'));
