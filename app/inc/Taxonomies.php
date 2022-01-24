<?php

namespace app\inc;

class Taxonomies
{
	public static function init()
	{
		self::registerActivityTags();
	}


	private static function registerActivityTags()
	{
		register_taxonomy(
			'activity-tag',
			'activity',
			array(
				'labels' => array(
					'name' => 'Activity Tags',
					'singular_name' => 'Activity Tag',
					'search_items' => 'Search Tags',
					'all_items' => 'All Activity Tags',
					'parent_item' => 'Parent Tag',
					'edit_item' => 'Edit Tag',
					'view_item' => 'View Tag',
					'update_item' => 'Update Tag',
					'add_new_item' => 'Add New Tag',
					'new_item_name' => 'New Tag Name',
					'not_found' => 'No tags found',
					'no_terms' => 'No tags',
					'filter_by_item' => 'Filter by activity tags',
					'item_link' => 'Tag Link',
					'item_link_description' => 'A link to a tag',
				),
				'description' => 'Use Tags to categorize Activities',
				'public' => true,
				'hierarchical' => true,
				'show_in_rest' => true,
				'publicly_queryable' => false,
			)
		);
	}
}
