export const markerPosition = (tags) => {
	return tags.map((tag) => {
		let coordinates = {};
		if (tag.posts.length > 0) {
			tag.posts.forEach((item) => {
				coordinates = { lat: item.location.x, lng: item.location.y };
			});
		}
		return coordinates;
	});
};
