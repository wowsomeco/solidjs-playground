import { onCleanup, onMount } from 'solid-js';

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

  const curPos = pos;
  let lastDragPos = Vector2.zero();
  let shouldDrag: boolean = false;

  const move = () => {
    el.style.transform = `translate3d(${curPos.x}px, ${curPos.y}px, 0)`;
  };

  const handleDrag = (e: TouchEvent | MouseEvent): void => {
    // get the delta touch x from the start x
    if (shouldDrag) {
      let curX = 0,
        curY = 0;

      if (e instanceof MouseEvent) {
        curX = e.pageX;
        curY = e.pageY;
      } else {
        curX = e.touches[0].pageX;
        curY = e.touches[0].pageY;
      }

      const deltaX = curX - lastDragPos.x;
      const deltaY = curY - lastDragPos.y;

      curPos.add(deltaX, deltaY);

      move();

      onDragging?.(el);

      lastDragPos = new Vector2(curX, curY);
    }
  };

  const handleDragStart = (e: TouchEvent | MouseEvent) => {
    e.preventDefault();
    // disable body scroll
    document.body.style.overflow = 'hidden';

    if (e instanceof MouseEvent) {
      lastDragPos = Vector2.create(e.pageX, e.pageY);
    } else {
      lastDragPos = Vector2.create(e.touches[0].pageX, e.touches[0].pageY);
    }

    shouldDrag = true;

    onDragStart?.(el);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent) => {
    if (shouldDrag) {
      e.stopImmediatePropagation();
      e.preventDefault();

      shouldDrag = false;
      // enable back body scroll
      document.body.style.overflow = 'auto';

      onDragEnd?.(el);
    }
  };

  onCleanup(() => {
    el.removeEventListener('mousedown', handleDragStart);
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  });

  // TODO: handle touch down, move, and up in an elegant way,
  // maybe create class for event binder
  el.addEventListener('mousedown', handleDragStart);
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', handleDragEnd);

  onMount(() => {
    el.style.willChange = 'transform';
    move();
  });
};

export default draggable;
