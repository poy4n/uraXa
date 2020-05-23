import React, { useState, useEffect, useContext } from 'react';
import { Map } from '../map/Map';
import { Sidebar } from '../sidebar/Sidebar';
import SearchBar from '../search/SearchBar';
import { markPosts, markPlaces } from '../map/markerPosition';
import { handleErrors, parseErrors } from '../../services/errorHandlerService';
import { UserContext } from '../../UserContext';
import '../map/Map.css';

export default function Hub() {
	const [ tags, setTags ] = useState([]);
	const [ postMarkers, setPostMarkers ] = useState([]);
	const [ mapSearchCoord, setMapSearchCoord ] = useState([]);
	const [ postInMarker, setPostInMarker ] = useState(null); // When click post icon (triangular) in Map.js, will save post object to postInMarker, then show postInMarker in Sidebar.js
	const [ markIsClicked, setMarkIsClicked ] = useState(false); // This status is both used in Map.js and Sidebar.js

	const { locationClickCoord, setLocationClickCoord } = useContext(UserContext);
	const { citySearch } = useContext(UserContext);
	const { mapPlaces } = useContext(UserContext);
	const { cityCentre } = useContext(UserContext);
	const { userCentre } = useContext(UserContext);
	const { postLoading } = useContext(UserContext);
	const { posts } = useContext(UserContext);
	const { domain } = useContext(UserContext);

	useEffect(
		() => {
			let url = `${domain}/api/post/tags/all`;

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
		},
		[ posts ]
	);

	// return a list of posts objects
	useEffect(
		() => {
			let tempost = markPosts(tags);
			let posts = [];
			tempost.forEach((post) => {
				let coordinates = { lat: post.location.x, lng: post.location.y };
				posts.push({
					date: post.date,
					text: post.text,
					image: post.image,
					title: post.title,
					coordinates: coordinates,
					username: post.username
				});
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
			<div className='loading-error'>
				{postLoading && <h3>. | . | . | a new story is loading | . | . | .</h3>}
			</div>
			<div className='hub'>
				<Sidebar
					postInMarker={postInMarker}
					setPostInMarker={setPostInMarker}
					setMarkIsClicked={setMarkIsClicked}
					markIsClicked={markIsClicked}
					locationClickCoord={locationClickCoord}
					setLocationClickCoord={setLocationClickCoord}
				/>
				<div className='container-map'>
					<SearchBar />
					<Map
						postMarkers={postMarkers} // pass a list of posts objects to map
						mapSearchCoord={mapSearchCoord}
						userCentre={userCentre}
						cityCentre={cityCentre}
						citySearch={citySearch}
						setPostInMarker={setPostInMarker}
						setMarkIsClicked={setMarkIsClicked}
						setLocationClickCoord={setLocationClickCoord}
					/>
				</div>
			</div>
		</React.Fragment>
	);
}
