import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActivitiesList from './ActivitiesList';

domReady(() => {
	const rootElements = document.getElementsByClassName('activities-archive');
	Array.from(rootElements).forEach((root) => {
		render(
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<ActivitiesList />} />
				</Routes>
			</BrowserRouter>,
			root
		);
	});
});
