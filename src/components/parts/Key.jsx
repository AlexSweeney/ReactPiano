import React, {useState, useEffect} from 'react';
import { 
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
			
			* style.left: make keyboard 

		- on size change
			* white key 
				- height 100% of container height
				- width 20% of container height
			* black key 
				- height 65% of container height
				- width 5833333333333334% of container height

			* style.left: make keyboard
 
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
	const WHITE_WIDTH = 24;
	const BLACK_WIDTH = 14;

	const WHITE_HEIGHT = WHITE_WIDTH * 5;
	const BLACK_HEIGHT = WHITE_HEIGHT * 0.65;

	const THIS_HEIGHT = (KEY_TYPE === 'white-key') ? '100%' : '65%';

	// Height to width ratio percent in decimal
	const WHITE_HEIGHT_TO_WHITE_WIDTH = getDecimalRatio(WHITE_HEIGHT, WHITE_WIDTH);
	const BLACK_HEIGHT_TO_BLACK_WIDTH = getDecimalRatio(BLACK_HEIGHT, BLACK_WIDTH);

	const WHITE_HEIGHT_TO_BLACK_WIDTH = getDecimalRatio(WHITE_HEIGHT, BLACK_WIDTH);
	const BLACK_HEIGHT_TO_WHITE_WIDTH = getDecimalRatio(BLACK_WIDTH, WHITE_HEIGHT);
	  
 	const [width, setWidth] = useState(0); 
 	const [height, setHeight] = useState(THIS_HEIGHT);
	const [leftOffset, setLeftOffset] = useState(0);

	// ============= Color
	const [isOver, setIsOver] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [keyColorClass, setKeyColorClass] = useState('key-out');

	// =========================== Event Handlers ================== //
	function onRender() {  
		updateWidth()
		updateLeftOffset()
 
		triggerOnSizeChange(KEY_ID, onContainerSizeChange)   
	}

	function onContainerSizeChange() { 
		updateWidth()
		updateLeftOffset() 
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

	function getBlackKeyWidth() {
		const height = getElementHeight(KEY_ID, 'number'); 
		if(KEY_TYPE === 'white-key') return height * WHITE_HEIGHT_TO_BLACK_WIDTH;
		if(KEY_TYPE === 'black-key') return height * BLACK_HEIGHT_TO_BLACK_WIDTH;
	}
 
	function getLeftOffset(height) { 
		const thisWidth = getKeyWidth(); 

		if(KEY_TYPE === 'white-key') return Math.ceil(i / 2) * thisWidth;
		if(KEY_TYPE === 'black-key') return i * thisWidth;
	}

	function getRatioPercentage(a, b) {
		const percent = 100 / a;
		const ratio = b * percent;
		return ratio;
	}

	function getDecimalRatio(a, b) {
		return getRatioPercentage(a, b) / 100;
	}

	function updateKeyColorClass(isOver, isDown) {
		let newClass;

		if(isOver && !isDown) newClass = 'key-over';
		if(isOver && isDown) newClass = 'key-down';
		if(!isOver) newClass = 'key-out';

		setKeyColorClass(newClass)
	}

	function updateWidth() {
		const newWidth = getKeyWidth();
		setWidth(newWidth)
	}

	function updateLeftOffset() {
		const newOffset = getLeftOffset(); 
		setLeftOffset(newOffset)
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