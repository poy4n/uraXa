import React, { useState, useEffect, useContext } from 'react';
import { Map } from '../map/Map';
import { Sidebar } from '../sidebar/Sidebar';
import SearchBar from '../search/SearchBar';
import Filter from '../filterTags/Filter';
import { postsMarkers, searchMarkers } from '../map/markerPosition';
import { handleErrors, parseErrors } from "../../services/errorHandlerService";
import { UserContext } from '../../UserContext';
import '../map/Map.css';

export default function Hub() {
	const [ tags, setTags ] = useState([]);
	const [ postMarkers, setPostMarkers ] = useState([]);
	const [ mapSearchCoord, setMapSearchCoord ] = useState([]);
	const [ postInMarker, setPostInMarker] = useState(null);
	const [ sidebarShow, setSidebarShow] = useState(false);

	const { citySearch } = useContext(UserContext);
	const { mapPlaces } = useContext(UserContext);
	const { cityCentre } = useContext(UserContext);
	const { userCentre } = useContext(UserContext);

	useEffect(() => {
		let url = `/api/post/tags/all`;

		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		};

		fetch(url, requestOptions)
			.then(handleErrors)
			.then((response) => {
				const json = response.json();
				return json;
			})
			.then((data) => {
				setTags(data.postsByTag);
			})
			.catch((err) => {
				parseErrors(err);
			});
	}, []);

	useEffect(
		() => {

			console.log('this is marks');
			// let tempost = postsMarkers(tags);
			// let marks = [];
			// tempost.forEach((post) => {
			// 	marks.push({lat: post.location.x, lng: post.location.y});
			// })
			let marks = postsMarkers(tags);
			console.log(marks);

			if (marks.length > 0) {
				setPostMarkers(marks);
			}
		},
		[ tags ]
	);

	useEffect(
		() => {
			let marks = searchMarkers(mapPlaces);
			if (marks.length > 0) {
				setMapSearchCoord(marks);	// marks is a tag object contains
			}
		},
		[ mapPlaces ]
	);

	return (
		<React.Fragment>
			<div className='hub'>
				<Sidebar 
					postInMarker={postInMarker} 
					setSidebarShow={setSidebarShow}
					sidebarShow={sidebarShow}
				/>
				<div className='container-map'>
					{/* <Filter /> */}
					<SearchBar />
					<Map 
						postMarkers={postMarkers} 
						mapSearchCoord={mapSearchCoord} 
						userCentre={userCentre} 
						cityCentre={cityCentre} 
						citySearch={citySearch} 
						setPostInMarker={setPostInMarker}
						setSidebarShow={setSidebarShow}
					/>
				</div>
			</div>
		</React.Fragment>
	);
}
