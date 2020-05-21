import React, { useContext, useState, useEffect } from 'react';
import { autoSuggest } from './autoSuggest';
import { UserContext } from '../../UserContext';
import { handleErrors, parseErrors } from '../../services/errorHandlerService';

import './SearchBar.css';

export default function SearchBar() {
	const { mapPlaces, setMapPlaces } = useContext(UserContext);
	const { userCentre, setUserCentre } = useContext(UserContext);
	const { cityCentre, setCityCentre } = useContext(UserContext);

	const [ citySearch, setCitySearch ] = useState('');
	const [ searchPlaces, setSearchPlaces ] = useState('');
	const [ placesButtonDisabled, setPlacesButtonDisabled ] = useState(true);
	const [ cityButtonDisabled, setCityButtonDisabled ] = useState(true);

	const [ location, setLocation ] = useState('');
	const [ position, setPosition ] = useState('');
	const [ relativeLocations, setRelativeLocations ] = useState(null);

	useEffect(
		() => {
			autoSuggest(location, userCentre)
				.then(handleErrors)
				.then((res) => {
					console.log(res);
					let position = { lat: -37.8136, lng: 144.9631 };

					if (res !== undefined && res.length > 0) {
						position = `(${res[0].position.lat}, ${res[0].position.lng})`;
					}

					setPosition(position);
				})
				.catch((err) => {
					parseErrors(err);
				});
		},
		[ location ]
	);

	useEffect(
		() => {
			if (searchPlaces.trim()) {
				setPlacesButtonDisabled(false);
			} else {
				setPlacesButtonDisabled(true);
			}
		},
		[ searchPlaces ]
	);

	useEffect(
		() => {
			if (citySearch.trim()) {
				setCityButtonDisabled(false);
			} else {
				setCityButtonDisabled(true);
			}
		},
		[ citySearch ]
	);

	const handleSearch = (e) => {
		setSearchPlaces(e.target.value);
	};

	const handleCity = (e) => {
		setCitySearch(e.target.value);
		setLocation(e.target.value);
	};

	const handleSearchPlaces = (e) => {
		e.preventDefault();
		autoSuggest(searchPlaces, userCentre).then((res) => {
			console.log(res);
			setMapPlaces(res);
		});
	};

	const handleSearchCity = (e) => {
		e.preventDefault();
		autoSuggest(citySearch, cityCentre).then((res) => {
			setCityCentre(res[0].position);
			setUserCentre(res[0].position);
		});
	};

	return (
		<div className='search-container'>
			<form className='search-bar'>
				<div>
					<input
						className='search-input'
						placeholder='go to a place e.g. berlin, eiffel tower, ngv gallery'
						type='text'
						name='search'
						id='search'
						autoComplete='off'
						value={citySearch}
						onChange={handleCity}
					/>
					<button className='search-btn' disabled={cityButtonDisabled} onClick={handleSearchCity}>
						Go
					</button>
				</div>
				<div>
					<input
						className='search-input'
						placeholder='search for a place e.g. park, cafe, address'
						type='text'
						name='search'
						id='search'
						autoComplete='off'
						value={searchPlaces}
						onChange={handleSearch}
					/>
					<button className='search-btn' disabled={placesButtonDisabled} onClick={handleSearchPlaces}>
						Search
					</button>
				</div>
			</form>
		</div>
	);
}
