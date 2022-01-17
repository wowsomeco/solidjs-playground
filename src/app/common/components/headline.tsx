import type { Component, JSX, PropsWithChildren } from 'solid-js';

interface HeadlineProps extends PropsWithChildren {
  rightSlot?: JSX.Element;
}

const Headline: Component<HeadlineProps> = (props) => {
  return (
    <div class='text-blue-500 my-2 py-2 border-b flex justify-between'>
      <p class='font-bold text-xl'>{props.children}</p>
      {props.rightSlot}
    </div>
  );
};

export default Headline;
