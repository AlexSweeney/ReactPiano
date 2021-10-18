import React, {useState, useEffect} from 'react';
import {
	getParentId,
	getElementHeight,
	getElementWidth,
	setElementWidth,
	triggerOnSizeChange,
	pxToNumber,
} from './../utils.js';
import './Key.css';

export default function Key({
	keyName,
	i,
	handleOver = () => {}, 
	handleOut = () => {}, 
	handleDown = () => {},  
}) { 
	/*
		* on Render
			* color
				* if keyName contains b or # => class black-key
				* if keyName doesn't contain b or # => white key
			
			* size
				* white key 
					* height 100% of container height
					* width 20% of container height

				* black key 
					* height 65% of container height
					* height 5833333333333334% of container height
			
			- offset
				- style.left of i * black key width
			
			

		- on size change
			* white key 
				- height 100% of container height
				- width 20% of container height
			* black key 
				- height 65% of container height
				- width 5833333333333334% of container height

			- style.left of i * black key width
 
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
	const ID_KEY_NAME = keyName.replace('#', 'sharp');  // can't use # in ID for tests
	const KEY_ID = `key-${ID_KEY_NAME}`; 
	const KEY_TYPE = getKeyType(keyName);

	// ============= Size 
	const realWhiteWidth = 24;
	const realBlackWidth = 14;

	const realWhiteHeight = realWhiteWidth * 5;
	const realBlackHeight = realWhiteHeight * 0.65;

	// const realWhiteWidth = 4;
	// const realBlackWidth = 0.5;

	// const realWhiteHeight = 2;
	// const realBlackHeight = 1;
	
	// console.log('WHITE_WIDTH_TO_BLACK_WIDTH', WHITE_WIDTH_TO_BLACK_WIDTH)

	// Percentage Heights in decimal
	const WHITE_HEIGHT = 100;
	const BLACK_HEIGHT = getRatioPercentage(realWhiteHeight, realBlackHeight);

	const THIS_HEIGHT = (KEY_TYPE === 'white-key') ? WHITE_HEIGHT + '%' : BLACK_HEIGHT +'%';

	// Height to width ratio percent in decimal
	const WHITE_HEIGHT_TO_WHITE_WIDTH = getDecimalRatio(realWhiteHeight, realWhiteWidth);
	const BLACK_HEIGHT_TO_BLACK_WIDTH = getDecimalRatio(realBlackHeight, realBlackWidth);

	const WHITE_HEIGHT_TO_BLACK_WIDTH = getDecimalRatio(realWhiteHeight, realBlackWidth);

	const WHITE_WIDTH_TO_BLACK_WIDTH = getDecimalRatio(realWhiteWidth, realBlackWidth);
	const BLACK_WIDTH_TO_WHITE_WIDTH = getDecimalRatio(realBlackWidth, realWhiteWidth);

	const BLACK_HEIGHT_TO_WHITE_WIDTH = getDecimalRatio(realBlackHeight, realWhiteWidth);

	function getRatioPercentage(a, b) {
		const percent = 100 / a;
		const ratio = b * percent;
		return ratio;
	}

	function getDecimalRatio(a, b) {
		return getRatioPercentage(a, b) / 100;
	}

	// const WHITE_WIDTH_TO_BLACK_WIDTH = realWhiteWidth / realBlackWidth;
	// const BLACK_WIDTH_TO_WHITE_WIDTH = realBlackWidth / realWhiteWidth;
 	
 	// console.log("WHITE_HEIGHT_TO_WHITE_WIDTH", WHITE_HEIGHT_TO_WHITE_WIDTH)

	// const WHITE_WIDTH_TO_BLACK_WIDTH = (100 / realWhiteWidth) * realBlackWidth;
	// const BLACK_WIDTH_TO_WHITE_WIDTH = 

	// const WHITE_HEIGHT_TO_WHITE_WIDTH = 0.2; 
	// const BLACK_HEIGHT_TO_BLACK_WIDTH = ;
 	
	


	/* const WHITE_WIDTH_TO_BLACK_WIDTH = 0.58;*/

	

	// Width ratio = black key width in proportion to white key width
	// const whiteWidthRatio = realWhiteWidth / realWhiteWidth;
	// const blackWidthRatio = realBlackWidth / realWhiteWidth;   

	// white key width = 20% of white height 
	// black key width = 58% of white height
		  
	// width compared to container height
	// const  = 0.2;
	// const whiteWidthRatio = widthToHeightRatio * whiteWidth;
	// const blackWidthRatio = widthToHeightRatio * blackWidth;

	// let thisWidthRatio;

	// if(KEY_TYPE === 'white-key') thisWidthRatio = whiteWidthRatio;
	// if(KEY_TYPE === 'black-key') thisWidthRatio = blackWidthRatio;

	// console.log('whiteWidthRatio', whiteWidthRatio)
	// console.log('blackWidthRatio', blackWidthRatio)
	// console.log('===================================================')
	/// 
	// const blackWidthRatio = whiteWidthRatio * blackWidthToWhiteWidthRatio;

	// left = i * blackWidth
 	
 	const [width, setWidth] = useState(0); 
 	const [height, setHeight] = useState(THIS_HEIGHT);
	const [leftOffset, setLeftOffset] = useState(0);

	// ============= Color
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [keyColorClass, setKeyColorClass] = useState('key-out');

	// =========================== Event Handlers ================== //
	function onRender() {  
		setWidth(getKeyWidth())

		const leftOff = getLeftOffset();
		 console.log('leftOff', leftOff)
		setLeftOffset(leftOff)

		// setLeft(getOffsetLeft())
		// triggerOnSizeChange(KEY_ID, onContainerSizeChange)  

		// updateKeyWidth(KEY_ID, KEY_TYPE)
		// updateLeftOffset(KEY_ID, KEY_TYPE, i)
	}

	function onContainerSizeChange() { 
		// updateKeyWidth()
		// updateLeftOffset(KEY_ID, KEY_TYPE, i)
		// setWidthBasedOnHeight(KEY_ID, widthToHeightRatio)
		// updateBlackKeyWidth()
		// updateLeftOffset(KEY_ID, KEY_TYPE, i)
	} 

	// function onKeyWidthChange(width) {
	// 	updateLeftOffset(width)
	// }

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
		if (key.indexOf('b') === -1 && key.indexOf('#') === -1) return 'white-key';
		if (key.indexOf('b') !== -1 || key.indexOf('#') != -1) return 'black-key';
	}

	function getKeyWidth() {
		const height = getElementHeight(KEY_ID, 'number'); 
		const width = getWidthFromHeight(height); 
		return width; 
	} 

	function getKeyHeight() {
		return getElementHeight(KEY_ID, 'number');
	}

	function getWidthFromHeight(height) {
		if(KEY_TYPE === 'white-key') return height * WHITE_HEIGHT_TO_WHITE_WIDTH;
		if(KEY_TYPE === 'black-key') return height * BLACK_HEIGHT_TO_BLACK_WIDTH;
	}

	function getWhiteKeyWidth() {
		const height = getElementHeight(KEY_ID, 'number'); 
		if(KEY_TYPE === 'white-key') return height * WHITE_HEIGHT_TO_WHITE_WIDTH;
		if(KEY_TYPE === 'black-key') return height * BLACK_HEIGHT_TO_WHITE_WIDTH;
	}

	function getLeftOffset() {
		const whiteKeyWidth = getWhiteKeyWidth();
		console.log('whiteKeyWidth', whiteKeyWidth)
		return (i * WHITE_WIDTH_TO_BLACK_WIDTH) * whiteKeyWidth;
	}

	// function getLeftOffset(height) {
	// 	const blackKeyWidth = getBlackWidth(height);
	// 	const thisWidth = getKeyWidth();

	// 	if(KEY_TYPE === 'white-key') return Math.ceil(i / 2) * thisWidth;
	// 	if(KEY_TYPE === 'black-key') return i  * thisWidth;
	// }

	function getBlackWidth() {
		const height = getKeyHeight();
		if(KEY_TYPE === 'white-key') return height * WHITE_HEIGHT_TO_BLACK_WIDTH;
		if(KEY_TYPE === 'black-key') return height * BLACK_HEIGHT_TO_BLACK_WIDTH;
	}

	// function getWhiteKeyHeight() {
	// 	if(KEY_TYPE === 'white-key') return getElementHeight(KEY_ID, 'number');
	// 	if(KEY_TYPE === 'black-key') return getElementHeight(KEY_ID, 'number') *  2;
	// }

	// function getBlackKeyWidth() {
	// 	const whiteHeight = getWhiteKeyHeight();
	// 	console.log('whiteHeight', whiteHeight);
	// 	return whiteHeight * WHITE_HEIGHT_TO_WIDTH * WHITE_WIDTH_TO_BLACK_WIDTH;
	// }

	// function whiteHeightToWhiteWidth() {
	// 	return getElementHeight(KEY_ID, 'number') * WHITE_HEIGHT_TO_WIDTH;
	// }

	// function blackHeightToBlackWidth() {
	// 	return getElementHeight(KEY_ID, 'number') * BLACK_HEIGHT_TO_WIDTH;
	// }

