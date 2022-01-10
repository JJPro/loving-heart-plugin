<?php
namespace app\inc;

class Shortcodes
{
	public static function init()
	{
		self::activitiesMap();
		self::activitiesArchive();
	}

	public static function activitiesMap()
	{
		add_shortcode('lhr_activities_map', function() {
			wp_enqueue_script('lhr-activities-map-script');
			wp_enqueue_style ('lhr-activities-map-style');
			return '<div class="wp-block-lhr-activities-map" data-interactive-map>'
				. file_get_contents(LHR_ROOT_PATH . '/dist/images/map.svg')
				. '</div>';
		});
	}

	public static function activitiesArchive()
	{
		add_shortcode('lhr_activities_archive', function () {
			wp_enqueue_script('lhr-activities-archive-script');
			wp_enqueue_style('lhr-activities-archive-style');
			return '<div class="wp-block-lhr-activities-archive activities-archive"></div>';
		});
	}
}
