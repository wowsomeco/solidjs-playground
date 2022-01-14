import type { Feature } from '@turf/helpers';
import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';

import Leaflet from '~app/common/components/leaflet';
import { parseShp } from '~app/common/scripts/mapping';
import SpinCircleLoader from '~lib/loaders/components/spinCircleLoader';

const Mapping: Component = () => {
  const [loading, setLoading] = createSignal(false);
  const [feature, setFeature] = createSignal<Feature>(undefined);

  const handleFiles = async (files: FileList) => {
    setLoading(true);

    const result = await parseShp(files[0]);
    console.log(result);
    setFeature(result);

    setLoading(false);
  };

  return (
    <div class='p-5 flex flex-col space-y-2'>
      {loading() && <SpinCircleLoader size={64} />}
      <input
        type='file'
        accept='.shp'
        onchange={(e) => handleFiles((e.target as HTMLInputElement).files)}
      />
      <Leaflet feature={feature()} />
    </div>
  );
};

export default Mapping;
