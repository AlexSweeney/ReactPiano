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
			
			- size
				- white key 
					* height 100% of container height
					* width 20% of container height

				- black key 
					* height 65% of container height
					* height 5833333333333334% of container height
			
			- style.left: make keyboard 

		- on size change
			- white key 
				- height 100% of container height
				- width 20% of container height
			- black key 
				- height 65% of container height
				- width 5833333333333334% of container height

			- style.left: make keyboard
 
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
	const KEY_NAME = keyName[0];
	 
	// ============= Size Numbers - use for width as percentage of container heigh
	const WHITE_WIDTHS = {
		'C' : 20,  
		'D' : 20,  
		'E' : 20, 
		'F' : 21, 
		'G' : 21, 
		'A' : 21, 
		'B' : 21, 
	}

	const WHITE_OFFSET_TOTALS = {
		'C' : 0,
		'D' : 20,
		'E' : 40,
		'F' : 60,
		'G' : 81,
		'A' : 102,
		'B' : 123,
	}

	const BLACK_WIDTH = 12;

	// ============= Height Percentages
	const WHITE_HEIGHT = 1;
	const BLACK_HEIGHT = 0.65;

	// ============= Comparative Ratios
	const BLACK_HEIGHT_TO_WHITE_HEIGHT =  WHITE_HEIGHT / BLACK_HEIGHT;

	const THIS_HEIGHT = (KEY_TYPE === 'white-key') ? '100%' : '65%'; 
	const THIS_WIDTH_TO_WHITE_KEY_HEIGHT_RATIO = (KEY_TYPE === 'white-key') ? WHITE_WIDTHS[KEY_NAME] / 100 : BLACK_WIDTH / 100;
  
  // ============= Styles	
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

	function updateWidth() {
		const newWidth = getThisKeyWidth();
		setWidth(newWidth)
	}

	function updateLeftOffset() {
		const newOffset = getLeftOffset();  
		setLeftOffset(newOffset)
	}

	function getThisKeyWidth() {
		if(KEY_TYPE === 'white-key') return getWhiteKeyWidth();  
		if(KEY_TYPE === 'black-key') return getBlackKeyWidth();  
	}

	function getThisKeyHeight() {
		return getElementHeight(KEY_ID, 'number');
	} 

	function getWhiteKeyWidth() { 
		const whiteKeyHeight = getWhiteKeyHeight();  
		return whiteKeyHeight * (THIS_WIDTH_TO_WHITE_KEY_HEIGHT_RATIO * 100) / 100;
	}

	function getBlackKeyWidth() {  
		const whiteKeyHeight = getWhiteKeyHeight();  
		return whiteKeyHeight * (THIS_WIDTH_TO_WHITE_KEY_HEIGHT_RATIO * 100) / 100;
	} 

	function getWhiteKeyHeight() { 
		const thisKeyHeight = getThisKeyHeight(); 

		if(KEY_TYPE === 'white-key') return thisKeyHeight;
		if(KEY_TYPE === 'black-key')  return thisKeyHeight * (BLACK_HEIGHT_TO_WHITE_HEIGHT * 100) / 100; 
	}
 
	function getLeftOffset() {
		if(KEY_TYPE === 'white-key') return getOffsetForWhiteKey()  
		if(KEY_TYPE === 'black-key') return getOffsetForBlackKey() 
	} 

	function getOffsetForWhiteKey() {
		const whiteKeyHeight = getThisKeyHeight();
		const offsetTotal = WHITE_OFFSET_TOTALS[KEY_NAME] / 100;
		return whiteKeyHeight * (offsetTotal * 100) / 100; 
	}

	function getOffsetForBlackKey() {
		const blackKeyWidth = getThisKeyWidth();
		return i * blackKeyWidth;
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
				<div className={`key ${KEY_TYPE} ${keyColorClass}`} 
					id={KEY_ID}  
					key={KEY_NAME}
					style={{ 
						width: width,
						height: THIS_HEIGHT,
						left: leftOffset
					}}
					onMouseOver={onMouseOver}
					onMouseOut={onMouseOut}
					onMouseDown={onMouseDown}
					onMouseUp={onMouseUp}>
				</div> 
		) 
} 