<?php
/**
 * Return the HTML code to be rendered
 *
 * Tips:
 * 	"illuminate/support" package is included in the project (see composer.json),
 *  therefore Symphony and Laravel support functions are available.
 * 	For example:
 * 		`dump/1`: prettier var_dump
 * 		`dd/1`  : dump and die
 *
 * @param $attributes
 * @param $content
 * @param $block
 * @return string HTML code to render
 */
return <<<HTML
<h1>Hello</h1>
HTML;
