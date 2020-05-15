import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';

import './Profile.css';

export default function Profile() {
	const { email, setEmail } = useContext(UserContext);
	const { token, setToken } = useContext(UserContext);
	const { username, setUsername } = useContext(UserContext);
	const { data, setData } = useContext(UserContext);
	const { login, setLogin } = useContext(UserContext);

	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(true);

	useEffect(() => {
		let url = `/api/post/email?email=${email}&token=${token}`;

		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};
		console.log('from fetch')
		fetch(url, requestOptions)
			.then((response) => {
				setLoading(true);
				const json = response.json();
				console.log(json);
				return json;
			})
			.then((data) => {
				console.log(data);
				setData(data.posts);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.error);
			});
	}, [ login ]);

	return (
		<React.Fragment>
			<div className='loading-error'>
				{loading && <h3>. . . . . .</h3>}
				{!error && <h3>loading failed</h3>}
			</div>
			<div className='hub'>
				<div className='container-posts'>
					{data &&
						data.map((item, index) => {
							return (
								<div key={index} className='hub-posts'>
									<div className='img-container'>
										<img src={item.images[0].img_url} className='img-post' />
									</div>
									<p>{item.post.id}</p>

									<div className='data-container' />
									<button className='delete-btn'>Delete</button>
								</div>
							);
						})}
				</div>
			</div>
		</React.Fragment>
	);
}
