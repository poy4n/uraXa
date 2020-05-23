import React, { useContext, useEffect, useState } from 'react';
import Add from '../add/Add';
import { UserContext } from '../../UserContext';
import { isEmpty } from 'lodash';

import './Sidebar.css';

export const Sidebar = ({
	markIsClicked,
	locationIsClicked,
	setMarkIsClicked,
	setLocationIsClicked,
	postInMarker,
	setPostInMarker
}) => {
	const { username } = useContext(UserContext);
	const [ sidebarCurrentIsShown, setSidebarCurrentIsShown ] = useState(false);

	const reverse = () => {
		const sidebar = document.querySelector('div.sidebar');
		const arrowIcon = document.querySelector('span.arrow');
		const message = document.querySelector('.sidebar-display-none');

		sidebar.classList.toggle('sidebar--expand');
		arrowIcon.classList.toggle('reverse');

		if (message !== null) message.classList.toggle('sidebar-display');
	};

	useEffect(() => {
		if (markIsClicked && sidebarCurrentIsShown === false) {
			// Sidebar slides in when it is hidden and marker is clicked
			reverse();
			setSidebarCurrentIsShown(true);
		}
		if (locationIsClicked && sidebarCurrentIsShown === false) {
			// Sidebar slides in when it is hidden and red marker is clicked
			reverse();
			setSidebarCurrentIsShown(true);
		}
	});

	// Click arrow icon to call this function,
	const handleClick = (e) => {
		reverse();
		if (markIsClicked) setMarkIsClicked(false);
		setSidebarCurrentIsShown(!sidebarCurrentIsShown);
		setPostInMarker(null);

		if (locationIsClicked) setLocationIsClicked(false);
		setSidebarCurrentIsShown(!sidebarCurrentIsShown);
	};

	return (
		<div className='sidebar'>
			<span className='arrow' onClick={handleClick}>
				>
			</span>
			{locationIsClicked ? <Add /> : null}
			{!isEmpty(postInMarker) ? (
				<div className='sidebar-post'>
					<div className='sidebar-post-container'>
						<div>
							<img src={postInMarker.image} className='sidebar-post-image' />
						</div>
						<h1 className='title-post'>{postInMarker.title}</h1>
						<h3 className='text-post'>{postInMarker.text}</h3>
					</div>
					<div className='sidebar-data-container'>
						<h4 className='username-pos'>By: {username}</h4>
						<h4 className='date-post'>{postInMarker.date.slice(0, 10)}</h4>
					</div>
				</div>
			) : null}
			{!locationIsClicked && isEmpty(postInMarker) ? (
				<div className='sidebar-display-none'>
					<img src='https://cdn2.iconfinder.com/data/icons/gur-project-1/32/1_10.png' />
					<p>explore the map to see and add stories</p>
				</div>
			) : null}
		</div>
	);
};
