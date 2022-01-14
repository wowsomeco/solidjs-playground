import type { Component } from 'solid-js';

import Headline from '~app/common/components/headline';
import draggable from '~app/common/directives/draggable';

const Erd: Component = () => {
  return (
    <div class='p-5'>
      <Headline>WIP</Headline>
      <div
        use:draggable={{
          onDragStart: (el) => el.classList.add('bg-gray-100'),
          onDragEnd: (el) => el.classList.remove('bg-gray-100')
        }}
        class='p-2 border cursor-move flex flex-col'
        style={{ width: '200px' }}
      >
        <p class='border-b py-2'>Title</p>
        <p class='text-blue-400 font-bold'>Drag Me, please</p>
      </div>
    </div>
  );
};

export default Erd;
