import React from 'react';
import { useState, useEffect } from 'react';

import './Login.css';

export default function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);
	const [ token, setToken ] = useState('');

	useEffect(
		() => {
			if (email.trim() && password.trim()) {
				setIsButtonDisabled(false);
			} else {
				setIsButtonDisabled(true);
			}
		},
		[ email, password ]
	);
	console.log(email, password);

	const handleLogin = (e) => {
		e.preventDefault();

		let url = '/api/login'

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password})
		};
		fetch(url, requestOptions)
			.then(response => response.json())
			.then(data => {
			console.log(data)
			setEmail(data.user.email);
			setToken(data.user.token);
		})
		.catch(error => console.log(error.error))
	};

	return (
		<div className='form-container'>
			<h1>Login To Your Account</h1>
			<form className='form-wraper' method='POST' name='signup'>
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
				<button className='login-btn' disabled={isButtonDisabled} onClick={(e) => handleLogin(e)}>
					Login
				</button>
			</form>
		</div>
	);
}