/*	function getBlackKeyWidth() {
		if(KEY_TYPE === 'white-key') {
			const whiteHeight = getWhiteKeyHeight();
			return whiteHeight * WHITE_HEIGHT_TO_WIDTH * WHITE_WIDTH_TO_BLACK_WIDTH;
		}  
		if(KEY_TYPE === 'black-key') return getKeyWidth();
	}
*/
	// function getLeftOffset() {
	// 	const blackWidth = getBlackKeyWidth();
	// 	console.log('blackWidth', blackWidth)
	// 	return blackWidth * i;
	// }

	// function updateKeyWidth() {
	// 	let newWidth = getKeyWidth();
	// 	setWidth(newWidth)
	// }

	// function getBlackKeyWidth() {
	// 	const whiteWidth = getKeyWidth();
	// 	const blackKeyWidth = whiteWidth * blackWidthRatio;
	// }

	// function getBlackKeyWidthOnWhiteKey() {
	// 	const whiteKeyHeight = getElementHeight(KEY_ID, 'number');
	// }

	// function getWhiteKeyWidth() {
	// 	return getWidthBasedOnHeight(whiteWidthRatio)
	// }

	// function getBlackKeyWidth() {  
	// 	return getWidthBasedOnHeight(blackWidthRatio)
	// }

	// function getWidthBasedOnHeight(ratio) { 
	// 	const height = getElementHeight(KEY_ID, 'number');
	// 	const width = height * ratio;
	// 	return width;
	// }

	function updateKeyColorClass(isOver, isDown) {
		let newClass;

		if(isOver && !isDown) newClass = 'key-over';
		if(isOver && isDown) newClass = 'key-down';
		if(!isOver) newClass = 'key-out';

		setKeyColorClass(newClass)
	}

	// function setWidthBasedOnHeight(id) { 
	// 	const width = getWidthBasedOnHeight(id) + 'px';  
	// 	setElementWidth(id, width) 
	// }

	

	/*function updateBlackKeyWidth(KEY_ID, KEY_TYPE) {
		let newBlackKeyWidth;

		if(KEY_TYPE === 'white-key') newBlackKeyWidth = getBlackKeyWidth(KEY_ID);
		if(KEY_TYPE === 'black-key') newBlackKeyWidth = getElementWidth(KEY_ID);

		console.log('newBlackKeyWidth', newBlackKeyWidth)

		setBlackKeyWidth(newBlackKeyWidth)
	}*/

	// function updateLeftOffset(width) {
	// 	let blackKeyWidth;
	// 	let newOffset;

	// 	console.log('update left offset', width)

	// 	if(KEY_TYPE === 'white-key') blackKeyWidth = width * blackWidthRatio;
	// 	if(KEY_TYPE === 'black-key') blackKeyWidth = width;
		
	// 	// if(KEY_TYPE === 'black-key') {

	// 		console.log(' blackKeyWidth', blackWidth)
	// 	// 	console.log('KEY_ID', KEY_ID)
	// 	// 	console.log('width', width)
	// 	// }
	// 	// console.log(' ================================= ')
	// 	// console.log('blackKeyWidth', blackKeyWidth)
	// 	newOffset = blackKeyWidth * i + 'px'; 
	// 	// console.log('i', i);
	// 	// console.log('newOffset', newOffset)
	// 	// console.log(' ================================= ')
	// 	setLeftOffset(newOffset)
	// 	// newOffset = (pxToNumber(blackKeyWidth) * i) + 'px'; 
	// 	// setLeftOffset(newOffset)

	// 	// if(KEY_TYPE === 'black-key') {
	// 	// 	const width = getElementWidth(KEY_ID);
	// 	// 	const left = (pxToNumber(width) * i) + 'px'; 
	// 	// 	setLeftOffset(left)
	// 	// }

	// 	// if(KEY_TYPE === 'white-key') {
	// 	// 	const width = getBlackKeyWidth(KEY_ID);
	// 	// 	console.log('width', width)
	// 	// 	const left = width * i + 'px'; 
	// 	// 	setLeftOffset(left)
	// 	// }
		
	// }

	// =========================== Listen / Trigger ============== //
	useEffect(() => {
		onRender()
	}, [])

/*	useEffect(() => {
		onKeyWidthChange(width)
	}, [width])
*/
	// useEffect(() => {
	// 	updateKeyColorClass(isOver, isDown)
	// }, [isOver, isDown])

	// =========================== Output ======================== //
	return (  
		<div className={`key ${KEY_TYPE} ${keyColorClass}`} 
		id={KEY_ID}  
		style={{ 
			width: width,
			height: THIS_HEIGHT,
			left: leftOffset
		}}
		onMouseOver={onMouseOver}
		onMouseOut={onMouseOut}
		onMouseDown={onMouseDown}
		onMouseUp={onMouseUp}></div>
	)
}

/*  */