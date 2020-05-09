export default function currentPosition(fn) {
	navigator.geolocation.getCurrentPosition((position) => {
		let coordinates = { lat: position.coords.latitude, lng: position.coords.longitude };
		fn(coordinates);
		console.log(coordinates);
		return coordinates;
	});
}
