import React from 'react';
import './Key.css';

export default function Key({keyName, i, handleOver, handleOut, handleDown}) { 
	// =========================== const =========================== //   
	const id = `key-${keyName}`;

	const size = 30;
	// size = white key width

	const realWhiteWidth = 24;
	const realBlackWidth = 14;
	

	const whiteWidth = realWhiteWidth / 24;
	const blackWidth = realBlackWidth / 24;

	const keyColor = getKeyColor(keyName);
	const thisWidth = (keyColor === 'white' ? whiteWidth : blackWidth) * size + 'px';
  
	const style = {
		left: (i * blackWidth) * size + 'px',
		width: thisWidth,
	}   
	 
	// =========================== Find Formula ======================== // 
	const blackToWhiteWidthRatio = realBlackWidth / realWhiteWidth;
	const blackKeyWidth = blackToWhiteWidthRatio * size;
	getLeft()

	function getLeft() { 
		const oldVer = (i * blackWidth) * size + 'px';
		const newVer = (i * blackKeyWidth) + 'px';

		console.log('oldVer', oldVer)
		console.log('newVer', newVer)
	}

	// =========================== Helper Fns ===================== //
	// ================ Color
	function getKeyColor(key) {
		return (key.indexOf('b') == - 1 ) ? 'white' : 'black';
	}
 
	// =========================== Output ===================== //
	return (  
		<div className={`key ${keyColor}-key`} id={id} style={style}
		onMouseOver={() => handleOver(keyName)}
		onMouseOut={handleOut}
		onMouseDown={() => handleDown(keyName)}></div>
	)
}