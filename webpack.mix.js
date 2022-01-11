const mix = require("laravel-mix");
// eslint-disable-next-line no-unused-vars
const tailwind = require("mix-tailwindcss");
const glob = require("glob");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

const blockEditorScriptEntries = glob
	.sync("./assets/js/gutenberg/blocks/*/index.js")
	.reduce((acc, path) => {
		const entry = path.replace(
			/(\.\/assets\/js\/gutenberg\/blocks\/)|(\/index.js)/g,
			""
		);
		acc["dist/js/gutenberg/blocks/" + entry] = path;
		return acc;
	}, {});
const blockScriptEntries = glob
	.sync("./assets/js/gutenberg/blocks/*/script.js")
	.reduce((acc, path) => {
		const entry = path.replace(
			/(\.\/assets\/js\/gutenberg\/blocks\/)|(\/script.js)/g,
			""
		);
		acc["dist/js/gutenberg/blocks/script-" + entry] = path;
		return acc;
	}, {});
const blockViewScriptEntries = glob
	.sync("./assets/js/gutenberg/blocks/*/view.js")
	.reduce((acc, path) => {
		const entry = path.replace(
			/(\.\/assets\/js\/gutenberg\/blocks\/)|(\/view.js)/g,
			""
		);
		acc["dist/js/gutenberg/blocks/view-" + entry] = path;
		return acc;
	}, {});

// compile block styles (editor script already contains the styles, but you still need to compile it into a separate file to be loaded on the frontend)
glob
	.sync("./assets/js/gutenberg/blocks/*/style.scss")
	.forEach((path) => {
		const entry = path.replace(
			/(\.\/assets\/js\/gutenberg\/blocks\/)|(\/style.scss)/g,
			""
		);
		const output = 'dist/js/gutenberg/blocks/style-' + entry + '.css';
		mix.sass(path, output).tailwind().options({
			processCssUrls: false,
			manifest: false,
		});
	});

mix.webpackConfig({
	plugins: [new DependencyExtractionWebpackPlugin()],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'glob-import-loader',
			},
			{
				test: /\.scss$/,
				use: 'glob-import-loader',
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
		],
	},
	entry: {
		...blockEditorScriptEntries,
		...blockScriptEntries,
		...blockViewScriptEntries,
	},
})
	.js('assets/js/editor.js', 'dist/js') // editor plugins
	.react()
	.tailwind()
	.options({
		processCssUrls: false,
		manifest: false,
	})
	.sourceMaps(false, 'eval-source-map') // https://laravel.com/docs/8.x/mix#style-of-source-mapping
	.copyDirectory('assets/images', 'dist/images')
	.browserSync({
		files: [
			'views/**/*.twig',
			'assets/js/**/*.{js,jsx,scss}',
		],
		open: false, // https://browsersync.io/docs/options#option-open
		ghostMode: false, // disable mirroring of user interactions across devices
		notify: false,
	});
