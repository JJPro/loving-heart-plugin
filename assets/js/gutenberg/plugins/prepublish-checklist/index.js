import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { PluginPrePublishPanel } from '@wordpress/edit-post';
import { store as editorStore } from '@wordpress/editor';
import { Icon, closeSmall } from '@wordpress/icons';

/**
 * Ensure activity tags and fetured image are set before publishing
 */
export default () => {
	const [check, setCheck] = useState(true);
	const { lockPostSaving, unlockPostSaving } = useDispatch(editorStore);

	const { hasTags, hasFeaturedImage } = useSelect((select) => {
		const { getEditedPostAttribute } = select(editorStore);

		return {
			hasTags: getEditedPostAttribute('activity-tag').length > 0,
			hasFeaturedImage: getEditedPostAttribute('featured_media') !== 0,
		};
	});

	useEffect(() => {
		if (hasTags && hasFeaturedImage) {
			setCheck(true);
			unlockPostSaving();
		} else {
			setCheck(false);
			lockPostSaving();
		}
	}, [hasTags, hasFeaturedImage]);

	const liStyle = {
		display: 'flex',
		alignItems: 'center',
	};

	if (check) return null;
	return (
		<PluginPrePublishPanel title="Checkslist" initialOpen>
			<p style={{ fontWeight: 'bold' }}>
				The following requirements are not completed yet.
			</p>
			<div style={{ color: 'red' }}>
				<ul>
					{!hasTags && (
						<li style={liStyle}>
							<Icon icon={closeSmall} fill="red" />
							Tags are required
						</li>
					)}
					{!hasFeaturedImage && (
						<li style={liStyle}>
							<Icon icon={closeSmall} fill="red" />
							Featured Image is required
						</li>
					)}
				</ul>
			</div>
		</PluginPrePublishPanel>
	);
};
