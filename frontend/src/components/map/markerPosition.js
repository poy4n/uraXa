// export const postsMarkers = (tags) => {
// 	console.log('this is tags')
// 	console.log(tags)
// 	return tags.map((tag) => {
// 		let coordinates = {};
// 		if (tag.posts.length > 0) {
// 			tag.posts.forEach((item) => {
// 				coordinates = { lat: item.location.x, lng: item.location.y };
// 			});
// 		}
// 		return coordinates;
// 	});
// };

export const postsMarkers = (tags) => {
	console.log('this is tags');
	console.log(tags);
	const posts = [];
	tags.forEach((tag) => {
		if (tag.posts.length > 0) {
			tag.posts.forEach((post) => {
				post.tag = tag.tag;
				posts.push(post);
			})
		}
	})
	return posts
};

export const searchMarkers = (mapSearch) => {
	let coordinates = [];
	mapSearch.map((search) => {
		coordinates.push(search.position);
	});
	return coordinates;
};
