export const autoSuggest = async (searchString, center) => {
	const apikey = 'Plzpoyk5PfFE85BLe9FTbYJlSarM9Wb2lMjzki6QQwY';

	if (!searchString) {
		return;
	}
	let response = await fetch(
		`https://discover.search.hereapi.com/v1/discover?apiKey=${apikey}&at=${center.lat},${center.lng}&limit=10&q=${searchString}`
	);
	let data = await response.json();
	return await data.items;
};
