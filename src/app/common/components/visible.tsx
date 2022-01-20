import type { Component, PropsWithChildren } from 'solid-js';
import { Show } from 'solid-js';

import SpinCircleLoader from '~lib/loaders/components/spinCircleLoader';
import CenterOverlay from '~lib/overlay/components/centerOverlay';

interface VisibleProps extends PropsWithChildren {
  when: boolean;
}

const Visible: Component<VisibleProps> = (props: VisibleProps) => {
  return (
    <Show
      when={props.when}
      fallback={
        <CenterOverlay open>
          <SpinCircleLoader fillColor='white' size={30} />
        </CenterOverlay>
      }
    >
      {props.children}
    </Show>
  );
};

export default Visible;
