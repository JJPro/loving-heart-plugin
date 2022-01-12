import { select } from '@wordpress/data';

export function getCurrentPostType() {
	return select('core/editor').getCurrentPostType();
}

export function prefixUrlWithProtocol(url) {
	url = url.trim();
	if (!url.startsWith('http')) {
		url = 'http://' + url;
	}
	return url;
}
