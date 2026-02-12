import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://yimingwei-pv.github.io',
  base: '/AI-PM-Bootcamp',
  integrations: [react(), tailwind()],
  output: 'static',
  trailingSlash: 'always',
});
