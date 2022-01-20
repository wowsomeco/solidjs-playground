import clsx from 'clsx';
import type { Component, JSX, PropsWithChildren } from 'solid-js';

import type { CommonProps } from '~lib/common/components/props';

interface HeadlineProps extends PropsWithChildren, CommonProps {
  rightSlot?: JSX.Element;
}

const Headline: Component<HeadlineProps> = (props) => {
  return (
    <div
      class={clsx(
        'text-blue-500 my-2 py-2 border-b flex justify-between',
        props.class
      )}
    >
      <p class='font-bold text-xl'>{props.children}</p>
      {props.rightSlot}
    </div>
  );
};

export default Headline;
