import React, { useContext } from 'react';
import history from '../../history';
import { UserContext } from '../../UserContext';

import './Home.css';

export default function Home() {
	const { login } = useContext(UserContext);

	return (
		<div className='description'>
			<div className='container-explore'>
				<h1 className='desc-title'>Wander. Explore. Share.</h1>
				<div className='desc-explore'>
					<div className='container-img'>
						<img src='https://cdn2.iconfinder.com/data/icons/bagbox/png/globe-terrestre.png' />
					</div>
					<p>Wander the map and discover nearby stories.</p>
				</div>
				<div className='desc-explore'>
					<div className='container-img'>
						<img src='https://cdn4.iconfinder.com/data/icons/Travel_Icon_Pack/PNG/travel%20management.png' />
					</div>
					<p>Explore cities you can’t wait to travel to.</p>
				</div>
				<div className='desc-explore'>
					<div className='container-img'>
						<img src='https://cdn4.iconfinder.com/data/icons/refresh_cl/256/Misc/Holiday.png' />
					</div>
					<p>Share your stories and return to them any time.</p>
				</div>
			</div>

			<div className='container-desc'>
				<h1 className='desc-title'>uraXa map is a free community resource</h1>
				<div>
					<p>
						<span className='desc-title'>uralla</span> means a place to come together.
					</p>
					<p>It is a vantage point to see the common paths we travel.</p>
					<p>You can explore anytime as a guest or make an account to guide other explorers.</p>
				</div>
				<div className='container-btn'>
					<button className='explore-btn' onClick={() => history.push('/map')}>
						Explore Map
					</button>
					{!login ? (
						<button className='join-btn' onClick={() => history.push('/signup')}>
							Make Account
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
}
