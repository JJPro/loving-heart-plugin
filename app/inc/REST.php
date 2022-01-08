<?php

namespace app\inc;

use function app\get_all_activity_tags;
use function app\get_post_activity_tags;

class REST
{
	public static function init()
	{
		self::activitiesAPI();
		self::activityTagsAPI();
	}

	private static function activitiesAPI()
	{
		$namespace = 'loving-heart/v1';
		$route = 'activities';

		register_rest_route($namespace, $route, array(
			[
				'methods' 	=> 'GET',
				'permission_callback' => '__return_true',
				'callback'  => function($request) {

					$activities = get_posts(array(
						'posts_per_page' => -1,
						'post_type' => 'activity',
					));

					$activities = array_map(
						function (\WP_Post $activity) {
							return array(
								"ID" => $activity->ID,
								"title" => $activity->post_title,
								"slug" => $activity->slug,
								"thumbnail" => wp_get_attachment_url($activity->_thumbnail_id),
								"description" => $activity->description,
								"location" => $activity->location,
								"mapLink" => $activity->mapLink,
								"travelTime" => $activity->travelTime,
								"phone" => $activity->phone,
								"website" => $activity->website,
								"moreInfo" => $activity->post_content,
								"tags" => get_post_activity_tags($activity->ID),
							);
						}, $activities
					);

					return rest_ensure_response($activities);
				}
			]
		));
	}

	private static function activityTagsAPI()
	{
		$namespace = 'loving-heart/v1';
		$route = 'activity-tags';

		register_rest_route($namespace, $route, array(
			[
				'methods' 	=> 'GET',
				'permission_callback' => '__return_true',
				'callback'  => function($request) {
					$tags = get_all_activity_tags();

					return rest_ensure_response($tags);
				}
			]
		));
	}


}
