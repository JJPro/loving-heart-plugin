import domReady from '@wordpress/dom-ready';
import $ from 'jquery';
import { fetchActivities } from '../../../api';

domReady(async () => {
	/**
	 * Interactive Map
	 */
	// eslint-disable-next-line no-undef
	const interactiveMaps = document.querySelectorAll('[data-interactive-map]');
	if (interactiveMaps.length > 0) {
		const activities = await fetchActivities();
		interactiveMaps.forEach((interactiveMap) => {
			activities.forEach((item) => {
				const { title, slug, tags } = item;
				if (!slug) return;
				const label = interactiveMap.querySelector(`#${slug}`);
				const tagsHtml = tags.reduce(
					(html, tag) =>
						html +
						`<li><button class="activity-tag">${tag.name}</button></li>`,
					''
				);
				const $element = $(
					`<div class="popup-dialog">
						<h1>
							${title}
						</h1>
						<ul>
							${tagsHtml}
						</ul>
					</div>`
				);
				$(label)
					.css('cursor', 'pointer')
					.css('pointer-events', 'bounding-box')
					.on('mouseenter', function (e) {
						$(interactiveMap).append(
							$element.css({
								left: e.offsetX,
								top: e.offsetY,
								transform: 'translate(-50%, 1rem)',
							})
						);
						const rect = $element[0].getBoundingClientRect();
						let outOfBounds = false;
						let translateX = '-50%';
						let translateY = '1rem';
						if (rect.left < 5) {
							outOfBounds = true;
							translateX = `calc(${translateX} + ${5 - rect.left}px)`;
						}
						if ($(window).width() - rect.right < 5) {
							outOfBounds = true;
							translateX = `calc(${translateX} + ${$(window).width() - 5 - rect.right}px)`;
						}
						if (rect.bottom > $(window).height()) {
							outOfBounds = true;
							translateY = `calc(${translateY} - ${rect.height}px - 1.75rem)`;
						}
						if (outOfBounds) {
							$element.css('transform', `translate(${translateX}, ${translateY})`);
						}
					})
					.on('mouseleave', function () {
						$element.remove();
					});
			});
		});
	}
});
