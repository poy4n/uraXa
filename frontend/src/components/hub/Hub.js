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
			let marks = postsMarkers(tags);
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
				setMapSearchCoord(marks);
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
					<Map postMarkers={postMarkers} mapSearchCoord={mapSearchCoord} userCentre={userCentre} cityCentre={cityCentre} citySearch={citySearch} />
				</div>
			</div>
		</React.Fragment>
	);
}
