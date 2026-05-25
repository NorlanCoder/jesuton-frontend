const sharp = require('sharp');
const path = require('path');

(async () => {
  const input = path.join(__dirname, 'logo-source.png');
  const output = path.join(__dirname, '..', 'public', 'logo-jesuton.png');

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const channels = info.channels;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minRGB = Math.min(r, g, b);
    const maxRGB = Math.max(r, g, b);
    const lum = (r + g + b) / 3;
    const sat = maxRGB === 0 ? 0 : (maxRGB - minRGB) / maxRGB;

    if (lum >= 240 && sat < 0.05) {
      data[i + 3] = 0;
    } else if (lum >= 215 && sat < 0.1) {
      const t = (lum - 215) / (240 - 215);
      data[i + 3] = Math.round(255 * (1 - t));
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels } })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log('Logo transparent généré :', output);
})();
