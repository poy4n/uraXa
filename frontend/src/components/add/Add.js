import React from 'react';
import { useState } from 'react';

import '../signup/Signup.css';

export default function Add() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ image_url, setImage_url ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

	const handleAdd = () => {
		return <p>helloo</p>;
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
						onChange={(e) => setLocation(e.target.value)}
						required
					/>
					<label className='label' htmlFor='location'>
						Location
					</label>
				</div>

				<div className='input-wraper'>
					<input
						className='input'
						type='text'
						id='image_url'
						name='image_url'
						onChange={(e) => setImage_url(e.target.value)}
						required
					/>
					<label className='label' htmlFor='image_url'>
						Image URL
					</label>
				</div>
				<button className='btn' disabled={isButtonDisabled} onClick={(e) => handleAdd(e)}>
					ADD
				</button>
			</form>
		</div>
	);
}
