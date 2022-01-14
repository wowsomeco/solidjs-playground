import clsx from 'clsx';
import type { Component } from 'solid-js';

import type { BtnProps } from '~lib/button/components/btn';
import Btn from '~lib/button/components/btn';

export interface SubmitBtnProps extends Omit<BtnProps, 'type'> {
  isNew: boolean;
}

const SubmitBtn: Component<SubmitBtnProps> = (props) => {
  return (
    <Btn
      {...props}
      type='submit'
      class={clsx(
        'shadow rounded text-white p-1 w-32',
        props.isNew ? 'bg-blue-500' : 'bg-green-500'
      )}
    >
      {props.isNew ? 'Submit' : 'Update'}
    </Btn>
  );
};

export default SubmitBtn;
