import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(_isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    watchFiles: false,
  });
}
