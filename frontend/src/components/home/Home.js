import React, { useContext } from 'react';
import history from '../../history';
import { UserContext } from '../../UserContext';

import './Home.css';

export default function Home() {
	const { login, setLogin } = useContext(UserContext);

	return (
		<div className='home'>
			<div className='description'>
				<h1>uraXa</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
					veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
					irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
				<div className='container-btn'>
					<button className='explore-btn' onClick={() => history.push('/map')}>
						Explore
					</button>
					{!login ? (
						<button className='join-btn' onClick={() => history.push('/signup')}>
							Join
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
}
