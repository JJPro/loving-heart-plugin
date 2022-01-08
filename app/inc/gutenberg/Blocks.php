<?php
namespace app\inc\gutenberg;

class Blocks
{
    public static function registerBlockTypes()
    {
        $blockPaths = glob(LHR_ROOT_PATH . '/assets/js/gutenberg/blocks/*');
        array_walk($blockPaths, function ($blockPath) {
			$args = array();
			if (file_exists($blockPath . '/render.php')) {
				$args['render_callback'] = fn ($attributes, $content, $block) => require($blockPath . '/render.php');
			}
			register_block_type($blockPath, $args);
		});
    }
}
