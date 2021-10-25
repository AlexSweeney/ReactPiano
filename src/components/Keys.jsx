import React, { useEffect, useState } from 'react'; 
import Key from './parts/Key.jsx';
import {
	getElement,
	getElementWidth,
	getElementHeight,
	pxToNumber,
	triggerOnSizeChange,  
} from './utils.js';
import {
	WHITE_KEY_WIDTH_RATIOS,
	BLACK_KEY_WIDTH_RATIO,
	WHITE_KEY_HEIGHT_PERCENT,
	BLACK_KEY_HEIGHT_PERCENT,
} from './settings/KeySizes.js';

import './Keys.css';

export default function Keys({
	keyNames = [], 
	handleOver = () => {}, 
	handleOut  = () => {}, 
	handleDown = () => {},
}) {
	/* ======================== <Keys> =========================== */
	/*
		* on render 
			* make key element for every keyName
			- pass width, height and left to each key
			- set keys width same as total white key width

		* on size change
			- pass width, height and left to each key
			- set keys width same as total white key width
	*/ 
	/* ======================== Constants ======================== */
	const KEYS_HEIGHT = 100;
	const KEYS_ID = 'keys';
	const [width, setWidth] = useState(0); 
	const initialKeyStyles = makeKeyStyles(keyNames);
	// console.log('initialKeyStyles', initialKeyStyles)
	const [keyStyles, setKeyStyles] = useState(initialKeyStyles);
	

	/* ======================== Event Handlers =================== */
	function onRender() {
		// const initialKeyStyles = makeKeyStyles(keyNames);
		// setKeyStyles(initialKeyStyles);

		// updateKeysWidth()
		// listenForWhiteKeyWidthChange() 
	}

	// function onWhiteKeyWidthChange() { 
	// 	updateKeysWidth()
	// }
	/* ======================== Helper Fns ======================= */
	/*function listenForWhiteKeyWidthChange() {
		const keysElement = getElement(KEYS_ID);
		const whiteKeys = Array.from(keysElement.querySelectorAll('.white-key')); 
		whiteKeys.forEach(key => {
			triggerOnSizeChange(key.id, onWhiteKeyWidthChange) 
		})
	}*/

	function makeKeyStyles(keyNames) {
		return keyNames.map((keyName, i) => {
			return (
				{
					keyName: keyName,
					keyType: getKeyType(keyName),
					width: getKeyWidth(keyName) + 'px',
					height: getKeyHeight(keyName) + '%',
					left: getKeyLeft(keyName, i) + 'px',
				}
			)
		})
	}

	function getKeyType(keyName) {
		if (keyName.indexOf('b') === -1 && keyName.indexOf('#') === -1) return 'white';
		if (keyName.indexOf('b') !== -1 || keyName.indexOf('#') != -1) return 'black';
	}

	function getKeyWidth(keyName) {
		const type = getKeyType(keyName);
		const keyLetter = keyName[0];
		const containerHeight = KEYS_HEIGHT; 

		const widthRatio = (type === 'white') ? WHITE_KEY_WIDTH_RATIOS[keyLetter] : BLACK_KEY_WIDTH_RATIO; 
		return containerHeight * widthRatio;
	}

	function getKeyHeight(keyName) {
		const type = getKeyType(keyName);

		if(type === 'white') return WHITE_KEY_HEIGHT_PERCENT;
		if(type === 'black') return BLACK_KEY_HEIGHT_PERCENT;
	}

	function getKeyLeft(keyName, i) { 
		const type = getKeyType(keyName);
		let left = 0;

		if(type === 'white') {
			const previousKeys = keyNames.filter((name, x) => x < i);
			const previousWhiteKeys = previousKeys.filter((name) => getKeyType(name) === 'white'); 
			previousWhiteKeys.forEach(name => {
				left += getKeyWidth(name);
			}) 
		}  

		if(type === 'black') { 
			const blackKeyWidth = getKeyWidth(keyName); 
			left = i * blackKeyWidth; 
		} 
 		
 		return left;
	} 

	// function updateKeysWidth() {
	// 	const newWidth = getWhiteKeysWidth();
	// 	setWidth(newWidth)
	// }

	// function getWhiteKeys() {
	// 	const keysElement = getElement(KEYS_ID);
	// 	const whiteKeys = Array.from(keysElement.querySelectorAll('.white-key')); 
	// 	return whiteKeys;
	// }

	// function getWhiteKeysWidth() {
	// 	const whiteKeys = getWhiteKeys();

	// 	const totalWidth = whiteKeys.reduce((tally, key) => {  
	// 		const thisWidth = getElementWidth(key.id, 'number');  
	// 		return tally + thisWidth;
	// 	}, 0)

	// 	return totalWidth;
	// } 

	/* ======================== Listen / Trigger =================== */
  useEffect(() => {
  	onRender()
  }, [])

  /* ======================== Output ============================= */
	return(
		<div className="keys" id={KEYS_ID} style={{ width: width, height: KEYS_HEIGHT + 'px' }}> 
			{
				keyNames.map((keyName, i) => {   
					return (
						<Key i={i} 
							key={`key-${i}`}
							keyType={keyStyles[i].keyType}
							width={keyStyles[i].width}
							height={keyStyles[i].height}
							left={keyStyles[i].left}
							keyName={keyName} 
							handleOver={handleOver} 
							handleOut={handleOut}
							handleDown={handleDown}
						/>
					)
				})
			}
		</div>
	)
} 