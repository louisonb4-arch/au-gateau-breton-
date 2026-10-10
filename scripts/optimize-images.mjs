// Converts the source photos in assets/photos into web-ready WebP files in public/images.
// Run with `npm run images` after adding or replacing a photo.
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/photos";
const OUT = "public/images";
const MAX_WIDTH = 1600;

// Per-photo crop in percent of the original (removes phone UI artifacts / letterboxing).
const CROPS = {
  salle: { top: 6, right: 5, bottom: 0, left: 0 },
};

await mkdir(OUT, { recursive: true });

for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = path.parse(file).name;
  let img = sharp(path.join(SRC, file)).rotate();

  const crop = CROPS[name];
  if (crop) {
    const { width, height } = await img.metadata();
    const left = Math.round((width * crop.left) / 100);
    const top = Math.round((height * crop.top) / 100);
    img = img.extract({
      left,
      top,
      width: width - left - Math.round((width * crop.right) / 100),
      height: height - top - Math.round((height * crop.bottom) / 100),
    });
  }

  const info = await img
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .modulate({ saturation: 0.96 })
    .webp({ quality: 78 })
    .toFile(path.join(OUT, `${name}.webp`));

  console.log(`${name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

// Social sharing image (Open Graph / WhatsApp / Facebook preview).
await sharp(path.join(SRC, "veranda.jpg"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og.jpg");
console.log("og.jpg  1200x630");
