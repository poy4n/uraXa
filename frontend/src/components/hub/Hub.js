import React, { useState, useEffect, useContext } from 'react';
import { Map } from '../map/Map';
import { Sidebar } from '../sidebar/Sidebar';
import SearchBar from '../search/SearchBar';
import Filter from '../filterTags/Filter';
import { markPosts, markPlaces } from '../map/markerPosition';
import { handleErrors, parseErrors } from '../../services/errorHandlerService';
import { UserContext } from '../../UserContext';
import '../map/Map.css';

export default function Hub() {
	const [ tags, setTags ] = useState([]);
	const [ postMarkers, setPostMarkers ] = useState([]);
	const [ mapSearchCoord, setMapSearchCoord ] = useState([]);

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
			let tempost = markPosts(tags);
			let posts = [];
			tempost.forEach((post) => {
				let coordinates = { lat: post.location.x, lng: post.location.y };
				posts.push({ image: post.image, title: post.title, coordinates: coordinates });
			});
			if (posts.length > 0) {
				setPostMarkers(posts);
			}
		},
		[ tags ]
	);

	useEffect(
		() => {
			let marks = markPlaces(mapPlaces);
			if (marks.length > 0) {
				setMapSearchCoord(marks); // marks is a tag object contains
			}
		},
		[ mapPlaces ]
	);

	return (
		<React.Fragment>
			<div className='hub'>
				<Sidebar />
				<div className='container-map'>
					{/* <Filter /> */}
					<SearchBar />
					<Map
						postMarkers={postMarkers}
						mapSearchCoord={mapSearchCoord}
						userCentre={userCentre}
						cityCentre={cityCentre}
						citySearch={citySearch}
					/>
				</div>
			</div>
		</React.Fragment>
	);
}
