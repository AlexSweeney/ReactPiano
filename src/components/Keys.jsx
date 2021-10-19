import React, { useEffect, useState } from 'react'; 
import Key from './parts/Key.jsx';
import {
	getElement,
	getElementWidth,
	pxToNumber,
	triggerOnSizeChange,
} from './utils.js';
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
			* width same as total white key width

		* on size change
			* width same as total white key width
	*/ 
	/* ======================== Constants ======================== */
	const KEYS_ID = 'keys';
	const [width, setWidth] = useState(0);

	/* ======================== Event Handlers =================== */
	function onRender() {
		// listenForWhiteKeyWidthChange() 
	}

	function onWhiteKeyWidthChange() { 
		updateKeysWidth()
	}
	/* ======================== Helper Fns ======================= */
	function listenForWhiteKeyWidthChange() {
		const keysElement = getElement(KEYS_ID);
		const whiteKeys = Array.from(keysElement.querySelectorAll('.white-key')); 
		whiteKeys.forEach(key => {
			triggerOnSizeChange(key.id, onWhiteKeyWidthChange) 
		})
	}

	function updateKeysWidth() {
		const newWidth = getWhiteKeysWidth();
		setWidth(newWidth)
	}

	function getWhiteKeys() {
		const keysElement = getElement(KEYS_ID);
		const whiteKeys = Array.from(keysElement.querySelectorAll('.white-key')); 
		return whiteKeys;
	}

	function getWhiteKeysWidth() {
		const whiteKeys = getWhiteKeys();

		const totalWidth = whiteKeys.reduce((tally, key) => {  
			const thisWidth = getElementWidth(key.id, 'number');  
			return tally + thisWidth;
		}, 0)

		return totalWidth;
	} 

	/* ======================== Listen / Trigger =================== */
  useEffect(() => {
  	onRender()
  }, [])

  /* ======================== Output ============================= */
	return(
		<div className="keys" id={KEYS_ID} style={{ width: width }}> 
			{
				keyNames.map((keyName, i) => {   
					return (
						<Key i={i}
							key={`key-${i}`}
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