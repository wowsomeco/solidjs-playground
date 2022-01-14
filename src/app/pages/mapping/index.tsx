import type { Feature } from '@turf/helpers';
import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';

import Leaflet from '~app/common/components/leaflet';
import { parseShpFromFile } from '~app/common/scripts/shpParser';
import SpinCircleLoader from '~lib/loaders/components/spinCircleLoader';
import useNotif from '~lib/notif/contexts/context';

const Mapping: Component = () => {
  const { notif } = useNotif;
  const [loading, setLoading] = createSignal(false);
  const [feature, setFeature] = createSignal<Feature>(undefined);

  const handleFiles = async (files: FileList) => {
    setLoading(true);

    await parseShpFromFile(files[0])
      .then((result) => setFeature(result))
      .catch((err) =>
        notif.next({ text: err, class: 'bg-red-500 text-white' })
      );

    setLoading(false);
  };

  return (
    <div class='p-5 flex flex-col space-y-2'>
      {loading() && <SpinCircleLoader size={64} />}
      <input
        type='file'
        accept='.shp,.zip'
        onchange={(e) => handleFiles((e.target as HTMLInputElement).files)}
      />
      <Leaflet feature={feature()} />
    </div>
  );
};

export default Mapping;
