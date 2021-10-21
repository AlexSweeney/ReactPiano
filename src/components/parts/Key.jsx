import React, {useState, useEffect} from 'react';
import {
	WHITE_KEY_WIDTHS,
	WHITE_OFFSET_TOTALS,
	BLACK_KEY_WIDTH,
	WHITE_HEIGHT,
	BLACK_HEIGHT,
} from './../settings/KeySizes.js';
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
	allKeys,
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
				 white key 
					* height 100% of container height
					* width 20% of container height

				* black key 
					* height 65% of container height
					* width = based on proportions from passed sizes
			
			* style.left: end of previous white key

		* on size change
			* white key 
				* height 100% of container height
				* width 20% of container height
			* black key 
				* height 65% of container height
				* width = based on proportions from passed sizes

			* style.left: i * black key width
 
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

	/*	TO DO 
		adjust black key offset to work from any key => get i from c 
	*/

	// =========================== const =========================== //    
	// ============= Ids
	const ID_KEY_NAME = keyName.replace('#', '\#');  // can't use # in ID for tests
	const KEY_ID = `key-${ID_KEY_NAME}`; 
	const KEY_TYPE = getKeyType(keyName);
	const KEY_LETTER = keyName[0];
	 
	// ============= Comparative Ratios
	const BLACK_HEIGHT_TO_WHITE_HEIGHT =  WHITE_HEIGHT / BLACK_HEIGHT; 

	const THIS_HEIGHT = (KEY_TYPE === 'white-key') ? '100%' : '65%'; 
	// const THIS_WIDTH_TO_WHITE_KEY_HEIGHT_RATIO = (KEY_TYPE === 'white-key') ? WHITE_KEY_WIDTHS[LETTER_NAME] / 100 : BLACK_KEY_WIDTH / 100;
  
  // ============= Styles	
 	const [width, setWidth] = useState(0); 
 	const [height, setHeight] = useState(THIS_HEIGHT);
	const [leftOffset, setLeftOffset] = useState(0);
	/*const KEY_STYLE = ;*/

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
		console.log('updateWidth ---------------')
		const newWidth = getKeyWidth();
		console.log('newWidth', newWidth)
		setWidth(newWidth)
	}

	function getKeyWidth(keyType = KEY_TYPE) {
		console.log('getThisKeyWidth -----------')
		const whiteKeyHeight = getWhiteKeyHeight();
		console.log('whiteKeyHeight', whiteKeyHeight)
		let thisWidth; 

		if(keyType === 'white-key') {
			thisWidth =  (whiteKeyHeight * WHITE_KEY_WIDTHS[KEY_LETTER]) / 100;
		}    
		if(keyType === 'black-key') {
			thisWidth = (whiteKeyHeight * BLACK_KEY_WIDTH) / 100;
		}

		return thisWidth;
	}

	function updateLeftOffset() {
		// console.log('updateLeftOffset -----------', KEY_ID)
		let newOffset; 

		if(KEY_TYPE === 'white-key') {
			const previousWhiteKeys = getPreviousWhiteKeys();
			const previousWhiteKeyWidths = previousWhiteKeys.map(whiteKey => {
				return getKeyWidth('white-key');
			}); 
			// console.log('previousWhiteKeys', previousWhiteKeys)
			// console.log('previousWhiteKeyWidths', previousWhiteKeyWidths)
			newOffset = previousWhiteKeyWidths.reduce((a, b) => a + b, 0); 
		}  

		if(KEY_TYPE === 'black-key') { 
			const thisWidth = getThisKeyWidth();
			// console.log('thisWidth', thisWidth)
			newOffset =  i * thisWidth;
		} 

	// 	console.log('newOffset', newOffset)
		setLeftOffset(newOffset)
	}

	function getPreviousWhiteKeys( ) {
		return allKeys.map((thisKeyName, thisI) => {
			const thisType = getKeyType(thisKeyName);
			if(thisI >= i) return null;
			if(thisType === 'black-key') return null;
			if(thisType === 'white-key') return thisKeyName; 
		}).filter(val => val)
	}

	

/*	function getThisKeyWidth() {
		if(KEY_TYPE === 'white-key') return getWhiteKeyWidth();  
		if(KEY_TYPE === 'black-key') return getBlackKeyWidth();  
	}*/

	/*function getThisKeyHeight() {
		const element = document.getElementById(KEY_ID)
		const height = getElementHeight(element, 'number');

		return height;
	} */

	/*function getWhiteKeyWidth(whiteKeyName) {  
		if(!whiteKeyName) {
			if(KEY_TYPE === 'black-key') throw new Error('called getWhiteKeyWidth() with a black key')
			if(KEY_TYPE === 'white-key') whiteKeyName = keyName;
		}

		const whiteKeyHeight = getWhiteKeyHeight();  
		const whiteKeyWidth = whiteKeyHeight * (WHITE_KEY_WIDTHS[whiteKeyName[0]]) / 100;
		return whiteKeyWidth;
	}

	function getBlackKeyWidth() {  
		const whiteKeyHeight = getWhiteKeyHeight();  
		return whiteKeyHeight * (THIS_WIDTH_TO_WHITE_KEY_HEIGHT_RATIO * 100) / 100;
	} */

	function getWhiteKeyHeight() {  
		const thisKeyHeight = getElementHeight(KEY_ID, 'number');  

		if(KEY_TYPE === 'white-key') return thisKeyHeight;
		if(KEY_TYPE === 'black-key')  return thisKeyHeight * (BLACK_HEIGHT_TO_WHITE_HEIGHT * 100) / 100; 
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
					key={KEY_ID}
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