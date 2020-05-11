import React from 'react';
import { useState, useEffect } from 'react';

import './Login.css';

export default function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

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

		if (email === 'abc@email.com' && password === 'password') {
			console.log('Correct username or password');
		} else {
			console.log('Incorrect username or password');
		}
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
