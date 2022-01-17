import { onCleanup, onMount } from 'solid-js';

import Draggable from '~lib/common/utils/draggable';
import Vector2 from '~lib/common/utils/vec2';

export interface DraggableOptions {
  /** the initial drag position */
  pos?: Vector2;
  onDragStart?: (el: HTMLElement) => void;
  onDragging?: (el: HTMLElement) => void;
  onDragEnd?: (el: HTMLElement) => void;
}

const draggable = (el: HTMLElement, value: () => DraggableOptions): void => {
  const { pos = Vector2.zero(), onDragStart, onDragEnd, onDragging } = value();

  let gestureHandler: Draggable;

  const curPos = pos;

  const move = () => {
    el.style.transform = `translate3d(${curPos.x}px, ${curPos.y}px, 0)`;
  };

  onCleanup(() => {
    gestureHandler?.cleanup();
  });

  onMount(() => {
    move();

    gestureHandler = new Draggable(el, {
      onDragStart: () => onDragStart?.(el),
      onDragging: ({ delta }) => {
        curPos.add(delta.x, delta.y);
        move();
        onDragging?.(el);
      },
      onDragEnd: () => onDragEnd?.(el)
    });
  });
};

export default draggable;
