import { useState, useEffect } from '@wordpress/element';
import $ from 'jquery';
import { Icon, link } from '@wordpress/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { fetchActivityTags, fetchActivities } from '../../../api';
import { car, phone, place } from './icons';
import { prefixUrlWithProtocol } from '../../utils';

const perPage = 10;
export default () => {
	const [activities, setActivities] = useState([]);
	const [tags, setTags] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(async () => {
		const activitiesData = await fetchActivities();
		const tagsData = await fetchActivityTags();
		setActivities(activitiesData);
		setTags(tagsData);
	}, []);
	const [searchParams] = useSearchParams();
	const currentTag = parseInt(searchParams.get('tag'));

	let filteredActivities = activities;
	if (currentTag) {
		filteredActivities = activities.filter((activity) => {
			return activity.tags.some((tag) => currentTag === tag.ID);
		});
	}

	const paginatedActivities = filteredActivities.slice(
		perPage * (page - 1),
		perPage * page
	);

	const toggleMoreInfoPanel = (el) => {
		el.target.classList.toggle('open');
		$(
			el.target
				.closest('article')
				.querySelector('.activity-more__content')
		).slideToggle();
	};

	const TagLink = ({
		tagID = null,
		needsActiveHighlight = true,
		...props
	}) => {
		const [params] = useSearchParams();
		if (tagID) {
			params.set('tag', tagID);
		} else {
			params.delete('tag');
		}
		const classes = ['activity-tag'];
		if (needsActiveHighlight) {
			if (tagID === currentTag || (!tagID && !currentTag)) {
				classes.push('current');
			}
		}
		return (
			<Link
				className={classes.join(' ')}
				to={`?${params.toString()}`}
				{...props}
			/>
		);
	};

	return (
		<>
			{/* Tags list */}
			<ul className="tags-list">
				<li>
					<TagLink>All</TagLink>
				</li>
				{tags.map((tag) => (
					<li key={tag.ID}>
						<TagLink tagID={tag.ID}>{tag.name}</TagLink>
					</li>
				))}
			</ul>

			{/* Activity post articles */}
			{paginatedActivities.map((activity) => (
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
							<h1 className="title">{activity.title}</h1>
							<div className="intro">{activity.description}</div>
							{/* tag list */}
							<ul className="tags">
								{activity.tags.map((tag) => (
									<li key={tag.ID}>
										<TagLink
											tagID={tag.ID}
											needsActiveHighlight={false}
										>
											{tag.name}
										</TagLink>
									</li>
								))}
							</ul>
							{/* info */}
							<ul className="activity-meta-list">
								{activity.location && (
									<li>
										<Icon icon={place} className="icon" />
										{activity.mapLink ? (
											<a href={activity.mapLink}>
												{activity.location}
											</a>
										) : (
											activity.location
										)}
									</li>
								)}
								{activity.travelTime && (
									<li>
										<Icon icon={car} className="icon" />
										{activity.mapLink ? (
											<a href={activity.mapLink}>
												{activity.travelTime}
											</a>
										) : (
											activity.travelTime
										)}
									</li>
								)}
								{activity.phone && (
									<li>
										<Icon icon={phone} className="icon" />
										<a href={`tel:${activity.phone}`}>
											{activity.phone}
										</a>
									</li>
								)}
								{activity.website && (
									<li>
										<Icon icon={link} className="icon" />
										<a
											href={prefixUrlWithProtocol(
												activity.website
											)}
										>
											{activity.website}
										</a>
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

			<Pagination
				className="pagination"
				count={Math.ceil(filteredActivities.length / perPage)}
				onChange={(_e, newPage) => setPage(newPage)}
			/>
		</>
	);
};
