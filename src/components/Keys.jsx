import React from 'react';
// import Octave from './Octave.jsx';
import Key from './parts/Key.jsx';
import './Keys.css';

export default function Keys({
	keyNames = [], 
	handleOver = () => {}, 
	handleOut  = () => {}, 
	handleDown = () => {},
}) {
	/* 
		* on render 
			* make key element for every keyName
			* give keys correct spacing 

		* on resize 
			* maintain correct spacing
	*/

	function old() {
		// const size = 39;

		// const realWhiteWidth = 24;
		// const realBlackWidth = 14;
		// const whiteWidth = realWhiteWidth / 24;
		// const blackWidth = realBlackWidth / 24;

		// const keyColor = getKeyColor(keyName);
		// const thisWidth = (keyColor === 'white' ? whiteWidth : blackWidth) * size + 'px';
 
		// left: (i * blackWidth) * size + 'px',  
	}

	// function getOffsetLeft(keyName, i) {
	// 	// get key width 


	// }
  
	return(
		<div className="keys"> 
			{
				keyNames.map((keyName, i) => { 
					// const offsetLeft = getOffsetLeft(keyName, i);
			 

					return (<Key 
						i={i}
						keyName={keyName} 
						handleOver={handleOver} 
						handleOut={handleOut}
						handleDown={handleDown}
					/>)
				})
			}
		</div>
	)
}

/*

				 */