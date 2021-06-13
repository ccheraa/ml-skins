import sharp from 'sharp';
import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { Orientation } from "./classes";

// const img = sharp('./data/h/akai/Akazonae_Samurai.jpg')
//     .resize(960, 540, {
//         fit: 'contain',
//         withoutEnlargement: true,
//     })
//     .toColorspace('rgb12')
//     .greyscale();
// // img.toFile('data/h-akai-AkaAkazonae_Samurai.png')
// img.raw().toBuffer()
//     .then(data => {
//         console.log('data:', data.length, data);
//         const pixels = [...data].map(p => Math.round(p * 15 / 255));
//         console.log('pixels:', pixels.length, pixels);
//         const result = [];
//         for (let i = 0; i < pixels.length; i += 2) {
//             result.push(pixels[i] + pixels[i + 1] * 16);
//         }
//         console.log('result:', result.length, result);
//         writeFileSync('data/h-akai-AkaAkazonae_Samurai.bin', Buffer.from(result), 'binary');
//     })
//     // .then(data => [...data].map(p => Math.round(p * 15 / 255)))
//     // .then(pixels => pixels.reduce((result, p) => (result.length > 1)
//     //     ? [[...result[0], result[1] + p * 16]]
//     //     : [result[0], p], [[]]))
//     .then(console.log)
//     .catch(console.error);

const Extensions = ['webp', 'jpg', 'jpeg', 'png'];

export function addExt(path: string): string {
  for (let ext of Extensions) {
    const fullpath = `${path}.${ext}`;;
    if (existsSync(fullpath)) {
      return fullpath;
    }
  }
  throw new Error('missing extension??');
}

export function getImage16(orientation: Orientation, hero: string, skin: string): Promise<string> {
  return new Promise((res, rej) => {
    const path16 = resolve(`./data/c/${orientation}-${hero}-${skin}`);
    if (existsSync(path16)) {
      res(path16);
    } else {
      const path = addExt(resolve(`./data/${orientation}/${hero}/${skin}`));
      if (!existsSync(path)) {
        throw new Error('skin not found');
      }
      if (existsSync(path)) {
        sharp(path)
          .greyscale()
          .clahe({
            height: 100,
            width: 100,
            maxSlope: 100
          })
          .resize(960, 540, {
            fit: 'contain',
            withoutEnlargement: true,
          })
          .rotate(orientation === 'v' ? -90 : 0)
          .raw().toBuffer()
          .then(data => {
            const pixels = [...data].map(p => Math.round(p * 15 / 255));
            const result = [];
            for (let i = 0; i < pixels.length; i += 2) {
              result.push(pixels[i] + pixels[i + 1] * 16);
            }
            writeFileSync(path16, Buffer.from(result), 'binary');
            res(path16);
          })
          .catch(e => {
            throw e;
          });
      }
    }
  });
}
export function getImage(orientation: Orientation, hero: string, skin: string): Promise<string> {
  return new Promise((res, rej) => {
    const image = resolve(`./data/c/t-${orientation}-${hero}-${skin}.jpg`);
    if (false && existsSync(image)) {
      res(image);
    } else {
      const path = addExt(resolve(`./data/${orientation}/${hero}/${skin}`));
      if (!existsSync(path)) {
        throw new Error('skin not found');
      }
      if (existsSync(path)) {
        sharp(path)
          // .rotate(orientation === 'v' ? -90 : 0)
          // .greyscale()
          // .clahe({
          //   height: 100,
          //   width: 100,
          //   maxSlope: 100
          // })
          // .resize(960, 540, {
          //   fit: 'contain',
          //   withoutEnlargement: true,
          // })
          .toFile(image)
          .then(() => res(image));
      }
    }
  });
}