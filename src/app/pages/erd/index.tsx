import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import Headline from '~app/common/components/headline';
import OutlineBtn from '~app/common/components/outlineBtn';
import ErdContainer from '~erd/components/erdContainer';
import type { ERTableModel } from '~erd/models/erTableModels';
import Vector2 from '~lib/common/utils/vec2';

import FormAdd from './formAdd';

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
  const [isFormAddOpen, setFormAddOpen] = createSignal(false);

  const [state, setState] = createStore<ErdState>({
    models: [...DUMMY_MODELS]
  });

  const updatePos = (m: ERTableModel, pos: Vector2) => {
    setState(
      'models',
      (model) => model.name === m.name,
      produce<DummyTableModel>((m) => (m.pos = pos))
    );
  };

  const addModel = (m: ERTableModel): string => {
    if (state.models.find((x) => x.name === m.name))
      return `Table with name = ${m.name} already exists`;

    setState('models', (models) => [...models, { ...m }]);
    setFormAddOpen(false);

    return undefined;
  };

  const setFocus = (m: ERTableModel) => {
    setState({ focusedModel: m });
  };

  return (
    <div class='flex h-full'>
      <div class='p-2 flex-auto'>
        <Headline
          rightSlot={
            <OutlineBtn
              tooltip='Add New Table'
              onClick={() => setFormAddOpen(true)}
            >
              Add Table
            </OutlineBtn>
          }
        >
          ER Diagram
        </Headline>
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
      <div class='border-l' style={{ width: '200px' }}></div>
      <FormAdd
        open={isFormAddOpen()}
        onClose={() => setFormAddOpen(false)}
        onSubmit={addModel}
        idOptions={() => state.models.map((x) => x.name)}
      />
    </div>
  );
};

export default Erd;
