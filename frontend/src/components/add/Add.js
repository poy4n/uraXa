import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import history from '../../history';
import { autoSuggest } from '../search/autoSuggest';
import { handleErrors, parseErrors } from '../../services/errorHandlerService'
import Bar from '../bar/Bar';

import '../signup/Signup.css';

export default function Add() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ image, setImage ] = useState(null);
	const [ category, setCategory ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

	const { data, setData } = useContext(UserContext);
	const { email } = useContext(UserContext);
	const { token } = useContext(UserContext);
	const { types, setTypes } = useContext(UserContext);

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

	useEffect(() => {
		let url = `/api/tag?email=${email}&token=${token}`;

		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		};

		fetch(url, requestOptions)
			.then(handleErrors)
			.then((response) => {
				const json = response.json();
				return json;
			})
			.then((data) => {
				console.log(data.tags);
				setTypes(data.tags);
			})
			.catch((err) => {
				parseErrors(err);
			});
	});

	const handleAdd = (e) => {
		e.preventDefault();
		console.log('clicked');
		let url = '/api/post';

		const dataForm = new FormData();

		dataForm.append('title', title);
		dataForm.append('text', description);
		dataForm.append('token', token);
		dataForm.append('email', email);
		dataForm.append('image', image);
		dataForm.append('tag', category);

		autoSuggest(location).then((res) => {
			dataForm.append('location', `(${res[0].position.lat}, ${res[0].position.lng})`);

			const requestOptions = {
				method: 'POST',
				body: dataForm
			};

			fetch(url, requestOptions)
				.then(handleErrors)
				.then((response) => {
					const json = response.json();
					console.log(json);
					return json;
				})
				.then((userData) => {
					console.log(userData.posts[0]);
					let newData = userData.posts[0];
					setData([ ...data, newData ]);
				})
				.catch((err) => {
					parseErrors(err);
				});
		});
		history.push('/map');
	};

	const maxLength = 600;
	const charsLeft = maxLength - description.length;

	return (
		<div className='form-container'>
			<div className='title'>
				<h2>Add your story</h2>
			</div>
			<form className='form-wraper' method='POST' name='signup'>
				<div className='input-wraper'>
					<input
						className='input'
						placeholder='name your story'
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
						style={{ height: '150px' }}
						className='input'
						placeholder='tell the world your story'
						type='text'
						id='description'
						name='description'
						autoComplete='off'
						onChange={(e) => setDescription(e.target.value)}
						maxlength='600'
						required
					/>
					<Bar maxLength={maxLength} charsLeft={charsLeft} />
					<label className='label' htmlFor='description'>
						Description
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
						{types !== undefined && types.length > 0 ? (
							types.map((type) => {
								return (
									<option key={type.id} value={type.id}>
										{type.tag}
									</option>
								);
							})
						) : null}
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
					Publish
				</button>
			</form>
		</div>
	);
}
