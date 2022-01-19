import type { Component } from 'solid-js';

import type { ERTableRelationModel } from '~erd/models/erTableModels';
import FontAwesomeIcon from '~lib/font-awesome/components/FontAwesomeIcon';
import Select from '~lib/select/components/select';

interface ErdSelectRelationProps {
  selected: ERTableRelationModel;
  onChange: (m: ERTableRelationModel) => void;
  idOptions: string[];
  typeOptions: string[];
  onDelete: () => void;
}

const ErdSelectRelation: Component<ErdSelectRelationProps> = (props) => {
  const onChangeId = (m: Record<string, any>) => {
    props.onChange({ id: m.id, type: props.selected?.type });
  };

  const onChangeType = (m: Record<string, any>) => {
    props.onChange({ id: props.selected?.id, type: m.id });
  };

  return (
    <div class='w-full flex space-x-2 justify-between items-center'>
      <FontAwesomeIcon
        iconName='times-circle'
        class='cursor-pointer text-red-400'
        onClick={() => props.onDelete()}
      />
      <Select
        class='flex-auto'
        placeholder='Select ID'
        renderValue={() => props.selected?.id}
        options={props.idOptions.map((x) => {
          return { id: x, name: x };
        })}
        onChange={onChangeId}
        renderItem={(item) => <div class='text-blue-900'>{item.id}</div>}
      />
      <Select
        class='w-64'
        placeholder='Select Type'
        renderValue={() => props.selected?.type}
        options={props.typeOptions.map((x) => {
          return { id: x, name: x };
        })}
        onChange={onChangeType}
        renderItem={(item) => <div class='text-blue-900'>{item.name}</div>}
      />
    </div>
  );
};

export default ErdSelectRelation;
