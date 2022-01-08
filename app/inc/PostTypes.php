<?php
namespace app\inc;

class PostTypes
{
    public static function init()
    {
        self::registerActivityPostType();
    }

    private static function registerActivityPostType()
    {
        register_post_type('activity', [
            'label' => 'Activity',
            'description' => 'Activities',
						'publicly_queryable' => false,
            'hierarchical' => false,
            'show_ui' => true, // show in admin
            'show_in_admin_bar' => true,
            'show_in_nav_menus' => false,
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-location-alt',
            'supports'  => ['title', 'editor','thumbnail', 'custom-fields'],
            'has_archive' => false,
            'template'  => [
                ['lhr/activity'],
                ['core/paragraph', ['placeholder' => 'More about this site...']],
            ],
        ]);

		self::activity__changePostTitleField();
		self::activity__registerPostMetas();
    }

	private static function activity__changePostTitleField()
	{
		add_filter('enter_title_here', function ($title) {
			if ('activity' == get_post_type()) {
				$title = "Name of Activity Site";
			}
			return $title;
		});
	}

	private static function activity__registerPostMetas()
	{
		register_post_meta('activity', 'slug', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function () {
				return current_user_can('edit_posts');
			}
		));
		register_post_meta('activity', 'description', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function () {
				return current_user_can('edit_posts');
			}
		));
		register_post_meta('activity', 'location', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function () {
				return current_user_can('edit_posts');
			}
		));
		register_post_meta('activity', 'mapLink', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function () {
				return current_user_can('edit_posts');
			}
		));
		register_post_meta('activity', 'travelTime', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function () {
				return current_user_can('edit_posts');
			}
		));
		register_post_meta('activity', 'phone', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function () {
				return current_user_can('edit_posts');
			}
		));
		register_post_meta('activity', 'website', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'auth_callback' => function () {
				return current_user_can('edit_posts');
			}
		));
	}
}
