import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { handleErrors, parseErrors } from '../../services/errorHandlerService';
import { autoSuggest } from '../search/autoSuggest';
import history from '../../history';
import { UserContext } from '../../UserContext';

import './Signup.css';

export default function Signup() {
	const { email, setEmail } = useContext(UserContext);
	const { setToken } = useContext(UserContext);
	const { username, setUsername } = useContext(UserContext);
	const { setLogin } = useContext(UserContext);
	const { userCentre, setUserCentre } = useContext(UserContext);

	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);
	const [ password, setPassword ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ position, setPosition ] = useState('');

	useEffect(
		() => {
			autoSuggest(location, userCentre)
				.then(handleErrors)
				.then((res) => {
					console.log(res);
					let position = { lat: -37.8136, lng: 144.9631 };

					if (res !== undefined && res.length > 0) {
						position = `(${res[0].position.lat}, ${res[0].position.lng})`;
					}

					setPosition(position);
				})
				.catch((err) => {
					parseErrors(err);
				});
		},
		[ location ]
	);

	useEffect(
		() => {
			if (username.trim() && email.trim() && password.trim() && position.trim()) {
				setIsButtonDisabled(false);
			} else {
				setIsButtonDisabled(true);
			}
		},
		[ username, email, password, position ]
	);

	const handleJoin = (e) => {
		e.preventDefault();

		let url = '/api/signup';

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password, username: username, position: position })
		};
		fetch(url, requestOptions)
			.then(handleErrors)
			.then((response) => response.json())
			.then((data) => {
				setEmail(data.user.email);
				setToken(data.user.token);
				setUsername(data.user.username);
				setUserCentre({ lat: data.user.position.x, lng: data.user.position.y });
				setLogin(true);

				history.push('/map');
			})
			.catch((err) => {
				parseErrors(err);
				setLogin(false);
			});
	};

	return (
		<div className='form-container'>
			<div className='title'>
				<h2>Your moments make great stories</h2>
				<h4>Sign up for a free account</h4>
			</div>
			<form className='form-wraper' method='POST' name='signup' onSubmit={handleJoin}>
				<div className='input-wraper'>
					<input
						className='input'
						placeholder='your name'
						type='text'
						id='username'
						name='username'
						autoComplete='off'
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<label className='label' htmlFor='username'>
						Username
					</label>
				</div>

				<div className='input-wraper'>
					<input
						className='input'
						placeholder='name of a city, place or address'
						type='text'
						id='location'
						name='location'
						autoComplete='off'
						onChange={(e) => setLocation(e.target.value)}
						required
					/>
					<label className='label' htmlFor='location'>
						Base Location
					</label>
				</div>

				<div className='input-wraper'>
					<input
						className='input'
						placeholder='your email'
						type='email'
						id='email'
						name='email'
						autoComplete='off'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label className='label' htmlFor='email'>
						Email address
					</label>
				</div>

				<div className='input-wraper'>
					<input
						className='input'
						placeholder='your password'
						type='password'
						id='password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<label className='label' htmlFor='password'>
						Password
					</label>
				</div>

				<button className='btn' type='submit' disabled={isButtonDisabled}>
					Join
				</button>
			</form>
		</div>
	);
}
