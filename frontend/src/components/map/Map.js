import * as React from 'react';
import { useState, useEffect} from 'react';
// import currentPosition from './currentPosition';
import { isEmpty } from 'lodash';

import './Map.css';
import { UserContext } from '../../UserContext';

export const Map = ({ postMarkers, mapSearchCoord, center }) => {
	const mapRef = React.useRef(null);
	if(isEmpty(center)){
		center = { lat: -37.8136, lng: 144.9631 };
	}
	console.log(center);

	// const [ currentCoordinates, setCurrentCoordinates ] = useState();
	// console.log(currentCoordinates);
	
	useEffect(
		() => {
			if (!mapRef.current) return;
			const H = window.H;
			const platform = new H.service.Platform({
				apikey: 'Plzpoyk5PfFE85BLe9FTbYJlSarM9Wb2lMjzki6QQwY'
			});

			const defaultLayers = platform.createDefaultLayers();
			const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
				center: center,
				zoom: 10,
				pixelRatio: window.devicePixelRatio || 1
			});

			new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
			const ui = H.ui.UI.createDefault(map, defaultLayers);

			// post marker
			postMarkers.forEach((post) => {
				const postIcon = 'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Pyramid.png';
				const postImage = post.image;
				const postTitle = post.title;
				const postLocation = { lat: post.location.x, lng: post.location.y };

				let icon = new H.map.Icon(postIcon);	
				let marker = new H.map.Marker(postLocation, { icon: icon });
				marker.setData(
					`
						<div class="pin_card">
							<img src="${postImage}" class="pin_image">
							<p class="pin_text">${postTitle}</p>
						</div>
					`
				)
				marker.addEventListener('tap', () => {
					//在这改
				})
				map.addObject(marker);	
			});

			// currentlocation marker
			let locationOfUser = center;
			let icon = new H.map.Icon('https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Home.png');
			let marker = new H.map.Marker(locationOfUser, { icon: icon });
			map.addObject(marker);

			// map search marker
			mapSearchCoord.forEach((coordinate) => {
				let LocationOfPostMarker = coordinate;
				let icon = new H.map.Icon(
					'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Yellow_ball.png'
				);
				let marker = new H.map.Marker(LocationOfPostMarker, { icon: icon });
				map.addObject(marker);
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

					setPin(pointerPosition)

				}
			});

			return () => {
				map.dispose();
			};
		},
		[ mapRef, postMarkers, mapSearchCoord, center ]
	);
	return <div className='map' ref={mapRef} />;
};
