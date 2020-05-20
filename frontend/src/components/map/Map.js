import * as React from 'react';
import { useState, useEffect, useContext} from 'react';
// import currentPosition from './currentPosition';
import { isEmpty, isEqual } from 'lodash';
import './Map.css';
import { UserContext } from '../../UserContext';
import { displayAddForm } from '../sidebar/Sidebar';

export const Map = ({ postMarkers, mapSearchCoord, cityCentre, userCentre, citySearch }) => {
	const mapRef = React.useRef(null);
	const { login } = useContext(UserContext);
	const { posts } = useContext(UserContext);
	const { mapPlaces } = useContext(UserContext);

	/*

	if not logged in
	centre of the map is hard coded melb
	user can search around melb
	user can change city centre and the map jumps to the new city

	if logged in
	centre of the map is user's input location
	user can search around its location
	user can change city centre and the map jumps to the new city

	*/

	useEffect(
		() => {
			if (!mapRef.current) return;
			const H = window.H;
			const platform = new H.service.Platform({
				apikey: 'Plzpoyk5PfFE85BLe9FTbYJlSarM9Wb2lMjzki6QQwY'
			});

			let map;
			let defaultLayers;
			const mapFocus = (centre) => {
				defaultLayers = platform.createDefaultLayers();
				map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
					center: centre,
					zoom: 12,
					pixelRatio: window.devicePixelRatio || 1
				});
			}

			if(login) {
				mapFocus(userCentre);
			} else {
				mapFocus(cityCentre);
			}

			if(citySearch.length > 0)
			mapFocus(citySearch[0]);

			new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
			const ui = H.ui.UI.createDefault(map, defaultLayers);

			const diplayDataOnMap = (content) => {
				let html = ''
				if(mapPlaces.length > 0 && content !== 'pin') {
					html = `
					<div class="pin_card">
						<p class="pin_text">${content}</p>
					</div>
					`
				} else if ( content === 'pin') {
					html = `
					<div class="pin_card">
						<button class='btn' onhover='${displayAddForm}'>
							Add a story
						</button>
					</div>
					`
				}
				return html
			}

			// post marker
			postMarkers.forEach((coordinate) => {
				if (!isEmpty(coordinate)) {
					let LocationOfPostMarker = coordinate;
					let icon = new H.map.Icon(
						'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Pyramid.png'
					);
					let marker = new H.map.Marker(LocationOfPostMarker, { icon: icon });
					map.addObject(marker);
				}
			});

			// centre marker
			const centreMarker = (centre, url) => {
				let locationOfUser = centre;
				let icon = new H.map.Icon(url);
				let marker = new H.map.Marker(locationOfUser, { icon: icon });
				map.addObject(marker);
			}

			let homeIcon = 'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Home.png';
			let locationIcon = 'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Cube.png'
			if(login) {
				centreMarker(userCentre, isEqual(userCentre, cityCentre) ? locationIcon : homeIcon);
			} else {
				centreMarker(cityCentre, locationIcon);
			}


			// map search marker
			mapSearchCoord.forEach((result) => {
				let icon = new H.map.Icon(
					'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Yellow_ball.png'
				);
				let marker = new H.map.Marker(result.coordinates, { icon: icon });
				marker.setData(diplayDataOnMap(result.title));
				map.addObject(marker);
			});

			// style
			// const provider = map.getBaseLayer().getProvider();
			// const style = new H.map.Style('styles/style.yaml', 'https://js.api.here.com/v3/3.1/styles/omv/');
			// // provider.setStyle(style);

			const setPin = (location) => {
				let icon = new H.map.Icon(
					'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Red_ball.png'
				);
				let marker = new H.map.Marker(location, { icon: icon });
				
				marker.setData(diplayDataOnMap('pin'));
				map.addObject(marker); 
			}

			// tap location
			map.addEventListener('tap', function(evt) {
				// bubble
				ui.removeBubble(ui.getBubbles()[0]);	// Remove current bubble
				
				if (evt.target instanceof H.map.Marker) {
					let bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
						content: evt.target.getData()
					});
					ui.addBubble(bubble);
				} else {
					let pointer = evt.currentPointer;
					let pointerPosition = map.screenToGeo(pointer.viewportX, pointer.viewportY);
					setPin(pointerPosition)
				}
			});
			return () => {
				map.dispose();
			};
		},
		[ mapRef, postMarkers, mapSearchCoord, cityCentre, userCentre, posts ]
	);
	return <div className='map' ref={mapRef} />;
};
