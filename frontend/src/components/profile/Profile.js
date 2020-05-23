import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { handleErrors, parseErrors } from '../../services/errorHandlerService';
import history from '../../history';

import './Profile.css';

export default function Profile() {
	const { email } = useContext(UserContext);
	const { token } = useContext(UserContext);
	const { username } = useContext(UserContext);
	const { posts, setPosts } = useContext(UserContext);
	const { login } = useContext(UserContext);
	const { domain } = useContext(UserContext);

	const [ loading, setLoading ] = useState(false);
	const [ error ] = useState(true);

	useEffect(
		() => {
			let url = `${domain}/api/post/email?email=${email}&token=${token}`;

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
					setPosts(data.posts);
					setLoading(false);
				})
				.catch((err) => {
					parseErrors(err);
				});
		},
		[ login ]
	);

	const deletePost = (postId) => {
		let newPost = posts.filter((post) => {
			return post.id !== postId;
		});
		setPosts(newPost);

		let url = `${domain}/api/post/id`;

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
			.then((userPosts) => {
				console.log(userPosts.posts[0]);
				let newPost = userPosts.posts[0];
				setPosts([ ...posts, newPost ]);
			})
			.catch((err) => {
				parseErrors(err);
			});
	};

	return (
		<React.Fragment>
			<div className='loading-error'>
				{loading && <h3>. | . | . | .</h3>}
				{!error && <h3>loading failed</h3>}
			</div>
			<div className='add-post'>
				<button onClick={() => history.push('/add')}>Add a Story</button>
			</div>
			<div className='hub'>
				<div className='container-posts'>
					{posts &&
						posts.map((post, index) => {
							return (
								<div key={index} className='hub-posts'>
									<div className='img-container'>
										<img src={post.image} className='img-post' />
										<h2 className='title-post'>{post.title}</h2>
										<p className='user-post'>By: {username}</p>
										<p className='date-post'>{post.date.slice(0, 10)}</p>
										<button
											className='delete-btn'
											onClick={() => {
												if (window.confirm('are you sure to delete the post?'))
													deletePost(post.id);
											}}
										>
											Delete
										</button>
									</div>
									<div className='data-container'>
										<h4>{post.text}</h4>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</React.Fragment>
	);
}
