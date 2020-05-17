import React from 'react';
import { useState, useEffect } from 'react';
import { Map } from '../map/Map';
import SearchBar from '../search/SearchBar';
import Filter from '../filterTags/Filter';
import { markerPosition } from '../map/markerPosition';

import '../map/Map.css';

export default function Hub() {
	const [ tags, setTags ] = useState([]);
	const [ markers, setMarkers ] = useState([]);

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
			let marks = markerPosition(tags);
			console.log(marks);
			if (marks.length > 0) {
				setMarkers(marks);
			}
		},
		[ tags ]
	);

	return (
		<React.Fragment>
			<div className='hub'>
				<div className='container-map'>
					{/* <Filter /> */}
					<SearchBar />
					<Map markers={markers} />
				</div>
			</div>
		</React.Fragment>
	);
}
