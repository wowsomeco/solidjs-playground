import clsx from 'clsx';
import type { Component, JSX } from 'solid-js';
import { createEffect, createSignal, For } from 'solid-js';

import type { ERTableModel } from '~erd/models/erTableModels';
import type { CommonProps } from '~lib/common/components/props';
import Vector2 from '~lib/common/utils/vec2';
import Zoomable from '~lib/zoomable/components/zoomable';

import ErdNode from './erdNode';
import type { LineConnectorProps } from './lineConnector';
import LineConnector from './lineConnector';

interface ErdContainerProps extends CommonProps {
  height?: string;
  models: ERTableModel[];
  focusedModel: ERTableModel;
  onFocus?: (m: ERTableModel) => void;
  onUpdatePos: (models: ERTableModel, pos: Vector2) => void;
  lineColor?: string;
}

const ErdContainer: Component<ErdContainerProps> = (props) => {
  const [zoom, setZoom] = createSignal(1);
  const [pos, setPos] = createSignal<Vector2>(Vector2.zero());
  const [relations, setRelations] = createSignal<LineConnectorProps[]>([]);

  createEffect(() => {
    const rel: LineConnectorProps[] = [];
    props.models.forEach((m) =>
      m.relations.forEach((r) =>
        rel.push({
          from: { id: m.name, pos: m.pos },
          to: { id: r.id, pos: props.models.find((x) => x.name === r.id).pos }
        })
      )
    );

    setRelations(rel);
  });

  return (
    <div class='relative overflow-hidden'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        class='absolute top-0 left-0 w-full h-full overflow-visible'
        style={{
          transform: `scale(${zoom()}, ${zoom()}) translate3d(${pos().x}px, ${
            pos().y
          }px, 0)`
        }}
      >
        <For each={relations()}>
          {(r, _) => (
            <LineConnector from={r.from} to={r.to} color={props.lineColor} />
          )}
        </For>
      </svg>
      <Zoomable
        class={props.class}
        style={{ height: props.height ?? '300px' }}
        zoom={zoom()}
        onChangeZoom={(v) => setZoom(v)}
        pos={pos()}
        onChangePos={(p) => setPos(p)}
      >
        <>
          {props.models.map((m) => (
            <ErdNode
              class={clsx(
                'bg-white border-2 rounded-md',
                props.focusedModel?.name === m.name && 'border-blue-500'
              )}
              position={m.pos}
              onChangePosition={(pos) => props.onUpdatePos(m, pos)}
              model={m}
              style={{ width: '200px' }}
              onClickField={() => props.onFocus?.(m)}
              onClickTitle={() => props.onFocus?.(m)}
            />
          ))}
        </>
      </Zoomable>
    </div>
  );
};

export default ErdContainer;
