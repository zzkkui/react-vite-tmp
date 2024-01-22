import type { PluginOption } from 'vite';
import compressPlugin from 'vite-plugin-compression2';

// 打包压缩
export function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginalAssets = false,
): PluginOption | PluginOption[] {
  const compressList = compress.split(',');

  const plugins: PluginOption[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        deleteOriginalAssets
      }),
    );
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        algorithm: 'brotliCompress',
        deleteOriginalAssets,
      }),
    );
  }
  return plugins;
}
