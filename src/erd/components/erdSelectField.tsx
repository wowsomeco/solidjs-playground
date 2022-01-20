import type { Component } from 'solid-js';

import FontAwesomeIcon from '~lib/font-awesome/components/FontAwesomeIcon';
import InputField from '~lib/input-field/components/inputField';
import Select from '~lib/select/components/select';

export interface ErdSelectTypeModel {
  id: string;
  name: string;
}

export interface ErdSelectFieldModel {
  name: string;
  type: string;
}

interface ErdSelectFieldProps {
  selected: ErdSelectFieldModel;
  onChange: (m: ErdSelectFieldModel, isNameChanged: boolean) => void;
  typeOptions: ErdSelectTypeModel[];
  onDelete: () => void;
  shouldFocusInput?: boolean;
}

const ErdSelectField: Component<ErdSelectFieldProps> = (props) => {
  const onChangeName = (v: string) => {
    props.onChange({ name: v, type: props.selected?.type }, true);
  };

  const onChangeType = (m: ErdSelectTypeModel) => {
    props.onChange({ name: props.selected?.name, type: m.id }, false);
  };

  return (
    <div class='w-full flex space-x-2 items-center'>
      <FontAwesomeIcon
        iconName='times-circle'
        class='cursor-pointer text-red-400'
        onClick={() => props.onDelete()}
      />
      <InputField
        ref={(inp) => props.shouldFocusInput && inp.focus()}
        value={props.selected?.name}
        onChange={onChangeName}
      />
      <Select
        class='w-64'
        placeholder='Select type'
        renderValue={() => props.selected?.type}
        options={props.typeOptions}
        onChange={onChangeType}
        renderItem={(item) => <div class='text-blue-900'>{item.name}</div>}
      />
    </div>
  );
};

export default ErdSelectField;
