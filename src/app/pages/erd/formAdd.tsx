import type { Component } from 'solid-js';

import Headline from '~app/common/components/headline';
import OutlineBtn from '~app/common/components/outlineBtn';
import { DUMMY_SELECT_TYPES } from '~app/common/scripts/constants';
import ErdSelectField from '~erd/components/erdSelectField';
import ErdSelectRelation from '~erd/components/erdSelectRelation';
import type {
  ERTableFieldModel,
  ERTableModel,
  ERTableRelationModel
} from '~erd/models/erTableModels';
import Vector2 from '~lib/common/utils/vec2';
import FormField from '~lib/form/components/formField';
import { useForm } from '~lib/form/hooks/useForm';
import { ValidatorString } from '~lib/form/validators/validatorString';
import InputField from '~lib/input-field/components/inputField';
import useNotif from '~lib/notif/contexts/context';
import CenterOverlay from '~lib/overlay/components/centerOverlay';

interface FormAddProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (m: ERTableModel) => string;
  idOptions: () => string[];
}

class FormAddModel implements ERTableModel {
  constructor(
    public name: string = null,
    public pos = Vector2.create(10, 100),
    public fields: ERTableFieldModel[] = [],
    public relations: ERTableRelationModel[] = []
  ) {}
}

const isValidField = (fields: ERTableFieldModel[]) => {
  if (fields.length === 0) return true;

  return fields.find((x) => !x.name || !x.type) ? false : true;
};

const isValidRelations = (relations: ERTableRelationModel[]) => {
  if (relations.length === 0) return true;

  return relations.find((x) => !x.id || !x.type) ? false : true;
};

const FormAdd: Component<FormAddProps> = (props) => {
  let lastChangedFieldIdx = -1;

  const { notif } = useNotif;

  const { errors, model, setModel, handleSubmit, loading, clearError } =
    useForm<FormAddModel>({
      model: async () => {
        return new FormAddModel();
      },
      onSubmit: async (m) => {
        const err = props.onSubmit(m);
        notif.next({
          text: err ?? 'Success',
          class: err ? 'bg-red-400' : 'bg-green-400'
        });

        if (!err) clear();
      },
      onValidationError: (err) => {
        for (const [_, v] of Object.entries(err)) {
          if (v) {
            notif.next({ text: v, class: 'bg-red-400' });
            break;
          }
        }
      },
      validate: (m) => {
        return {
          name: ValidatorString.init(m.name).required().build(),
          fields: !isValidField(m.fields)
            ? 'All fields must not be empty'
            : undefined,
          relations: !isValidRelations(m.relations)
            ? 'All relations must not be empty'
            : undefined
        };
      }
    });

  const onClose = () => {
    clear();
    props.onClose();
  };

  const clear = () => {
    setModel(new FormAddModel());
    clearError();
  };

  const onChangeField = (
    f: ERTableFieldModel,
    idx: number,
    shouldFocus: boolean
  ) => {
    const curFields = [...model.fields];
    curFields[idx] = f;

    // determines should focus the input of the field
    // since it wil get re-rendered hence focus is lost if it's currently typing
    lastChangedFieldIdx = shouldFocus ? idx : -1;

    setModel({ fields: curFields });
  };

  const onAddField = () => {
    setModel({ fields: [...model.fields, { name: null, type: null }] });
  };

  const onDeleteField = (idx: number) => {
    const curFields = [...model.fields];
    curFields.splice(idx, 1);

    lastChangedFieldIdx = -1;

    setModel({ fields: curFields });
  };

  const onAddRelation = () => {
    setModel({
      relations: [...model.relations, { id: null, type: 'onetomany' }]
    });
  };

  const onChangeRelation = (f: ERTableRelationModel, idx: number) => {
    const cur = [...model.relations];
    cur[idx] = f;

    setModel({ relations: cur });
  };

  const onDeleteRelation = (idx: number) => {
    const cur = [...model.relations];
    cur.splice(idx, 1);

    setModel({ relations: cur });
  };

  return (
    <CenterOverlay withCloseBtn open={props.open} onClose={onClose}>
      <form
        style={{ width: '400px', 'max-height': '80vh' }}
        class='flex flex-col p-3 shadow bg-white space-y-2 rounded-lg overflow-scroll'
        onsubmit={handleSubmit}
      >
        <FormField label='Name' key='name' error={errors}>
          <InputField
            value={model.name}
            onChange={(v) => setModel({ name: v })}
          />
        </FormField>
        <Headline rightSlot={<OutlineBtn onClick={onAddField}>Add</OutlineBtn>}>
          Fields
        </Headline>
        <FormField key='fields' error={errors}>
          {model.fields.map((field, i) => (
            <ErdSelectField
              selected={field}
              onChange={(f, shouldFocus) => onChangeField(f, i, shouldFocus)}
              typeOptions={DUMMY_SELECT_TYPES}
              shouldFocusInput={i === lastChangedFieldIdx}
              onDelete={() => onDeleteField(i)}
            />
          ))}
        </FormField>
        <Headline
          rightSlot={<OutlineBtn onClick={onAddRelation}>Add</OutlineBtn>}
        >
          Relations
        </Headline>
        <FormField key='relations' error={errors}>
          {model.relations.map((relation, i) => (
            <ErdSelectRelation
              selected={relation}
              onChange={(m) => onChangeRelation(m, i)}
              onDelete={() => onDeleteRelation(i)}
              idOptions={props.idOptions()}
              typeOptions={['onetoone', 'onetomany']}
            />
          ))}
        </FormField>
        <div style={{ 'min-height': '50px' }}>
          <OutlineBtn
            class='h-full w-full'
            color='green'
            loading={loading()}
            type='submit'
          >
            Add
          </OutlineBtn>
        </div>
      </form>
    </CenterOverlay>
  );
};

export default FormAdd;
