export const autoSuggest = (searchString) => {
	const center = { lat: -37.8136, lng: 144.9631 };
	const apikey = 'Plzpoyk5PfFE85BLe9FTbYJlSarM9Wb2lMjzki6QQwY';
	let results = [];

	if (searchString !== '') {
		fetch(
			`https://discover.search.hereapi.com/v1/discover?apiKey=${apikey}&at=${center.lat},${center.lng}&limit=5&q=${searchString}`
		)
			.then((res) => res.json())
			.then((json) => {
				console.log(json.items);
				if (json.length !== 0) {
					results = json.items;
					console.log(results);
				}
			});
	}
};
