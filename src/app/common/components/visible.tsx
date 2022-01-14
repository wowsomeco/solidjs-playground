import type { Component, PropsWithChildren } from 'solid-js';
import { Show } from 'solid-js';

import SpinCircleLoader from '~lib/loaders/components/spinCircleLoader';

interface VisibleProps extends PropsWithChildren {
  when: boolean;
}

const Visible: Component<VisibleProps> = (props: VisibleProps) => {
  return (
    <Show
      when={props.when}
      fallback={
        <div class='w-full h-full flex justify-center items-center'>
          <SpinCircleLoader size={30} />
        </div>
      }
    >
      {props.children}
    </Show>
  );
};

export default Visible;
