import 'solid-js';

import { DraggableOptions } from '~app/common/directives/draggable';
import { TooltipOptions } from '~directives/tooltip';
import { TransitionOptions } from '~directives/transition';
import { HoverOptions } from '~lib/common/directives/hover';
import { PointerOptions } from '~lib/common/directives/pointer';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside?: () => void;
      tooltip?: TooltipOptions;
      ripple?: boolean;
      transition?: TransitionOptions;
      hover?: HoverOptions;
      draggable?: DraggableOptions;
      pointer?: PointerOptions;
    }
  }
}
