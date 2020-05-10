import * as React from 'react';
import { useState } from 'react';
import currentPosition from './currentPosition';

import './Map.css';

export const Map = () => {
	const mapRef = React.useRef(null);

	const [ coordinates, setCoordinates ] = useState({ lat: -37.8136, lng: 144.9631 });
	console.log(coordinates);

	React.useLayoutEffect(
		() => {
			if (!mapRef.current) return;
			const H = window.H;
			const platform = new H.service.Platform({
				apikey: 'Plzpoyk5PfFE85BLe9FTbYJlSarM9Wb2lMjzki6QQwY'
			});

			currentPosition((currentCoordinates) => {
				setCoordinates(currentCoordinates);
				console.log(currentCoordinates, coordinates);
			});
			
			const defaultLayers = platform.createDefaultLayers();
			const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
				center: coordinates,
				zoom: 10,
				pixelRatio: window.devicePixelRatio || 1
			});

			new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
			const ui = H.ui.UI.createDefault(map, defaultLayers);

			// marker
			let LocationOfMarker = coordinates;
			let icon = new H.map.Icon('https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Pyramid.png');
			let marker = new H.map.Marker(LocationOfMarker, { icon: icon });
			map.addObject(marker);

			// style
			const provider = map.getBaseLayer().getProvider();
			const style = new H.map.Style(
				'https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml',
				'https://js.api.here.com/v3/3.1/styles/omv/'
			);
			provider.setStyle(style);

			// tap location
			map.addEventListener('tap', function(evt) {
				// bubble
				if (evt.target instanceof H.map.Marker) {
					var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
						content: evt.target.getData()
					});
					ui.addBubble(bubble);
				} else {
					console.log(evt);
					let pointer = evt.currentPointer;
					let pointerPosition = map.screenToGeo(pointer.viewportX, pointer.viewportY);
					let icon = new H.map.Icon(
						'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Red_ball.png'
					);
					let marker = new H.map.Marker(pointerPosition, { icon: icon });
					marker.setData('helloooo');
					map.addObject(marker);
				}
			});

			return () => {
				map.dispose();
			};
		},
		[ mapRef, coordinates ]
	);
	return <div className='map' ref={mapRef}/>;
};
