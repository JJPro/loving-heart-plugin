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
                'public' => true,
                'description' => 'Use Tags to categorize Activities',
                'show_in_rest' => true,
				'publicly_queryable' => false,
            )
        );
    }
}
