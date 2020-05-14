import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import history from '../../history';

import '../signup/Signup.css';

export default function Add() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ image, setImage ] = useState(null);
	const [ category, setCategory ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

	const { data, setData } = useContext(UserContext);
	const { email, setEmail } = useContext(UserContext);
	const { token, setToken } = useContext(UserContext);

	useEffect(
		() => {
			if (title.trim() && description.trim() && location.trim() && category !== '' && image !== null) {
				setIsButtonDisabled(false);
			} else {
				setIsButtonDisabled(true);
			}
		},
		[ title, description, location, image, category ]
	);

	const handleAdd = (e) => {
		e.preventDefault();

		let url = '/api/post';
		console.log(image);

		const dataForm = new FormData();
		dataForm.append('title', title);
		dataForm.append('text', description);
		dataForm.append('location', `(${location})`);
		dataForm.append('token', token);
		dataForm.append('email', email);
		dataForm.append('image', image);

		const requestOptions = {
			method: 'POST',
			body: dataForm
		};

		fetch(url, requestOptions)
			.then((response) => {
				const json = response.json();
				console.log(json);
				return json;
			})
			.then((userData) => {
				console.log(userData.posts[0]);
				let newData = userData.posts[0];
				setData([ ...data, newData ]);

				history.push('/map');
			})
			.catch((err) => {
				console.log(err.error);
			});
	};

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
					<select
						className='select-wraper'
						defaultValue={'default'}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value='default' disabled>
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
				<button className='btn' disabled={isButtonDisabled} onClick={(e) => handleAdd(e)}>
					ADD
				</button>
			</form>
		</div>
	);
}
