import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

/**
 * Runner de tests de Back 2 (Vitest). Congelado en TECH-STACK.md como
 * `devDependency`: no entra al bundle de producción.
 *
 * Resuelve el alias `@/*` -> `./src/*` igual que `tsconfig.json`.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
