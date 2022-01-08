import { useBlockProps } from '@wordpress/block-editor';
import ActivitiesList from './ActivitiesList'

export default function Edit() {
	const blockProps = useBlockProps({
		className: 'activities-archive'
	});

	return (
		<div {...blockProps}>
			<ActivitiesList />
		</div>
	);
}
