import { registerPlugin } from '@wordpress/plugins';
import PrepublishChecklist from './prepublish-checklist';
import { getCurrentPostType } from '../utils';

registerPlugin('lhr-editor-plugins', {
	render: () => {
		const postType = getCurrentPostType();

		return <>{'activity' === postType && <PrepublishChecklist />}</>;
	},
});
