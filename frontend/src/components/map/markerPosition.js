export const markPosts = (tags) => {
	const posts = [];
	tags.forEach((tag) => {
		if (tag.posts.length > 0) {
			tag.posts.forEach((post) => {
				post.tag = tag.tag;
				posts.push(post);
			});
		}
	});
	return posts;
};

export const markPlaces = (mapSearch) => {
	let searchPlaces = [];
	mapSearch.map((search) => {
		searchPlaces.push({ coordinates: search.position, title: search.address.label });
	});
	return searchPlaces;
};
