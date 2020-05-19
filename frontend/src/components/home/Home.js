import React, { useContext } from 'react';
import history from '../../history';
import { UserContext } from '../../UserContext';

import './Home.css';

export default function Home() {
	const { login } = useContext(UserContext);

	return (
		<div className='home'>
			<div className='description'>
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
				<h1 className='desc-title'>Wander. Explore. Share.</h1>
				<div className='container-explore'>
					<div className='desc-explore'>
						<div className='container-img'>
							<img src='https://cdn2.iconfinder.com/data/icons/bagbox/png/globe-terrestre.png' />
						</div>
						<p>Wander the map and discover stories from your community.</p>
					</div>
					<div className='desc-explore'>
						<div className='container-img'>
							<img src='https://cdn2.iconfinder.com/data/icons/bagbox/png/Internet-bags.png' />
						</div>
						<p>Explore cities you can't wait to travel to.</p>
					</div>
					<div className='desc-explore'>
						<div className='container-img'>
							<img src='https://cdn2.iconfinder.com/data/icons/bagbox/png/Box-Notes-V2.png' />
						</div>
						<p>Share your stories and return to them anytime.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
