import React, { useContext } from 'react';

import { useState } from 'react';
import { UserContext } from '../../UserContext';

import '../signup/Signup.css';

export default function Add() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ image, setImage ] = useState(null);
	const [ category, setCategory ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

	const { email, setEmail } = useContext(UserContext);
	const { token, setToken } = useContext(UserContext);
	const { login, setLogin } = useContext(UserContext);
	const { username, setUsername } = useContext(UserContext);

	const handleAdd = (e) => {
		e.preventDefault();

		let url = '/api/post';
		console.log(image);

		const data = new FormData();
		data.append('title', title);
		data.append('text', description);
		data.append('location', `(${location})`);
		data.append('token', token);
		data.append('email', email);
		data.append('image', image);

		const requestOptions = {
			method: 'POST',
			// headers: { 'Content-Type': 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD' },
			body: data
		};

		console.log(requestOptions.body);
		fetch(url, requestOptions)
			.then((response) => {
				console.log(response.json());
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err.error);
			});
	};

	console.log(title, description, image, location, category);

	return (
		<div className='form-container'>
			<div className='title'>
				<h1>Add a Journey</h1>
			</div>
			<form className='form-wraper' method='POST' name='signup'>
				<div className='input-wraper'>
					<input
						className='input'
						type='text'
						id='title'
						name='title'
						autoComplete='off'
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<label className='label' htmlFor='title'>
						Title
					</label>
				</div>

				<div className='input-wraper'>
					<textarea
						style={{ height: '200px' }}
						className='input'
						type='text'
						id='description'
						name='description'
						autoComplete='off'
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<label className='label' htmlFor='description'>
						Description
					</label>
				</div>

				<div className='input-wraper'>
					<input
						className='input'
						type='text'
						id='location'
						name='location'
						autoComplete='off'
						onChange={(e) => setLocation(e.target.value)}
						required
					/>
					<label className='label' htmlFor='location'>
						Location
					</label>
				</div>

				<div className='input-wraper'>
					<select className='select-wraper' onChange={(e) => setCategory(e.target.value)}>
						<option disabled selected hidden>
							Select a type of place
						</option>
						<option value='grapefruit'>Grapefruit</option>
						<option value='lime'>Lime</option>
						<option value='coconut'>Coconut</option>
						<option value='mango'>Mango</option>
						<option value='grapefruit'>Grapefruit</option>
						<option value='lime'>Lime</option>
						<option value='coconut'>Coconut</option>
						<option value='mango'>Mango</option>
						<option value='coconut'>Coconut</option>
						<option value='mango'>Mango</option>
					</select>
					<label className='label' htmlFor='select'>
						Category
					</label>
				</div>

				<div className='input-wraper'>
					<input
						className='input'
						type='file'
						id='file'
						name='file'
						onChange={(e) => setImage(e.target.files[0])}
						required
					/>
					<label className='file-label' htmlFor='file'>
						Upload an Image
					</label>
				</div>
				<button className='btn' onClick={(e) => handleAdd(e)}>
					ADD
				</button>
			</form>
		</div>
	);
}
