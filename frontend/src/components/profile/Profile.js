import React from 'react';
import { useState, useEffect } from 'react';

import './Profile.css';

export default function Profile() {
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(true);
	const [ data, setData ] = useState([
		{
			name: 'couple',
			photo:
				'https://www.traveller.com.au/content/dam/images/3/3/3/t/v/image.related.articleLeadwide.620x349.333o4.png/1392875575197.jpg'
		},
		{
			name: 'rose',
			photo: 'https://i.somethingawful.com/u/russ/goldmine95/tourist1.jpg'
		},
		{
			name: 'jack',
			photo: 'https://www.elliott.org/wp-content/uploads/shutterstock_248622628.jpg'
		},
		{
			name: 'john',
			photo: 'https://i.somethingawful.com/u/russ/goldmine95/tourist1.jpg'
		}
	]);

	useEffect(() => {
		fetch('')
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				setData(data);
			})
			.catch((e) => {
				setLoading(false);
				setError(true);
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
			</div>
		);
	};

	return (
		<React.Fragment>
			<div className='loading-error'>
				{loading && <h3>posts are loading...</h3>}
				{!error && <h3>loading failed...</h3>}
			</div>
			<div className='hub'>
				<div className='container-posts'>{data && data.map(renderData)}</div>
			</div>
		</React.Fragment>
	);
}
