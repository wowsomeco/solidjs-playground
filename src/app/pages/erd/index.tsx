import type { Component } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import Headline from '~app/common/components/headline';
import ErdContainer from '~erd/components/erdContainer';
import type { ERTableModel } from '~erd/models/erTableModels';
import Vector2 from '~lib/common/utils/vec2';

interface DummyTableModel extends ERTableModel {}

const DUMMY_MODELS: DummyTableModel[] = [
  {
    name: 'Table1',
    fields: [
      { name: 'Id', type: 'text' },
      { name: 'Name', type: 'text' }
    ],
    relations: [
      { id: 'Table2', type: 'onetomany' },
      { id: 'Table3', type: 'onetomany' }
    ],
    pos: Vector2.create(10, 10)
  },
  {
    name: 'Table2',
    fields: [
      { name: 'Id', type: 'text' },
      { name: 'Name', type: 'text' },
      { name: 'Dob', type: 'text' }
    ],
    relations: [],
    pos: Vector2.create(500, 10)
  },
  {
    name: 'Table3',
    fields: [
      { name: 'Id', type: 'text' },
      { name: 'Name', type: 'text' },
      { name: 'StartDate', type: 'text' }
    ],
    relations: [],
    pos: Vector2.create(500, 200)
  }
];

interface ErdState {
  models: DummyTableModel[];
  focusedModel?: ERTableModel;
}

const Erd: Component = () => {
  const [state, setState] = createStore<ErdState>({ models: DUMMY_MODELS });

  const updatePos = (m: ERTableModel, pos: Vector2) => {
    setState(
      'models',
      (model) => model.name === m.name,
      produce<DummyTableModel>((m) => (m.pos = pos))
    );
  };

  const setFocus = (m: ERTableModel) => {
    setState({ focusedModel: m });
  };

  return (
    <div class='p-5'>
      <Headline>ER Diagram</Headline>
      <ErdContainer
        class='border rounded-sm'
        models={state.models}
        focusedModel={state.focusedModel}
        onFocus={setFocus}
        onUpdatePos={updatePos}
        height='500px'
        lineColor='#3498db'
      />
    </div>
  );
};

export default Erd;
