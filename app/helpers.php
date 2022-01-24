<?php

namespace app;

/**
 * Get all activity tags in the system
 * @return array array(['name' => xx, 'slug' => xx, 'link' => xx])
 */
function get_all_activity_tags()
{
	$tags = get_terms(
		array(
			'taxonomy' => 'activity-tag',
			'hide_empty' => true,
		)
	);

	$tags = array_map(
		fn ($tag) => [
			'name' => ucwords($tag->name),
			'slug' => $tag->slug,
			'link' => get_term_link($tag->term_id),
			'ID'   => $tag->term_id,
		],
		$tags
	);
	return $tags;
}


/**
 * Get activity tags for given activity
 */
function get_post_activity_tags($postID)
{
	$tags = wp_get_post_terms($postID, 'activity-tag');

	$tags = array_map(
		fn ($tag) => [
			'name' => ucwords($tag->name),
			'slug' => $tag->slug,
			'link' => get_term_link($tag->term_id),
			'ID'   => $tag->term_id,
		],
		$tags
	);
	return $tags;
}
