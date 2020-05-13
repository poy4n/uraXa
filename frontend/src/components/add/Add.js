import React from 'react';
import { useState } from 'react';

import '../signup/Signup.css';

export default function Add() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ image, setImage ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(true);

	const handleAdd = () => {
		return <p>helloo</p>;
	};

	console.log(title, description, image, location , category)

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
					<select  className='select-wraper' onChange={(e) => setCategory(e.target.value)}>
						<option disabled selected hidden>Select a type of place</option>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
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
