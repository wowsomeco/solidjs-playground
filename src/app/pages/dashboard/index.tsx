import { useNavigate } from 'solid-app-router';
import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';

import Headline from '~app/common/components/headline';
import OutlineBtn from '~app/common/components/outlineBtn';
import Visible from '~app/common/components/visible';
import { delay } from '~lib/common/extensions/generics';

interface NavProps {
  tooltip?: string;
  to: string;
  label: string;
}

const Nav: Component<NavProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Headline
      rightSlot={
        <OutlineBtn tooltip={props.tooltip} onClick={() => navigate(props.to)}>
          Show
        </OutlineBtn>
      }
    >
      {props.label}
    </Headline>
  );
};

const Dashboard: Component = () => {
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    // fake delay
    await delay(1000);

    setLoading(false);
  });

  return (
    <Visible when={!loading()}>
      <div class='p-5 flex flex-col space-y-3'>
        <Nav tooltip='Forms stuffs' label='Forms' to='/forms' />
        <Nav tooltip='Mapping stuffs' label='Mapping' to='/mapping' />
        <Nav tooltip='ERD Diagram (WIP)' label='ERD' to='/erd' />
      </div>
    </Visible>
  );
};

export default Dashboard;
