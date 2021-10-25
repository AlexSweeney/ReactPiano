import React, {useState, useEffect} from 'react';  
import { getKeyType } from './../utils.js';
import './Key.css';

export default function Key({
	keyName,  
	width,
	height,
	left,
	i,
	handleOver = () => {}, 
	handleOut = () => {}, 
	handleDown = () => {},  
}) { 
	/* ================================ Key.jsx ================================ // 
		* on Render
			* color
				* if keyName contains b or # => class black-key
				* if keyName doesn't contain b or # => white key
			
			* size
				* width: passed width
				* height: passed height
				  
			* position
				* left: passed value

		* on hover
			* change color
			* call handle Over

		* on down
			* change color
			* call handle Down

		* on out
			* change color
			* call handleOut
	*/

	// =========================== const =========================== //    
	// ============= Id  
	const idKeyName = keyName.replace('#', '\#');  // can't use # in ID for tests
	const KEY_ID = `key-${idKeyName}`; 

	// ============= Color
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [keyColorClass, setKeyColorClass] = useState('key-out');

	// ============= Type 
	const keyType = getKeyType(keyName);
	const keyTypeClass = (keyType === 'white') ? 'white-key' : 'black-key'; 

	// =========================== Event Handlers ================== // 
	function onMouseOver() { 
		handleOver(keyName)
		setIsOver(true) 
	}

	function onMouseDown() { 
		handleDown(keyName)
		setIsDown(true)
	}

	function onMouseUp() {
		setIsDown(false)
	}

	function onMouseOut() {
		handleOut(keyName)
		setIsOver(false)
		setIsDown(false)
	}

	// =========================== Helper Fns ===================== // 
	function updateKeyColorClass(isOver, isDown) {
		let newClass;

		if(isOver && !isDown) newClass = 'key-over';
		if(isOver && isDown) newClass = 'key-down';
		if(!isOver) newClass = 'key-out';

		setKeyColorClass(newClass)
	} 

	// =========================== Listen / Trigger ============== // 
	useEffect(() => {
		updateKeyColorClass(isOver, isDown)
	}, [isOver, isDown])

	// =========================== Output ======================== // 
		return (   
			<div className={`key ${keyTypeClass} ${keyColorClass}`} 
					id={KEY_ID}  
					key={KEY_ID}
					style={{ 
						width: width,
						height: height,
						left: left,
					}}
					onMouseOver={onMouseOver}
					onMouseOut={onMouseOut}
					onMouseDown={onMouseDown}
					onMouseUp={onMouseUp}>
			</div> 
		) 
}