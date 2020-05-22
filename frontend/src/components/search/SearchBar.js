import React, { useContext, useState, useEffect } from 'react';
import { autoSuggest } from './autoSuggest';
import { UserContext } from '../../UserContext';

import './SearchBar.css';

export default function SearchBar() {
	const { userCentre, setUserCentre } = useContext(UserContext);
	const { cityCentre, setCityCentre } = useContext(UserContext);

	const [ citySearch, setCitySearch ] = useState('');
	const [ cityButtonDisabled, setCityButtonDisabled ] = useState(true);

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

	const handleCity = (e) => {
		setCitySearch(e.target.value);
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
						placeholder='go to a place'
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
