import { useBlockProps } from '@wordpress/block-editor';
import ActivitiesMap from './ActivitiesMap';

export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()} data-interactive-map>
			<ActivitiesMap />
		</div>
	);
}
