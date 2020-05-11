import React from 'react';
import { useState, useEffect } from 'react';

import './Signup.css';

export default function Signup() {
	const [ name, setName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

	useEffect(
		() => {
			if (name.trim() && username.trim() && email.trim() && password.trim()) {
				setIsButtonDisabled(false);
			} else {
				setIsButtonDisabled(true);
			}
		},
		[ name, username, email, password ]
	);
	console.log(name, username, email, password);

	const handleJoin = (e) => {
		e.preventDefault();

		if (email === 'abc@email.com' && password === 'password') {
			console.log('Correct username or password');
		} else {
			console.log('Incorrect username or password');
		}
	};

	return (
		<div className='form-container'>
			<h1>Join uraXa</h1>
			<form className='form-wraper' method='POST' name='signup'>
				<div className='input-wraper'>
					<input
						className='input'
						type='text'
						id='name'
						name='name'
						autoComplete='off'
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<label className='label' htmlFor='name'>
						Your name
					</label>
				</div>

				<div className='input-wraper'>
					<input
						className='input'
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
				<button className='signup-btn' disabled={isButtonDisabled} onClick={(e) => handleJoin(e)}>
					SignUp
				</button>
			</form>
		</div>
	);
}
