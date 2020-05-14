import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';

import './Profile.css';

export default function Profile() {
	const { email, setEmail } = useContext(UserContext);
	const { token, setToken } = useContext(UserContext);
	const { username, setUsername } = useContext(UserContext);
	const { data, setData } = useContext(UserContext);

	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(true);

	useEffect(() => {
		let url = '/api/post/email';

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, token: token })
		};

		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setData(data.posts);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.error);
			});
	}, []);

	const renderData = (ele, index) => {
		return (
			<div key={index} className='hub-posts'>
				<div className='img-container'>
					<img src={ele.photo} className='img-post' />
				</div>
				<div className='data-container'>
					<p>{ele.name}</p>
				</div>
				<button className='delete-btn'>Delete</button>
			</div>
		);
	};

	return (
		<React.Fragment>
			<div className='loading-error'>
				{loading && <h3>. . . . . .</h3>}
				{!error && <h3>loading failed</h3>}
			</div>
			<div className='hub'>
				<div className='container-posts'>{data && data.map(renderData)}</div>
			</div>
		</React.Fragment>
	);
}
