import React, { useState, useEffect, useContext } from 'react';
import { Map } from '../map/Map';
import { Sidebar } from '../sidebar/Sidebar';
import SearchBar from '../search/SearchBar';
import Filter from '../filterTags/Filter';
import { postsMarkers, searchMarkers } from '../map/markerPosition';
import { UserContext } from '../../UserContext';

import '../map/Map.css';

export default function Hub() {
	const [ tags, setTags ] = useState([]);
	const [ postMarkers, setPostMarkers ] = useState([]);
	const [ mapSearchCoord, setMapSearchCoord ] = useState([]);

	const { mapSearch, setMapSearch } = useContext(UserContext);

	useEffect(() => {
		let url = `/api/post/tags/all`;

		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		};

		fetch(url, requestOptions)
			.then((response) => {
				const json = response.json();
				console.log(json);
				return json;
			})
			.then((data) => {
				console.log(data.postsByTag);
				setTags(data.postsByTag);
			})
			.catch((err) => {
				console.log(err.error);
			});
	}, []);

	useEffect(
		() => {
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
			let marks = searchMarkers(mapSearch);
			console.log(mapSearch);
			if (marks.length > 0) {
				setMapSearchCoord(marks);
			}
		},
		[ mapSearch ]
	);

	return (
		<React.Fragment>
			<div className='hub'>
				<Sidebar />
				<div className='container-map'>
					{/* <Filter /> */}
					<SearchBar />
					<Map postMarkers={postMarkers} mapSearchCoord={mapSearchCoord} />
				</div>
			</div>
		</React.Fragment>
	);
}
