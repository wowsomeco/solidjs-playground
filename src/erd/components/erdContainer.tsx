import clsx from 'clsx';
import type { Component } from 'solid-js';
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

    // hardcode marker logic for now
    // TODO: make it customizable

    props.models.forEach((m) =>
      m.relations.forEach((r) =>
        rel.push({
          from: { id: m.name, pos: m.pos },
          to: {
            id: r.id,
            pos: props.models.find((x) => x.name === r.id).pos,
            marker: r.type === 'onetomany' ? 'markerAsterisk' : 'markerCircle'
          }
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
        <defs>
          <marker
            id='markerCircle'
            markerWidth='8'
            markerHeight='8'
            refX='5'
            refY='5'
          >
            <circle cx='5' cy='5' r='3' />
          </marker>
          <marker
            id='markerAsterisk'
            markerWidth='20'
            markerHeight='20'
            refX='10'
            refY='10'
            orient='auto'
          >
            <path d='M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z' />
          </marker>
        </defs>
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
