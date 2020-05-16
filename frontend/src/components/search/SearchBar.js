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
		autoSuggest(this.state.searchString).then((res) => {
			console.log(res);
			this.setState({
				currentSearch: res
			});
		});
	};

	render() {
		const { searchString } = this.state;

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
						onChange={this.handleChange}
					/>
					<button className='search-btn' onClick={this.handleClick}>
						Search
					</button>
				</form>
			</div>
		);
	}
}
