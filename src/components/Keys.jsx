import React from 'react'; 
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
	*/ 
  
	return(
		<div className="keys"> 
			{
				keyNames.map((keyName, i) => {  
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