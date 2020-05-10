import React from 'react';
import { useState } from 'react';

import './Login.css';

export default function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<div className='form-container'>
			<h1>Login To Your Account</h1>
			<form className='form-wraper' method='POST' name='signup'>
				<div className='input-wraper'>
					<input className='input' type='email' id='email' name='email' autoComplete='off' required />
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
						// onChange={(e) => handleChange(e)}
						value={password}
						required
					/>
					<label className='label' htmlFor='password'>
						Password
					</label>
				</div>
				<button className='login-btn'>Login</button>
			</form>
		</div>
	);
}
