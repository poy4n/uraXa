import React, { Component } from 'react';
import { autoSuggest } from './autoSuggest';

import './SearchBar.css';

export default class SearchBar extends Component {
	state = {
		searchString: '',
		currentSearch: []
	};

	handleChange = (e) => {
		this.setState({
			searchString: e.target.value
		});
	};

	handleClick = (e) => {
		e.preventDefault();
		console.log(this.state.searchString);
		autoSuggest(this.state.searchString).then((res) => {
			console.log(res);
			this.setState({
				currentSearch: res
			});
		});
	};

	render() {
		const { searchString, currentSearch } = this.state;
		console.log(searchString, currentSearch);

		return (
			<div className='search-container'>
				<form className='search-bar'>
					<input
						className='search-input'
						placeholder='Search for places...'
						type='text'
						name='search'
						id='search'
						value={searchString}
						onChange={this.handleChange}
					/>
					<input
						className='search-input'
						placeholder='Search for places...'
						type='text'
						name='search'
						id='search'
						value={searchString}
						onChange={this.handleChange}
					/>
					<input
						className='search-input'
						placeholder='Search for places...'
						type='text'
						name='search'
						id='search'
						value={searchString}
						onChange={this.handleChange}
					/>
					<button className='search-btn' onClick={this.handleClick}>
						Search
					</button>
					<div>{}</div>
				</form>
			</div>
		);
	}
}
