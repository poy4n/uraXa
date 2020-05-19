import React, { useContext, useState, useEffect } from 'react';
import { autoSuggest } from './autoSuggest';
import { UserContext } from '../../UserContext';

import './SearchBar.css';

export default function SearchBar() {
	const [ searchString, setSearchString ] = useState('');
	const { mapSearch, setMapSearch } = useContext(UserContext);

	const handleChange = (e) => {
		setSearchString(e.target.value);
	};

	const handleClick = (e) => {
		e.preventDefault();
		autoSuggest(searchString).then((res) => {
			console.log(res);
			setMapSearch(res);
		});
	};

	return (
		<div className='search-container'>
			<form className='search-bar'>
				<input
					className='search-input'
					placeholder='Wehere to?'
					type='text'
					name='search'
					id='search'
					autoComplete='off'
					value={searchString}
					onChange={handleChange}
				/>
				<button className='search-btn' onClick={handleClick}>
					Search
				</button>
			</form>
		</div>
	);
}
