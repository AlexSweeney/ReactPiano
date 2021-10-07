import React from 'react';
import Octave from './Octave.jsx';
import './Keys.css';

export default function Keys({handleOver, handleOut, handleDown}) {
	return(
		<div className="keys"> 
			<Octave handleOver={handleOver} handleOut={handleOut} handleDown={handleDown}/>	 
		</div>
	)
}