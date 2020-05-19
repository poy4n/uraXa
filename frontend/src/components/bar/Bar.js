import React from 'react';

import './Bar.css';

export default function Bar({ maxLength, charsLeft }) {
	const barStyle = {
		width: `${charsLeft / maxLength * 100}%`
	};

	return (
		<div className='bar-wrapper'>
			<div style={barStyle} className='bar' />
			<span>{charsLeft}</span>
		</div>
	);
}
