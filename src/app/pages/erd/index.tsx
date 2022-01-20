import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import Headline from '~app/common/components/headline';
import OutlineBtn from '~app/common/components/outlineBtn';
import { DUMMY_SELECT_TYPES } from '~app/common/scripts/constants';
import ErdContainer from '~erd/components/erdContainer';
import type {
  ERTableFieldModel,
  ERTableModel
} from '~erd/models/erTableModels';
import Vector2 from '~lib/common/utils/vec2';
import Expandable from '~lib/expandable/components/expandable';
import FontAwesomeIcon from '~lib/font-awesome/components/FontAwesomeIcon';
import InputField from '~lib/input-field/components/inputField';
import useNotif from '~lib/notif/contexts/context';
import Select from '~lib/select/components/select';

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

const UpdateField: Component<{
  model: ERTableFieldModel;
  onSave: (field: ERTableFieldModel) => void;
}> = (props) => {
  const [isEditing, setEditing] = createSignal(false);

  let name = props.model.name;
  let type = props.model.type;

  const save = (e: Event) => {
    e.preventDefault();
    props.onSave({ name, type });
  };

  return (
    <form class='w-full flex items-center space-x-1' onsubmit={save}>
      {!isEditing() ? (
        <FontAwesomeIcon
          class='cursor-pointer text-green-400 hover:text-green-500'
          iconName='edit'
          onClick={() => setEditing(true)}
        />
      ) : (
        <FontAwesomeIcon
          class='cursor-pointer text-red-400 hover:text-red-500'
          iconName='times-circle'
          onClick={() => setEditing(false)}
        />
      )}
      <InputField
        readOnly={!isEditing()}
        value={props.model.name}
        onChange={(v) => {
          name = v;
        }}
      />
      <Select
        disabled={!isEditing()}
        class='w-64'
        placeholder='Select type'
        renderValue={() => DUMMY_SELECT_TYPES.find((x) => x.id === type)?.name}
        options={DUMMY_SELECT_TYPES}
        onChange={(v) => {
          type = v.id;
        }}
        renderItem={(item) => <div class='text-blue-900'>{item.name}</div>}
      />
      {isEditing() && (
        <OutlineBtn class='w-32' type='submit' color='green' onClick={save}>
          Save
        </OutlineBtn>
      )}
    </form>
  );
};

const Erd: Component = () => {
  const { notif } = useNotif;

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

  const updateField = (
    m: ERTableModel,
    idx: number,
    field: Partial<ERTableFieldModel>
  ) => {
    setState(
      'models',
      (model) => model.name === m.name,
      produce<DummyTableModel>(
        (m) => (m.fields[idx] = { ...m.fields[idx], ...field })
      )
    );

    notif.next({
      text: 'Field Updated',
      class: 'bg-blue-500 text-yellow-200 font-bold'
    });
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
    <div class='sm:block md:flex h-full'>
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
      <div class='md:border-l' style={{ width: '360px' }}>
        {state.models.map((m) => (
          <Expandable
            class='m-1 p-1 border-b'
            title={m.name}
            expanded={m.name === state.focusedModel?.name}
            onChange={(flag) => {
              setFocus(flag ? m : null);
            }}
          >
            <div class='border-t mt-2 py-2 flex flex-col space-y-2'>
              {m.fields.map((field, i) => (
                <UpdateField
                  model={field}
                  onSave={(f) => updateField(m, i, f)}
                />
              ))}
            </div>
          </Expandable>
        ))}
      </div>
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
