import React, { useContext } from 'react';
import history from '../../history';
import { UserContext } from '../../UserContext';

import './Home.css';

export default function Home() {
	const { login } = useContext(UserContext);

	return (
		<div className='home'>
			<div className='description'>
				<p className='desc-parag'>
					<span>uralla</span> described a meeting place, or more especially a ceremonial meeting place and
					look out on a hill.<br />From the language of the local Anaiwan tribe.
				</p>
				<h1>
					uraXa <span className='desc-small'>shows you a map of stories.</span>
				</h1>
				<p>It is a look out point to see the nature, art, beauty, laughter.</p>
				<div className='desc-uralla'>
					<p>Wonder the map and discover stories from your community.</p>
					<p>Explore cities you can't wait to travel to.</p>
					<p>Share your stories and return to them anytime.</p>
				</div>
				<p className='desc-parag'>
					<span>uraXa</span> is a free community resource. <br />You can explore anytime as a guest or make an
					account to guide other explorers.
				</p>
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
