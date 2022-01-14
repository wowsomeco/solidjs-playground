import 'solid-js';

import { DraggableOptions } from '~app/common/directives/draggable';
import { TooltipOptions } from '~directives/tooltip';
import { TransitionOptions } from '~directives/transition';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside?: () => void;
      tooltip?: TooltipOptions;
      ripple?: boolean;
      transition?: TransitionOptions;
      draggable?: DraggableOptions;
    }
  }
}
