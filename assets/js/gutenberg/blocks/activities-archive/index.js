// "script": "file:../../../../../dist/js/gutenberg/blocks/script-activities-archive.js",

import { registerBlockType } from '@wordpress/blocks';
import blockInfo from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

registerBlockType(blockInfo.name, {
	edit: Edit,
	save,
});
