import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import Add from '../add/Add';
import { isEmpty } from 'lodash';

import './Sidebar.css';

export const Sidebar = ({ markIsClicked, setMarkIsClicked, postInMarker, setPostInMarker }) => {
	const [ sidebarCurrentIsShown, setSidebarCurrentIsShown ] = useState(false);
	const { login } = useContext(UserContext);
	const { publish, setPublish } = useContext(UserContext);
	const { locationIsClicked, setLocationIsClicked } = useContext(UserContext);

	const reverse = () => {
		const sidebar = document.querySelector('div.sidebar');
		const arrowIcon = document.querySelector('span.arrow');
		const message = document.querySelector('.sidebar-display-none');

		sidebar.classList.toggle('sidebar--expand');
		arrowIcon.classList.toggle('reverse');

		if (message !== null) message.classList.toggle('sidebar-display');
	};

	useEffect(
		() => {
			// Sidebar slides in when it is hidden and post marker is clicked
			if (!publish && markIsClicked && !sidebarCurrentIsShown && !locationIsClicked) {
				reverse();
				setSidebarCurrentIsShown(true);
			}

			// Sidebar slides in when it is hidden and red marker is clicked
			if (!publish && locationIsClicked && login && !sidebarCurrentIsShown) {
				reverse();
				setSidebarCurrentIsShown(true);
			} else if (locationIsClicked && sidebarCurrentIsShown && !login) {
				setSidebarCurrentIsShown(false);
				reverse();
			} else if (publish && sidebarCurrentIsShown && login) {
				setSidebarCurrentIsShown(false);
				setPublish(false);
				reverse();
			}
		},
		[ publish, markIsClicked, locationIsClicked, login ]
	);

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
				>>>
			</span>
			{locationIsClicked && login ? <Add /> : null}
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
						<h4 className='username-pos'>By: {postInMarker.username}</h4>
						<h4 className='date-post'>{postInMarker.date.slice(0, 10)}</h4>
					</div>
				</div>
			) : null}
			{!locationIsClicked && isEmpty(postInMarker) ? (
				<div className='sidebar-display-none'>
					<img src='https://cdn2.iconfinder.com/data/icons/gur-project-1/32/1_26.png' />
					<p>search the map to go to new places</p>
					<img src='https://cdn2.iconfinder.com/data/icons/gur-project-1/32/1_10.png' />
					<p>click on the icon to explore stories</p>
					<img src='https://cdn1.iconfinder.com/data/icons/Momentum_GlossyEntireSet/32/pin-red.png' />
					<p>click on the map to add stories</p>
				</div>
			) : null}
		</div>
	);
};
