import { registerBlockType } from '@wordpress/blocks';
import blockInfo from './block.json';

/**
 * Internal dependencies
 */
import Edit from './edit';

registerBlockType(blockInfo.name, {
	edit: Edit,
});
