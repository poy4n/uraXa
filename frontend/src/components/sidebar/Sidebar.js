
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../UserContext';

import './Sidebar.css';

let sidebarCurrentIsShown = false;		// Sidebar is initially hidden

const reverse = () => {
	const sidebar = document.querySelector('div.sidebar');
	const posts = document.querySelector('.sidebar-display-none');
	const arrowIcon = document.querySelector('span.arrow');

	sidebar.classList.toggle('sidebar--expand');
	arrowIcon.classList.toggle('reverse');

	if (posts !== null) {
		posts.classList.toggle('sidebar-display-posts');
	}

};

export const Sidebar = (props) => {
	const { data } = useContext(UserContext);
	const { username } = useContext(UserContext);

	const [ sidebarCurrentIsShown, setSidebarCurrentIsShown ] = useState(false);

	useEffect(() => {
		// sidebarShow should have a proper name, maybe markClicked 
		if (props.sidebarShow && !sidebarCurrentIsShown) {		// Sidebar slides in when it is hidden
			reverse();
			setSidebarCurrentIsShown(true);
		}
	})

	const handleClick = (e) => {
		if (sidebarCurrentIsShown) {
			reverse();
			props.setSidebarShow(false);
			setSidebarCurrentIsShown(false);
		} else {
			reverse();
			props.setSidebarShow(true);
			setSidebarCurrentIsShown(true);
		}
	}

	return (
		<div className='sidebar'>
			<span className='arrow' onClick={handleClick}>
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
