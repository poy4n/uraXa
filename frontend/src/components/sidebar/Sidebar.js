
import React, { useContext } from 'react';

import { UserContext } from '../../UserContext';

import './Sidebar.css';

const reverse = (event) => {
	const sidebar = document.querySelector('div.sidebar');
	const posts = document.querySelector('.sidebar-display-none');

	sidebar.classList.toggle('sidebar--expand');
	event.target.classList.toggle('reverse');

	if (posts !== null) {
		posts.classList.toggle('sidebar-display-posts');
	}
};

export const displayAddForm = () => {
	console.log('click')
}

export const Sidebar = () => {
	const { data } = useContext(UserContext);
	const { username } = useContext(UserContext);

	return (
		<div className='sidebar'>
			<span className='arrow' onClick={reverse}>
				>
			</span>
			{data &&
				data.map((post, index) => {
					return (
						<div key={index} className='sidebar-display-none'>
							<div className='img-container'>
								<img src={post.image} className='img-post' />
								<h2 className='title-post'>{post.title}</h2>
								<p className='user-post'>By: {username}</p>
								<p className='date-post'>{post.date.slice(0, 10)}</p>
							</div>
							<div className='data-container'>
								<h4>{post.text}</h4>
							</div>
						</div>
					);
				})}
		</div>
	);
};
