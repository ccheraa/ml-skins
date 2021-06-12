const sharp = require('sharp');
const { writeFileSync } = require('fs');
const img = sharp('./data/h/akai/Akazonae_Samurai.jpg')
    .resize(960, 540, {
        fit: 'contain',
        withoutEnlargement: true,
    })
    .toColorspace('rgb12')
    .greyscale();
// img.toFile('data/h-akai-AkaAkazonae_Samurai.png')
img.raw().toBuffer()
    .then(data => {
        console.log('data:', data.length, data);
        const pixels = [...data].map(p => Math.round(p * 15 / 255));
        console.log('pixels:', pixels.length, pixels);
        const result = [];
        for (let i = 0; i < pixels.length; i += 2) {
            result.push(pixels[i] + pixels[i + 1] * 16);
        }
        console.log('result:', result.length, result);
        writeFileSync('data/h-akai-AkaAkazonae_Samurai.bin', Buffer.from(result), 'binary');
    })
    // .then(data => [...data].map(p => Math.round(p * 15 / 255)))
    // .then(pixels => pixels.reduce((result, p) => (result.length > 1)
    //     ? [[...result[0], result[1] + p * 16]]
    //     : [result[0], p], [[]]))
    .then(console.log)
    .catch(console.error);