import type { ImageMetadata } from 'astro';

const imageModules = import.meta.glob(
  '../assets/images/portfolio/**/*.{png,jpg,jpeg,webp,svg,gif}',
  { import: 'default', eager: true },
) as Record<string, ImageMetadata>;

/**
 * Resolves a path relative to `src/assets/images/portfolio/` to imported image metadata for `astro:assets`.
 */
export function portfolioImage(relative: string): ImageMetadata {
  const key = `../assets/images/portfolio/${relative}`;
  const img = imageModules[key];
  if (!img) {
    throw new Error(
      `[portfolio] Missing image "${relative}". Expected key: ${key}\n` +
        `Found: ${Object.keys(imageModules).sort().join('\n')}`,
    );
  }
  return img;
}
