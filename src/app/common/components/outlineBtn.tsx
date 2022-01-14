import clsx from 'clsx';
import type { Component } from 'solid-js';

import type { BtnProps } from '~lib/button/components/btn';
import Btn from '~lib/button/components/btn';

export type BtnColor = 'blue' | 'red';

const BtnColorOptions: Map<BtnColor, string> = new Map([
  ['blue', 'text-blue-400 border-blue-400'],
  ['red', 'text-red-400 border-red-400']
]);

export interface OutlineBtnProps extends BtnProps {
  color?: BtnColor;
}

const OutlineBtn: Component<OutlineBtnProps> = (props) => {
  const col = props.color ?? 'blue';

  return (
    <Btn
      class={clsx(
        'p-1 hover:bg-gray-200 border rounded-md font-bold',
        BtnColorOptions.get(col)
      )}
      loadingColor={col}
      {...props}
    >
      {props.children}
    </Btn>
  );
};

export default OutlineBtn;
