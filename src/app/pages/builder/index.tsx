import type { IconName } from '@fortawesome/fontawesome-svg-core';
import type { Component } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import Headline from '~app/common/components/headline';
import FontAwesomeIcon from '~lib/font-awesome/components/FontAwesomeIcon';

const BuilderItem: Component<{ icon: IconName; label: string }> = (props) => {
  return (
    <div
      class='p-2 border cursor-move flex flex-col items-center space-y-2 hover:text-blue-400'
      draggable={true}
      ondragstart={(e) => {
        e.dataTransfer.setData('text', props.label);
      }}
    >
      <FontAwesomeIcon iconName={props.icon} class='text-3xl' />
      <p>{props.label}</p>
    </div>
  );
};

interface BuilderState {
  items: string[];
}

const Builder: Component = () => {
  const [state, setState] = createStore<BuilderState>({
    items: []
  });

  const addItem = (v: string) => {
    setState('items', (items) => [...items, v]);
  };

  return (
    <div class='sm:block md:flex h-full'>
      <div class='md:border-r flex flex-col' style={{ width: '360px' }}>
        <Headline class='p-1'>WIP</Headline>
        <div class='grid grid-cols-2 gap-2 p-2'>
          <BuilderItem label='Image' icon='image' />
          <BuilderItem label='Text' icon='paragraph' />
          <BuilderItem label='Video' icon='video' />
        </div>
      </div>
      <div class='p-2 flex-auto'>
        <div
          class='w-full h-full flex flex-col items-center justify-center'
          ondragover={(e) => e.preventDefault()}
          ondrop={(e) => {
            e.preventDefault();

            const item = e.dataTransfer.getData('text');
            addItem(item);
          }}
        >
          {state.items.length === 0 && <p>Drop Here</p>}
          {state.items.map((item) => (
            <p>WIP {item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Builder;
