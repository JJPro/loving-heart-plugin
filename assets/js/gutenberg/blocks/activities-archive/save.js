import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: 'activities-archive',
	});
	return (
		<div {...blockProps} >
		</div>
	);
}
