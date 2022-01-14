import { Feature } from '@turf/helpers';
import JSZip from 'jszip';
import * as shapefile from 'shapefile';

export function parseShpFromBuffer(b: ArrayBuffer): Promise<Feature> {
  return new Promise((resolve, reject) => {
    try {
      shapefile
        .open(b)
        .then((source) => source.read())
        .then((result) => {
          resolve(result.value as Feature);
        });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Parses either .zip or .shp file to geojson Feature
 */
export function parseShpFromFile(f: File): Promise<Feature> {
  return new Promise((resolve, reject) => {
    const fileExt = f.name.split('.').pop();

    // can only process .shp only for now
    try {
      switch (fileExt) {
        case 'zip':
          {
            const zipper = new JSZip();
            zipper.loadAsync(f).then((zip) => {
              let hasShp = false;

              for (const k in zip.files) {
                if (k.includes('.shp')) {
                  zipper
                    .file(k)
                    .async('arraybuffer')
                    .then((content) => {
                      parseShpFromBuffer(content).then(resolve).catch(reject);
                    });

                  hasShp = true;
                  break;
                }
              }

              if (!hasShp) {
                reject('.zip does not contain any .shp file');
              }
            });
          }
          break;
        case 'shp':
          {
            const reader = new FileReader();

            reader.onload = (ev: ProgressEvent<FileReader>) => {
              parseShpFromBuffer(ev.target.result as ArrayBuffer)
                .then(resolve)
                .catch(reject);
            };

            reader.readAsArrayBuffer(f);
          }
          break;
        default:
          reject('Can only accept either .zip or .shp files');
      }
    } catch (err) {
      reject(err);
    }
  });
}
