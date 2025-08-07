# vite-plugin-eink-devtools

A Vite plugin to inject a lightweight devtools panel into browsers that lack built-in developer tools, such as those found on many e-ink tablets (e.g., Kobo Libra Color).

## Features

- Injects a simple devtools overlay for inspecting DOM and console logs.
- Designed for legacy browsers with limited CSS/JS support.
- Zero-config: works out of the box with Vite projects.

## Installation

```bash
npm install -D vite-plugin-eink-devtools
```

## Usage

Add the plugin to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import einkDevtools from 'vite-plugin-eink-devtools';

export default defineConfig({
  plugins: [einkDevtools()],
});
```

## How It Works

When bundling using vite, this plugin will inject the devtool in html page, 
When loading the page it only start the devtool if native devtools are inaccessible (old browser), 
Devtools can the be opened with the small triangle at bottom left

Implemented
- Console viewer

Todo
- DOM inspector
- JS Evaluator
- CSS Evaluator

## Compatibility

- Tested on legacy browsers (e.g., Android Browser 4).
- Works with e-ink devices like Kobo Libra Color.

## Development

- TypeScript codebase.
- Contributions welcome!

## License

MIT