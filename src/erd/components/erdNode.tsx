import clsx from 'clsx';
import type { JSX } from 'solid-js';
import { createEffect, For, onMount } from 'solid-js';

import type { CommonProps } from '~lib/common/components/props';
import clickOutside from '~lib/common/directives/clickOutside';
import hover from '~lib/common/directives/hover';
import pointer from '~lib/common/directives/pointer';
import Draggable from '~lib/common/utils/draggable';
import Vector2 from '~lib/common/utils/vec2';

import type { ERTableFieldModel, ERTableModel } from '../models/erTableModels';

export interface ErdNodeProps<TModel extends ERTableModel> extends CommonProps {
  position: Vector2;
  style?: JSX.CSSProperties;
  title?: JSX.Element;
  model: TModel;
  onHoverTitle?: (flag: boolean) => void;
  onClickTitle?: () => void;
  onClickField?: (field: ERTableFieldModel) => void;
  onHoverField?: (field: ERTableFieldModel, flag: boolean) => void;
  onClickOutside?: () => void;
  onChangePosition: (pos: Vector2) => void;
}

const ErdNode = <TModel extends ERTableModel>(props: ErdNodeProps<TModel>) => {
  let dragHandler: Draggable;
  let divEl: HTMLDivElement;

  onMount(() => {
    dragHandler = Draggable.init(divEl, {
      onDragStart: () => divEl.classList.add('shadow'),
      onDragEnd: () => divEl.classList.remove('shadow'),
      onDragging: ({ delta }) => {
        const newPos = Vector2.create(props.position.x, props.position.y).add(
          delta.x,
          delta.y
        );

        props.onChangePosition(newPos);
      }
    });
  });

  createEffect(() => {
    if (!divEl) return;

    divEl.style.transform = `translate3d(${props.position.x}px, ${props.position.y}px, 0)`;
  });

  return (
    <div
      ref={divEl}
      id={props.model.name}
      use:clickOutside={() => props.onClickOutside?.()}
      class={clsx(props.class, 'absolute top-0 left-0 flex flex-col')}
      style={props.style}
    >
      <div class='w-full'>
        <div
          class='cursor-pointer'
          use:pointer={{
            onUpInside: () => props.onClickTitle?.()
          }}
          use:hover={{
            onEnter: (el) => {
              el.classList.add('text-blue-500');

              props.onHoverTitle?.(true);
            },
            onLeave: (el) => {
              el.classList.remove('text-blue-500');

              props.onHoverTitle?.(false);
            }
          }}
        >
          {props.title ?? (
            <p class='border-b p-2 text-center w-full font-bold'>
              {props.model.name}
            </p>
          )}
        </div>
        <div class='flex flex-col'>
          <For each={props.model.fields}>
            {(field, _) => (
              <div
                class='p-1 cursor-pointer flex items-center justify-between hover:bg-gray-100 hover:text-blue-500'
                use:pointer={{
                  onUpInside: () => props.onClickField?.(field)
                }}
                use:hover={{
                  onEnter: () => {
                    props.onHoverField?.(field, true);
                  },
                  onLeave: () => {
                    props.onHoverField?.(field, false);
                  }
                }}
              >
                <p>{field.name}</p>
                <p class='text-gray-400'>{field.type}</p>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default ErdNode;
