import { useNavigate } from 'solid-app-router';
import type { Component } from 'solid-js';

import Btn from '~lib/button/components/btn';

const NotFound: Component = () => {
  const navigate = useNavigate();

  return (
    <div class='flex justify-center items-center h-full mt-20'>
      <div class='flex flex-col space-y-4'>
        <p class='font-bold text-red-300 my-4'>Page Not Found :(</p>
        <Btn
          class='border p-2 text-blue-400'
          onClick={() => navigate('/', { replace: true })}
        >
          Home
        </Btn>
      </div>
    </div>
  );
};

export default NotFound;
