import React, { useContext, useState, useEffect } from 'react';
import { autoSuggest } from './autoSuggest';
import { UserContext } from '../../UserContext';

import './SearchBar.css';

export default function SearchBar() {
	const { mapPlaces, setMapPlaces } = useContext(UserContext);
	const { userCentre, setUserCentre } = useContext(UserContext);
	const { cityCentre, setCityCentre } = useContext(UserContext);
	
	const [ citySearch, setCitySearch ] = useState('');
	const [ searchPlaces, setSearchPlaces ] = useState('');
	const [ placesButtonDisabled, setPlacesButtonDisabled ] = useState(true);
	const [ cityButtonDisabled, setCityButtonDisabled ] = useState(true);

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
	};

	const handleSearchPlaces = (e) => {
		e.preventDefault();
		autoSuggest(searchPlaces, userCentre).then((res) => {
			console.log(res)
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
			</form>
		</div>
	);
}
