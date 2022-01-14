import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

import type { Feature } from '@turf/helpers';
import L from 'leaflet';
import type { Component } from 'solid-js';
import { createEffect, onCleanup, onMount } from 'solid-js';

interface LeafletProps {
  feature?: Feature;
}

const Leaflet: Component<LeafletProps> = (props) => {
  let divEl: HTMLDivElement;
  let map: L.Map;

  const layers: L.GeoJSON[] = [];

  onMount(() => {
    map = L.map(divEl, {
      center: [0, 115.9213],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  });

  onCleanup(() => {
    map.off().remove();
  });

  createEffect(() => {
    if (!props.feature) return;

    layers.forEach((layer) => map.removeLayer(layer));

    const f = L.geoJSON(props.feature).addTo(map);

    map.invalidateSize();
    map.fitBounds(f.getBounds(), { maxZoom: 10 });

    layers.push(f);
  });

  return (
    <div class='relative border border-gray-300' style={{ height: '500px' }}>
      <div class='h-full' ref={divEl}></div>
    </div>
  );
};

export default Leaflet;
