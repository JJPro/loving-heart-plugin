import { useBlockProps } from '@wordpress/block-editor';
import ActivitiesMap from './ActivitiesMap';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps} data-interactive-map>
			<ActivitiesMap />
		</div>
	);
}
