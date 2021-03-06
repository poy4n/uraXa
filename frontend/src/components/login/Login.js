import React, { useContext, useState, useEffect } from 'react';
import history from '../../history';
import { UserContext } from '../../UserContext';
import { handleErrors, parseErrors } from '../../services/errorHandlerService';

import './Login.css';

export default function Login() {
	const { email, setEmail } = useContext(UserContext);
	const { setToken } = useContext(UserContext);
	const { login, setLogin } = useContext(UserContext);
	const { setUsername } = useContext(UserContext);
	const { userCentre, setUserCentre } = useContext(UserContext);

	const [ password, setPassword ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);
	const [ helperText, setHelperText ] = useState('');
	const { domain } = useContext(UserContext);

	useEffect(
		() => {
			if ((email.trim() && password.trim()) || email === '') {
				setIsButtonDisabled(false);
				setHelperText('');
			} else {
				setIsButtonDisabled(true);
			}
		},
		[ email, password ]
	);

	const handleLogin = (e) => {
		e.preventDefault();

		let url = `${domain}/api/login`;

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password })
		};

		fetch(url, requestOptions)
			.then(handleErrors)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				setEmail(data.user.email);
				setToken(data.user.token);
				setUsername(data.user.username);
				setUserCentre({ lat: data.user.position.x, lng: data.user.position.y });
				setLogin(true);

				console.log(userCentre);

				history.push('/map');
			})
			.catch((err) => {
				parseErrors(err);
				setLogin(false);
				setHelperText('incorrect email or password, try again');
			});
	};

	return (
		<div className='form-container'>
			<div className='title'>
				<h2>LogIn to add stories</h2>
				<h4>Thanks for being a guide</h4>
			</div>
			<form className='form-wraper' method='POST' name='signup' onSubmit={handleLogin}>
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
					LogIn
				</button>
				<p className='error-msg'>{helperText}</p>
				<div className='join-direction'>
					<p>Haven't signed up yet?</p>
					{!login ? (
						<button className='join-btn' onClick={() => history.push('/signup')}>
							Make Account
						</button>
					) : null}
				</div>
			</form>
		</div>
	);
}
