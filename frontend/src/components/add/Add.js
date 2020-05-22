import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import history from '../../history';
import { autoSuggest } from '../search/autoSuggest';
import { handleErrors, parseErrors } from '../../services/errorHandlerService';
import Bar from '../bar/Bar';
import { isEmpty, isEqual } from 'lodash';

import '../signup/Signup.css';

export default function Add() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ image, setImage ] = useState(null);
	const [ preview, setPreview ] = useState(null);
	const [ category, setCategory ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

	const { login } = useContext(UserContext);
	const { posts, setPosts } = useContext(UserContext);
	const { email } = useContext(UserContext);
	const { token } = useContext(UserContext);
	const { types, setTypes } = useContext(UserContext);
	const { userCentre } = useContext(UserContext);
	const { setPostLoading } = useContext(UserContext);
	const { locationClickCoord, setLocationClickCoord } = useContext(UserContext);

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
	}, []);

	useEffect(
		() => {
			console.log(locationClickCoord);
			if (!isEmpty(locationClickCoord)) {
				let location = document.querySelector('#location-input');
				if (location !== null) location.classList.toggle('input-location-none');
				setLocation('location');
				// to hack the condition and enable the button
			}
		},
		[ locationClickCoord ]
	);

	const handleAdd = (e) => {
		e.preventDefault();
		setPostLoading(true);

		console.log('clicked');
		let url = '/api/post';

		const dataForm = new FormData();

		dataForm.append('title', title);
		dataForm.append('text', description);
		dataForm.append('token', token);
		dataForm.append('email', email);
		dataForm.append('image', image);
		dataForm.append('tag', category);

		autoSuggest(location, userCentre).then((res) => {
			let coordinates = !isEmpty(locationClickCoord)
				? `(${locationClickCoord.lat}, ${locationClickCoord.lng})`
				: `(${res[0].position.lat}, ${res[0].position.lng})`;
			dataForm.append('location', coordinates);

			const requestOptions = {
				method: 'POST',
				body: dataForm
			};

			fetch(url, requestOptions)
				.then(handleErrors)
				.then((response) => {
					const json = response.json();
					setPostLoading(false);
					return json;
				})
				.then((userPosts) => {
					console.log(userPosts);
					let newPost = userPosts.post;
					setPosts([ ...posts, newPost ]);

					let location = document.querySelector('#location-input');
					location.classList.toggle('input-location-none');
					setLocationClickCoord({});
				})
				.catch((err) => {
					parseErrors(err);
				});
		});
		history.push('/map');
	};

	const maxLength = 550;
	const charsLeft = maxLength - description.length;

	return (
		<React.Fragment>
			{login ? (
				<div className='form-container'>
					<form className='form-wraper' method='POST' name='signup'>
						<div className='title'>
							<h2>Add Story</h2>
						</div>
						<div className='input-wraper'>
							<input
								className='input'
								type='file'
								id='file'
								name='file'
								onChange={(e) => {
									setImage(e.target.files[0]);
									setPreview(URL.createObjectURL(e.target.files[0]));
								}}
								required
							/>
							<label className='file-label' htmlFor='file'>
								Upload an Image
							</label>
						</div>
						<div className='input-wraper'>
							<input
								className='input'
								placeholder='name your story'
								type='text'
								id='title'
								name='title'
								autoComplete='off'
								onChange={(e) => setTitle(e.target.value)}
								maxlength='15'
								required
							/>
							<label className='label' htmlFor='title'>
								Title
							</label>
						</div>

						<div className='input-wraper'>
							<textarea
								style={{ height: '250px' }}
								className='input'
								placeholder='tell the world your story'
								type='text'
								id='description'
								name='description'
								autoComplete='off'
								onChange={(e) => setDescription(e.target.value)}
								maxlength='550'
								required
							/>
							<Bar maxLength={maxLength} charsLeft={charsLeft} />
							<label className='label' htmlFor='description'>
								Description
							</label>
						</div>

						<div className='input-wraper' id='location-input'>
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
						<button className='btn' disabled={isButtonDisabled} onClick={(e) => handleAdd(e)}>
							Publish
						</button>
					</form>
					<div className='container-img-preview'>
						<img className='img-preview' src={preview} />
					</div>
				</div>
			) : (
				history.push('/login')
			)}
		</React.Fragment>
	);
}
