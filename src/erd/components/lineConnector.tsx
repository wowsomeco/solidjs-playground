import type { Component } from 'solid-js';
import { onMount } from 'solid-js';

import { delay } from '~lib/common/extensions/generics';
import Vector2 from '~lib/common/utils/vec2';

export interface NodeProps {
  id: string;
  pos: Vector2;
}

export interface LineConnectorProps {
  from: NodeProps;
  to: NodeProps;
  color?: string;
}

const LineConnector: Component<LineConnectorProps> = (props) => {
  let arrowRight: SVGPathElement;
  let fromEl: HTMLElement;
  let toEl: HTMLElement;

  const generatePath = (
    fromPos: Vector2,
    toPos: Vector2,
    control: Vector2
  ): string => {
    const from = fromPos;
    const to = toPos;

    return `M${from.x} ${from.y} C${from.x + control.x},${from.y + control.y} ${
      to.x - control.x
    },${to.y - control.y} ${to.x},${to.y}`;
  };

  const renderLine = () => {
    const fromPos = Vector2.add(
      props.from.pos,
      Vector2.create(
        fromEl.offsetLeft + fromEl.offsetWidth,
        fromEl.offsetTop + fromEl.offsetHeight / 2
      )
    );

    const toPos = Vector2.add(
      props.to.pos,
      Vector2.create(0, toEl.offsetWidth / 2)
    );

    const path = generatePath(fromPos, toPos, Vector2.create(10, -100));

    arrowRight.setAttribute('d', path);
  };

  onMount(async () => {
    fromEl = document.querySelector(`#${props.from.id}`);
    toEl = document.querySelector(`#${props.to.id}`);

    renderLine();
  });

  return (
    <g fill='none' stroke={props.color ?? 'black'} stroke-width='1'>
      <path ref={arrowRight} />
    </g>
  );
};

export default LineConnector;
