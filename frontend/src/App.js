import React from 'react';
import { Map } from './components/map/Map';
import SearchBar from './components/search/SearchBar';

import './App.css';

export default function App() {
	return (
		<div className='App'>
			<SearchBar />
			<Map />
		</div>
	);
}
