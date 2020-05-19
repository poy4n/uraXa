import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { handleErrors } from '../../services/errorHandlerService';
import history from '../../history';

import './Profile.css';

export default function Profile() {
	const { email } = useContext(UserContext);
	const { token } = useContext(UserContext);
	const { username } = useContext(UserContext);
	const { data, setData } = useContext(UserContext);
	const { login } = useContext(UserContext);

	const [ loading, setLoading ] = useState(false);
	const [ error ] = useState(true);

	useEffect(
		() => {
			let url = `/api/post/email?email=${email}&token=${token}`;

			const requestOptions = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			};

			fetch(url, requestOptions)
				.then(handleErrors)
				.then((response) => {
					setLoading(true);
					const json = response.json();
					console.log(json);
					return json;
				})
				.then((data) => {
					console.log(data.posts);
					setData(data.posts);
					setLoading(false);
				})
				.catch((err) => {
					err.text().then( errorMessage => {
						console.log(errorMessage);
					});
				});
		},
		[ login ]
	);

	const deletePost = (postId) => {
		let newData = data.filter((post) => {
			return post.id !== postId;
		});
		setData(newData);

		let url = '/api/post/id';

		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, token: token, id: postId })
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
				err.text().then( errorMessage => {
					console.log(errorMessage);
				});
			});
	};

	return (
		<React.Fragment>
			<div className='loading-error'>
				{loading && <h3>. | . | . | .</h3>}
				{!error && <h3>loading failed</h3>}
			</div>
			<div className='add-post'>
				<button onClick={() => history.push('/add')}>+</button>
			</div>
			<div className='hub'>
				<div className='container-posts'>
					{data &&
						data.map((post, index) => {
							return (
								<div key={index} className='hub-posts'>
									<div className='img-container'>
										<img src={post.image} className='img-post' />
										<h2 className='title-post'>{post.title}</h2>
										<p className='user-post'>By: {username}</p>
										<p className='date-post'>{post.date.slice(0, 10)}</p>
									</div>
									<div className='data-container'>
										<h4>{post.text}</h4>
										<button className='delete-btn' onClick={() => deletePost(post.id)}>
											Delete
										</button>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</React.Fragment>
	);
}
