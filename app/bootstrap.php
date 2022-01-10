<?php
namespace app;

use app\inc\gutenberg\Blocks;
use app\inc\Scripts;
use app\inc\PostTypes;
use app\inc\REST;
use app\inc\Shortcodes;
use app\inc\Taxonomies;

add_action('init', [PostTypes::class, 'init']);
add_action('init', [Taxonomies::class, 'init']);
add_action('init', [Blocks::class, 'registerBlockTypes']);
add_action('init', [Shortcodes::class, 'init']);
add_action('enqueue_block_editor_assets', [Scripts::class, 'enqueueEditorAssets']);
add_action('rest_api_init', [REST::class, 'init']);

if (WP_DEBUG) {
    add_action('wp_enqueue_scripts',    [Scripts::class, 'browserSyncJS']);
    add_action('admin_enqueue_scripts', [Scripts::class, 'browserSyncJS']);
}
