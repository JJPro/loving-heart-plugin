<?php
namespace app\inc\elementor;

use app\inc\elementor\widgets\Card;

class Elementor
{
	const CATEGORY = 'loving-heart';

	/**
	 * Add a "Loving Heart" category to the Elementor widget panel.
	 *
	 * @param \Elementor\Elements_Manager $elements_manager
	 */
	public static function registerCategory($elements_manager)
	{
		$elements_manager->add_category(self::CATEGORY, [
			'title' => 'Loving Heart',
			'icon'  => 'eicon-heart',
		]);
	}

	/**
	 * @param \Elementor\Widgets_Manager $widgets_manager
	 */
	public static function registerWidgets($widgets_manager)
	{
		$widgets_manager->register(new Card());
	}

	/**
	 * Register (not enqueue) widget stylesheets; each widget pulls its own in
	 * through get_style_depends(). Built by webpack.mix.js into dist/js/elementor/.
	 */
	public static function registerStyles()
	{
		$path = LHR_ASSETS_PATH . '/js/elementor/style-card.css';
		if (!file_exists($path)) {
			return;
		}
		wp_register_style(
			'lhr-elementor-card',
			LHR_ASSETS_URI . '/js/elementor/style-card.css',
			[],
			filemtime($path)
		);
	}
}
