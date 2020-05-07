export default async function currentPosition() {
	await navigator.geolocation.getCurrentPosition((position) => {
		let coordinates = { lat: position.coords.latitude, lng: position.coords.longitude };
		console.log(coordinates);
		return coordinates;
	});
}
