import React, { Component } from 'react';
import { autoSuggest } from '../search/autoSuggest';

// import './SearchBar.css'

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
		let result = autoSuggest(this.state.searchString).then((res) => {
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
			<React.Fragment>
				<form className='search-bar'>
					<input
						className='search-input'
						placeholder='Search...'
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
			</React.Fragment>
		);
	}
}

// if (json.length !== 0) {
//     document.getElementById('list').innerHTML = ``;
//     let dropData = json.items.map((item) => {
//     if ((item.position !== undefined) & (item.position !== ""))
//     document.getElementById("list").innerHTML += `<li onClick="addMarkerToMap(${item.position.lat},${item.position.lng})">${item.title}</li>`;
// });
// }
