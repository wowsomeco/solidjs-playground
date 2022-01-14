import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import type { Component } from 'solid-js';

import type { BtnProps } from '~lib/button/components/btn';
import Btn from '~lib/button/components/btn';
import FontAwesomeIcon from '~lib/font-awesome/components/FontAwesomeIcon';

export interface IconBtnProps extends BtnProps {
  iconName: IconName;
  iconPrefix?: IconPrefix;
}

const IconBtn: Component<IconBtnProps> = (props) => {
  return (
    <Btn {...props} class='w-10 h-10 rounded-full border p-2'>
      <FontAwesomeIcon
        iconName={props.iconName}
        prefix={props.iconPrefix ?? 'fas'}
      />
    </Btn>
  );
};

export default IconBtn;
