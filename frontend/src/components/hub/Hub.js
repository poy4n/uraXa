import React from 'react';
import { Map } from '../map/Map';
import SearchBar from '../search/SearchBar';
import { useState, useEffect } from 'react';

import './Hub.css';

export default function Hub() {
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(true);
	const [ data, setData ] = useState('');

	useEffect(() => {
		fetch('')
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				setData(data);
			})
			.catch((e) => {
				setLoading(false);
				setError(true);
			});
	}, []);

	return (
		<React.Fragment>
			<div className='hub'>
				<div className='container-map'>
					<SearchBar />
					<Map />
				</div>
			</div>
		</React.Fragment>
	);
}
