import { useBlockProps } from '@wordpress/block-editor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActivitiesList from './ActivitiesList';

export default function Edit() {
	const blockProps = useBlockProps({
		className: 'activities-archive',
	});

	return (
		<div {...blockProps}>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<ActivitiesList />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
