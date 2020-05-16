import React from 'react';
import { Map } from '../map/Map';
import SearchBar from '../search/SearchBar';

import '../map/Map.css';

export default function Hub() {
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
