import type { Component } from 'solid-js';

import Btn from '~lib/button/components/btn';
import { delay } from '~lib/common/extensions/generics';
import DatePicker from '~lib/date-picker/components/datePicker';
import FormField from '~lib/form/components/formField';
import { useForm } from '~lib/form/hooks/useForm';
import { ValidatorNumber } from '~lib/form/validators/validatorNumber';
import { ValidatorString } from '~lib/form/validators/validatorString';
import InputField from '~lib/input-field/components/inputField';
import useNotif from '~lib/notif/contexts/context';
import Select from '~lib/select/components/select';

class DummyModel implements Record<string, any> {
  constructor(
    public name: string = null,
    public email: string = null,
    public dob: string = null,
    public dropdownId: number = null
  ) {}
}

const SELECT_ITEMS = [
  { id: 1, name: 'Cat' },
  { id: 2, name: 'Dog' },
  { id: 3, name: 'Red Panda' },
  { id: 4, name: 'Honey Badger' }
];

const Forms: Component = () => {
  const { notif } = useNotif;

  const { model, setModel, errors, clearError, handleSubmit, loading } =
    useForm<DummyModel>({
      key: 'update',
      model: async () => {
        return new DummyModel();
      },
      onSubmit: async (_) => {
        await delay(2000);
        notif.next({ text: 'Success', class: 'bg-green-400' });
      },
      validate: (m) => {
        return {
          name: ValidatorString.init(m.name).required().build(),
          email: ValidatorString.init(m.email).email().build(),
          dob: ValidatorString.init(m.dob).required().build(),
          dropdownId: ValidatorNumber.init(m.dropdownId).required().build()
        };
      }
    });

  return (
    <div class='p-5'>
      <form onsubmit={handleSubmit}>
        <div class='flex flex-col'>
          <FormField label='Nama' key='name' error={errors}>
            <InputField
              clearable
              value={model.name}
              onChange={(v) => setModel({ name: v })}
            />
          </FormField>
          <FormField label='Email' key='email' error={errors}>
            <InputField
              value={model.email}
              onChange={(v) => setModel({ email: v })}
            />
          </FormField>
          <FormField label='Date of Birth' key='dob' error={errors}>
            <DatePicker
              value={model.dob}
              onChange={(v) => setModel({ dob: v })}
            />
          </FormField>
          <FormField label='Dropdown' key='dropdownId' error={errors}>
            <Select
              renderValue={() =>
                SELECT_ITEMS.find((x) => x.id === model.dropdownId)?.name
              }
              onChange={(item) => setModel({ dropdownId: item.id })}
              options={SELECT_ITEMS}
              renderItem={(item) => (
                <div class='text-blue-900'>{item.name}</div>
              )}
            />
          </FormField>
          <Btn
            type='submit'
            class='shadow rounded my-3 bg-blue-500 text-white p-1'
            loading={loading()}
          >
            Submit
          </Btn>
          <Btn
            type='button'
            class='shadow rounded my-3 bg-red-500 text-white p-1'
            onClick={() => {
              setModel(new DummyModel());
              clearError();
            }}
          >
            Clear
          </Btn>
        </div>
      </form>
    </div>
  );
};

export default Forms;
