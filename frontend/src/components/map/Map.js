import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { isEmpty, isEqual } from 'lodash';
import './Map.css';
import { UserContext } from '../../UserContext';

export const Map = ({
	postMarkers,
	mapSearchCoord,
	cityCentre,
	userCentre,
	citySearch,
	setPostInMarker,
	setMarkIsClicked,
	setLocationClickCoord
}) => {
	const mapRef = React.useRef(null);
	const { login } = useContext(UserContext);
	const { posts } = useContext(UserContext);
	const { mapPlaces } = useContext(UserContext);
	const { username } = useContext(UserContext);
	const { postLoading } = useContext(UserContext);
	const { setLocationIsClicked } = useContext(UserContext); // This status is both used in Map.js and Sidebar.js

	useEffect(
		() => {
			if (!mapRef.current) return;
			const H = window.H;
			const platform = new H.service.Platform({
				apikey: 'Plzpoyk5PfFE85BLe9FTbYJlSarM9Wb2lMjzki6QQwY'
			});

			// initial position of the map
			let map;
			let defaultLayers;
			const mapFocus = (centre) => {
				defaultLayers = platform.createDefaultLayers();
				map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
					center: centre,
					zoom: 12,
					pixelRatio: window.devicePixelRatio || 1
				});
			};

			if (login) {
				mapFocus(userCentre);
			} else {
				mapFocus(cityCentre);
			}
			if (citySearch.length > 0) mapFocus(citySearch[0]);

			// ui control and position
			const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
			behavior.disable(H.mapevents.Behavior.DBLTAPZOOM);
			const ui = H.ui.UI.createDefault(map, defaultLayers);

			// bubble content generator
			const diplayDataOnMap = (content) => {
				let html = '';

				if (mapPlaces.length > 0 && content !== 'pin' && typeof content !== 'object') {
					html = `
					<div class="pin-card">
						<p class="pin_text">${content}</p>
					</div>
					`;
				} else if (content === 'pin') {
					html = `
					<div class="pin-card">
						<p>
							${login ? 'Add a Story' : 'Please LogIn to add a story'}
						</p>
					</div>
					`;
				} else if (typeof content === 'object') {
					html = `
					<div class="pin-card">
						<div class="container-pin-img">
							<img class="pin-img" src=${content.image}></img>
						</div>
						<p class="pin-text">${content.title}</p>
					</div>
					`;
				}
				return html;
			};

			// post marker
			postMarkers.forEach((result) => {
				if (!isEmpty(result)) {
					let icon = new H.map.Icon('https://cdn2.iconfinder.com/data/icons/gur-project-1/32/1_10.png');
					let marker = new H.map.Marker(result.coordinates, { icon: icon });
					let content = { image: result.image, title: result.title };
					marker.setData(diplayDataOnMap(content));
					map.addObject(marker);

					// Add onclick event listener to triangular icon
					marker.addEventListener('tap', () => {
						setPostInMarker(result);
						setMarkIsClicked(true); // inherit from Hub.js, check if icon is clicked
						setLocationIsClicked(false);
					});
				}
			});

			// centre marker
			const centreMarker = (centre, url, content) => {
				let locationOfUser = centre;
				let icon = new H.map.Icon(url);
				let marker = new H.map.Marker(locationOfUser, { icon: icon });
				marker.setData(content);
				map.addObject(marker);
			};

			let homeIcon = 'https://cdn2.iconfinder.com/data/icons/gur-project-1/32/1_26.png';
			let locationIcon = 'https://cdn2.iconfinder.com/data/icons/gur-project-1/32/1_26.png';
			let contentDesc = `Welcome ${username}`;
			if (login) {
				centreMarker(userCentre, isEqual(userCentre, cityCentre) ? locationIcon : homeIcon, contentDesc);
			} else {
				centreMarker(cityCentre, locationIcon, contentDesc);
			}

			// map search marker
			mapSearchCoord.forEach((result) => {
				let icon = new H.map.Icon('https://cdn2.iconfinder.com/data/icons/gur-project-1/32/1_10.png');
				let marker = new H.map.Marker(result.coordinates, { icon: icon });
				marker.setData(diplayDataOnMap(result.title));
				map.addObject(marker);
			});

			// // style
			const provider = map.getBaseLayer().getProvider();
			const style = new H.map.Style(
				'https://js.api.here.com/v3/3.1/styles/omv/normal.day.yaml',
				'https://js.api.here.com/v3/3.1/styles/omv/'
			);
			provider.setStyle(style);

			// user click - add post
			const setPin = (location) => {
				let icon = new H.map.Icon(
					'https://cdn1.iconfinder.com/data/icons/Momentum_GlossyEntireSet/32/pin-red.png'
				);
				let marker = new H.map.Marker(location, { icon: icon });

				marker.setData(diplayDataOnMap('pin'));
				map.addObject(marker);

				marker.addEventListener('tap', () => {
					setLocationClickCoord(location);
					setLocationIsClicked(true);
					setPostInMarker(null);
				});
			};

			// tap location
			map.addEventListener('dbltap', function(evt) {
				let pointer = evt.currentPointer;
				let pointerPosition = map.screenToGeo(pointer.viewportX, pointer.viewportY);
				setPin(pointerPosition);
			});

			// make bubble on a click
			map.addEventListener('tap', function(evt) {
				// bubble
				ui.removeBubble(ui.getBubbles()[0]); // Remove current bubble

				if (evt.target instanceof H.map.Marker) {
					let bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
						content: evt.target.getData()
					});
					ui.addBubble(bubble);
				}
			});
			return () => {
				map.dispose();
			};
		},
		[ mapRef, postMarkers, mapSearchCoord, cityCentre, userCentre, posts, login, postLoading ]
	);
	return <div className='map' ref={mapRef} />;
};
