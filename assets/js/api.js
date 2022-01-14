import axios from 'axios';

const restRoute = '/index.php?rest_route=/';
const namespace = 'loving-heart/v1';
const routeActivities = '/activities';
const routeTags = '/activity-tags';

export const fetchActivities = async () => {
	// const restRoute = document
	// 	.querySelector('link[rel="https://api.w.org/"]')
	// 	.getAttribute('href');

	return await axios({
		method: 'GET',
		url: restRoute + namespace + routeActivities,
	})
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			// eslint-disable-next-line
			console.log(error);
		});
};

export const fetchActivityTags = async () => {
	// const restRoute = document
	// 	.querySelector('link[rel="https://api.w.org/"]')
	// 	.getAttribute('href');

	return await axios({
		method: 'GET',
		url: restRoute + namespace + routeTags,
	})
		.then((resp) => {
			return resp.data;
		})
		.catch((error) => {
			// eslint-disable-next-line
			console.log(error);
		});
};
