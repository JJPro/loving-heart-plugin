import { select } from '@wordpress/data';

export function getCurrentPostType() {
	return select('core/editor').getCurrentPostType();
}
