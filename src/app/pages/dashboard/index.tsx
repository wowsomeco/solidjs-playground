import { useNavigate } from 'solid-app-router';
import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';

import Headline from '~app/common/components/headline';
import OutlineBtn from '~app/common/components/outlineBtn';
import Visible from '~app/common/components/visible';
import { delay } from '~lib/common/extensions/generics';

const Dashboard: Component = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    // fake delay
    await delay(1000);

    setLoading(false);
  });

  return (
    <Visible when={!loading()}>
      <div class='p-5'>
        <Headline
          rightSlot={
            <OutlineBtn
              tooltip='Mapping Stuff'
              onClick={() => navigate('/mapping')}
            >
              Show
            </OutlineBtn>
          }
        >
          Mapping Stuffs
        </Headline>
      </div>
    </Visible>
  );
};

export default Dashboard;
