import React, {useState, useEffect} from 'react';
import {
	getParentId,
	getElementHeight,
	setElementWidth,
	triggerOnSizeChange,
	pxToNumber,
} from './../utils.js';
import './Key.css';

export default function Key({
	keyName,
	octave = 3,  
	handleOver = () => {}, 
	handleOut = () => {}, 
	handleDown = () => {},
	fillHeight = false,
}) { 
	/*
		* on Render
			* if keyName contains b or # 
				* return black key
			* if keyName doesn't contain b or # 
				* return white key

		* on size change
			* height 100% of container
			* width in proportion to height
 
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
	// ============= Ids
	keyName = keyName.replace('#', 'sharp');  // can't use # in ID for tests
	const keyId = `key-${keyName}-octave-${octave}`; 
	const keyType = getKeyType(keyName);

	// ============= Size
	const widthToHeightRatio = 0.2;

	// ============= Color
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [keyColorClass, setKeyColorClass] = useState('key-out');

	// =========================== Event Handlers ================== //
	function onRender() {  
		triggerOnSizeChange(keyId, onSizeChange) 
	}

	function onSizeChange() { 
		setWidthBasedOnHeight(keyId, widthToHeightRatio)
	} 

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
	function getKeyType(key) {
		if (key.indexOf('b') === -1 && key.indexOf('sharp') === -1) return 'white-key';
		if (key.indexOf('b') !== -1 || key.indexOf('sharp') != -1) return 'black-key';
	}

	function setWidthBasedOnHeight(id, proportion) { 
		const height = getElementHeight(id);
		const width = pxToNumber(height) * proportion + 'px';  
		setElementWidth(id, width) 
	}

	function updateKeyColorClass(isOver, isDown) {
		let newClass;

		if(isOver && !isDown) newClass = 'key-over';
		if(isOver && isDown) newClass = 'key-down';
		if(!isOver) newClass = 'key-out';

		setKeyColorClass(newClass)
	}

	// =========================== Listen / Trigger ============== //
	useEffect(() => {
		onRender()
	}, [])

	useEffect(() => {
		updateKeyColorClass(isOver, isDown)
	}, [isOver, isDown])

	// =========================== Output ======================== //
	return (  
		<div className={`key ${keyType} ${keyColorClass}`} 
		id={keyId}  
		onMouseOver={onMouseOver}
		onMouseOut={onMouseOut}
		onMouseDown={onMouseDown}
		onMouseUp={onMouseUp}></div>
	)
}

/*

	style={style}


// const thisWidth = getKeyWidth(keyColor, size);

	// const style = {
	// 	left: (i * blackWidth) * size + 'px',
	// 	width: thisWidth,
	// }   





	// function getKeyWidth(keyColor, size) {
	// 	const realWhiteWidth = 24;
	// 	const realBlackWidth = 14;
		
	// 	const whiteWidth = realWhiteWidth / 24;
	// 	const blackWidth = realBlackWidth / 24;

	// 	if(keyColor === 'white') return whiteWidth * size + 'px';
	// 	if(keyColor === 'black') return blackWidth * size + 'px';
	// }




	*/