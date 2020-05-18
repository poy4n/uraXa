import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

import { useEffect } from 'react';
import currentPosition from './currentPosition';
import { isEmpty } from 'lodash';

import './Map.css';

export const Map = ({ markers }) => {
	const mapRef = React.useRef(null);

	const { coordinates, setCoordinates } = useContext(UserContext);
	console.log(coordinates);

	

	useEffect(
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

			// TODO marker
			markers.forEach((coordinate) => {
				if (!isEmpty(coordinate)) {
					let LocationOfMarker = coordinate;
					let icon = new H.map.Icon(
						'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Pyramid.png'
					);
					let marker = new H.map.Marker(LocationOfMarker, { icon: icon });
					map.addObject(marker);
				}
			});

			// style
			const provider = map.getBaseLayer().getProvider();
			const style = new H.map.Style(
				'https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml',
				'https://js.api.here.com/v3/3.1/styles/omv/'
			);
			// provider.setStyle(style);

			const setPin = (location, img, txt) => {
				let icon = new H.map.Icon(
					'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Red_ball.png'
				);
				let marker = new H.map.Marker(location, { icon: icon });
				const pinContent = (img, txt) => {
					return(
						`
							<div class="pin_card">
								<img src="${img}" class="pin_image">
								<p class="pin_text">${txt}</p>
							</div>
						`
					);
				}
				marker.setData(pinContent('https://images.unsplash.com/photo-1524293581917-878a6d017c71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', 'anythin asddfsafd fasdfasdf asdfs ad'));
				map.addObject(marker); 
			}

			// tap location
			map.addEventListener('tap', function(evt) {
				// bubble
				ui.removeBubble(ui.getBubbles()[0]);	// Remove current bubble
				
				if (evt.target instanceof H.map.Marker) {
					// currentBubble.close();
					var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
						content: evt.target.getData()
					});
					ui.addBubble(bubble);
				} else {
					console.log(evt);
					let pointer = evt.currentPointer;
					let pointerPosition = map.screenToGeo(pointer.viewportX, pointer.viewportY);
					// let icon = new H.map.Icon(
					// 	'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Red_ball.png'
					// );
					// let marker = new H.map.Marker(pointerPosition, { icon: icon });
					// marker.setData('helloooo');
					// map.addObject(marker);
					setPin(pointerPosition)
				}
			});

			return () => {
				map.dispose();
			};
		},
		[ mapRef, markers ]
	);
	return <div className='map' ref={mapRef} />;
};
