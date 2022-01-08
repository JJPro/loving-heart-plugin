<?php

/**
 * Plugin Name:     Loving Heart Retreats Plugin
 * Description:     Provides the interactive activities map block, and activities archive block
 * Author:          Lu Ji (Jason)
 * Author URI:      https://github.com/jjpro
 * Text Domain:     loving-heart
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 * @package         loving-heart
 */

use Timber\Timber;

// prevent direct access
defined('ABSPATH') || exit;

/**
 * Helper function for prettying up errors
 *
 * @param string $message
 * @param string $subtitle
 * @param string $title
 */
$lhr_error = function ($message, $subtitle = '', $title = '') {
	$title   = $title ?: 'Error';
	$footer  = '<a href="https://www.github.com/jjpro">github.com/jjpro</a>';
	$message = "<h1>{$title}<br><small>{$subtitle}</small></h1><p>{$message}</p><p>{$footer}</p>";
	wp_die($message, $title);
};


/**
 * Ensure dependencies are loaded
 */
if (!class_exists('Timber\\Timber')) {
	if (!file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
		$lhr_error(
			'You must run <code>composer install</code> from the theme directory.',
			'Autoloader not found.'
		);
	}
	require_once $composer;
}

/**
 * Setup actions and filters
 * Add or remove files to the array as needed.
 */
array_map(function ($file) use ($lhr_error) {
	$file = "app/{$file}.php";
	require_once($file);
}, ['constants', 'helpers', 'bootstrap']);

/**
 * Initialize Timber
 */
Timber::$dirname = 'views';
// Timber::$twig_cache = true;
