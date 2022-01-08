<?php
namespace app\inc;

class Scripts
{
	public static function enqueueEditorAssets()
	{
		$assets_path = LHR_ASSETS_PATH;
		$assets_uri = LHR_ASSETS_URI;

		/**
		 * this script contains editor plugins
		 */
		wp_enqueue_script(
				'lhr/editor-js',
				$assets_uri . '/js/editor.js',
				['wp-element', 'wp-blocks', 'wp-plugins', 'wp-edit-post', 'wp-data'], // deps
				filemtime($assets_path . '/js/editor.js'),
				true // in_footer?
		);
	}

	public static function browserSyncJS()
	{
		/**
		 * Load browsersync for hot reload while debugging
		 */
		add_action('wp_print_scripts', function () {
			echo '<script async="" src="http://wp.localhost:3000/browser-sync/browser-sync-client.js"></script>';
		});
	}
}
