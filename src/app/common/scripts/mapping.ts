import { Feature } from '@turf/helpers';
import * as shapefile from 'shapefile';

export function parseShp(f: File): Promise<Feature> {
  return new Promise((resolve, reject) => {
    // can only process .shp only for now
    try {
      const reader = new FileReader();

      reader.onload = (ev: ProgressEvent<FileReader>) => {
        shapefile
          .open(ev.target.result)
          .then((source) => source.read())
          .then((result) => {
            resolve(result.value as Feature);
          });
      };

      reader.readAsArrayBuffer(f);
    } catch (err) {
      reject(err);
    }
  });
}
