import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { TextControl, TextareaControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import ActivitiesMap from './ActivitiesMap';

// import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps} data-interactive-map>
			<ActivitiesMap />
		</div>
	);
}
