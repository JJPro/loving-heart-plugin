import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import ActivitiesList from './ActivitiesList';

domReady(() => {
	const rootElements = document.getElementsByClassName('activities-archive');
	Array.from(rootElements).forEach((root) => {
		render(<ActivitiesList />, root);
	});
});
