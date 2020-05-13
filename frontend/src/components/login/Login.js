import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import history from '../../history';
import {UserContext} from '../../UserContext';

import './Login.css';

export default function Login() {
	
	const { email, setEmail } = useContext(UserContext)
	const { token, setToken } = useContext(UserContext)


	const [ password, setPassword ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);
	const [ login, setLogin ] = useState(false);
	const [ helperText, setHelperText ] = useState('');

	useEffect(
		() => {
			if (email.trim() && password.trim() || email === '') {
				setIsButtonDisabled(false);
				setHelperText('');
			} else {
				setIsButtonDisabled(true);
			}
		},
		[ email, password ]
	);
	console.log(email, password);

	const handleLogin = (e) => {
		e.preventDefault();

		let url = '/api/login';

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password })
		};
		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setEmail(data.user.email);
				setToken(data.user.token);
				setLogin(true);

				history.push('/map');
			})
			.catch((err) => {
				console.log(err.error);
				setLogin(false);
				setHelperText('incorrect email or password');
			})
	};

	return (
		<div className='form-container'>
			<div className="title">
				<h1>Login To Your Account</h1>
			</div>
			<form className='form-wraper' method='POST' name='signup' onSubmit={handleLogin}>
				<div className='input-wraper'>
					<input
						className='input'
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
				<button className='btn' type="submit" disabled={isButtonDisabled}>
				 	LogIn
				</button>
				<p className="error-msg">{helperText}</p>
			</form>
		</div>
	);
}
