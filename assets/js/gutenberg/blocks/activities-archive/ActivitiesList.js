import { useState, useEffect } from '@wordpress/element';
import $ from 'jquery';
import { Icon, link } from '@wordpress/icons';
import { fetchActivityTags, fetchActivities } from '../../../api';
import {car, phone, place} from './icons';

export default () => {
	const [activeTag, setActiveTag] = useState(null); // ID of active tag
	const [activities, setActivities] = useState([]);
	const [tags, setTags] = useState([]);
	useEffect(async () => {
		const activitiesData = await fetchActivities();
		const tagsData = await fetchActivityTags();
		setActivities(activitiesData);
		setTags(tagsData);
	}, [])


	let activeActivities = activities;
	if (activeTag) {
		activeActivities = activities.filter((activity) => {
			return activity.tags.some((tag) => activeTag === tag.ID);
		});
	}

	const toggleMoreInfoPanel = (el) => {
		el.target.classList.toggle('open');
		$(
			el.target
				.closest('article')
				.querySelector('.activity-more__content')
		).slideToggle();
	};

	return (
		<>
			{/* Tags list */}
			<ul className="tags-list">
				<li>
					<button
						className={`activity-tag ${
							activeTag ? '' : 'active'
						}`}
						onClick={() => setActiveTag(null)}
					>
						All
					</button>
				</li>
				{tags.map((tag) => (
					<li key={tag.ID}>
						<button
							className={`activity-tag ${
								tag.ID === activeTag ? 'active' : ''
							}`}
							onClick={() => setActiveTag(tag.ID)}
						>
							{tag.name}
						</button>
					</li>
				))}
			</ul>

			{/* Activity post articles */}
			{activeActivities.map((activity) => (
				<article key={activity.ID}>
					<div className="activity-detail">
						{/* Activity Image */}
						<div className="image-container">
							<img
								src={activity.thumbnail}
								alt={`${activity.title} activity`}
							/>
						</div>
						{/* Activity Metadata */}
						<div className="activity-meta">
							<h1 className="title">
								{activity.title}
							</h1>
							<div className="intro">
								{activity.description}
							</div>
							{/* tag list */}
							<ul className="tags">
								{activity.tags.map((tag) => (
									<li key={tag.ID}>
										<button
											className="activity-tag"
											onClick={() => setActiveTag(tag.ID)}
										>
											{tag.name}
										</button>
									</li>
								))}
							</ul>
							{/* info */}
							<ul className="activity-meta-list">
								{activity.location && (
									<li>
										<Icon icon={place} className='icon' />
										{activity.location}
									</li>
								)}
								{activity['travelTime'] && (
									<li>
										<Icon icon={car} className='icon' />
										{activity['travelTime']}
									</li>
								)}
								{activity.phone && (
									<li>
										<Icon icon={phone} className='icon' />
										{activity.phone}
									</li>
								)}
								{activity.website && (
									<li>
										<Icon icon={link} className='icon' />
										{activity.website}
									</li>
								)}
							</ul>
							{activity.moreInfo && (
								<button
									className="activity-more__btn"
									onClick={toggleMoreInfoPanel}
								>
									More Information
								</button>
							)}
						</div>
					</div>
					<div
						className="activity-more__content"
						dangerouslySetInnerHTML={{
							__html: activity.moreInfo,
						}}
					></div>
				</article>
			))}
		</>
	);
};
