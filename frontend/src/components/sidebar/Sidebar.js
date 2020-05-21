
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../UserContext';

import './Sidebar.css';


const reverse = () => {
	const sidebar = document.querySelector('div.sidebar');
	// const posts = document.querySelector('.sidebar-display-none');
	const arrowIcon = document.querySelector('span.arrow');

	sidebar.classList.toggle('sidebar--expand');
	arrowIcon.classList.toggle('reverse');
	// posts.classList.toggle('sidebar-display');
};

export const Sidebar = (props) => {
	const { data } = useContext(UserContext);
	const { username } = useContext(UserContext);

	const [ sidebarCurrentIsShown, setSidebarCurrentIsShown ] = useState(false);

	useEffect(() => {
		if (props.markIsClicked && sidebarCurrentIsShown === false) {		// Sidebar slides in when it is hidden and marker is clicked
			reverse();
			setSidebarCurrentIsShown(true);
		}
	})

	// Click arrow icon to call this function, 
	const handleClick = (e) => {
		reverse();
		if (props.markIsClicked) props.setMarkIsClicked(false);
		setSidebarCurrentIsShown(!sidebarCurrentIsShown);
	}

	return (
		<div className='sidebar'>
			<span className='arrow' onClick={handleClick}>
				>
			</span>
			{/* {data &&
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
				})} */}
				{props.postInMarker ?
					<div className='sidebar-post'>
						<div className='sidebar-data-container'>
							<img src={props.postInMarker.image} className='sidebar-post-image' />
							<h2 className='title-post'>{props.postInMarker.title}</h2>
							

							<h4>{props.postInMarker.text}</h4>
						</div>

						<div className="sidebar-footer">
							<p className='date-post'>{props.postInMarker.date.slice(0, 10)}</p>
							<p className='date-post'>By: {username}</p>
						</div>
					</div>
					: <p>Please choose an icon to check post</p>
				}
				
		</div>
	);
};
