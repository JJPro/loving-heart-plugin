import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { TextControl, TextareaControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps();
	const postType = useSelect(
		(select) => select('core/editor').getCurrentPostType(),
		[]
	);
	const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={['core/post-featured-image']}
				template={[['core/post-featured-image', {}]]}
				templateLock="all"
			/>
			<TextControl
				label="Slug"
				value={meta.slug}
				onChange={(slug) => setMeta({ slug })}
				placeholder="e.g. smoking-mountains"
				help="Must match the id of <g> tag for locations in the interactive map on /activities page"
			/>
			<TextareaControl
				label="Description"
				value={meta.description}
				onChange={(description) => setMeta({ description })}
			/>
			<TextControl
				label="Location"
				value={meta.location}
				onChange={(location) => setMeta({ location })}
			/>
			<TextControl
				label="Google Maps Link"
				value={meta.mapLink}
				onChange={(mapLink) => setMeta({ mapLink })}
			/>
			<TextControl
				label="Travel Time"
				value={meta['travelTime']}
				onChange={(travelTime) =>
					setMeta({ 'travelTime': travelTime })
				}
				placeholder="e.g. 3.6miles | 10mins"
			/>
			<TextControl
				label="Phone"
				value={meta.phone}
				onChange={(phone) => setMeta({ phone })}
				placeholder="e.g. (123) 456-7890"
			/>
			<TextControl
				label="Website"
				value={meta.website}
				onChange={(website) => setMeta({ website })}
				type="url"
			/>
		</div>
	);
}
