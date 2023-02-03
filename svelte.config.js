import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),

		alias: {
			// these are the aliases and paths to them
			data: './src/lib/data',
			//utils: './src/lib/util', // fix
			static: './static',
			types: './src/types',
			assets: './src/assets'
		}
	}
};

export default config;
