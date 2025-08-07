import type { PluginOption } from 'vite';
import devtoolScript from "./script.js?raw"

export default function vitePluginEinkDevtools(): PluginOption {
  return {
    name: 'eink-devtools',
    transformIndexHtml(html) {
      return html.replace(/(<body[^>]*>)/i, `$1<script>${devtoolScript}</script>`);
    }
  }
}