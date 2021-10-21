import React from 'react';
import { render } from 'react-dom'; 
import { act } from 'react-dom/test-utils';  
import Key from './parts/Key.jsx';

// ====================================== Consts ====================================== //
export const UNESCAPED_SHARP_KEYS = [
	'C3', 'C#3',  'D3', 'D#3', 'E3',  'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
];

// Key = escapes # automatically => need to use escaped for reference
export const OCTAVE_KEYS_SHARP = [
	'C3', 'C\#3',  'D3', 'D\#3', 'E3',  'F3', 'F\#3', 'G3', 'G\#3', 'A3', 'A\#3', 'B3',
];

export const OCTAVE_KEYS_UNESCAPED_SHARP = [
	'C3', 'C#3',  'D3', 'D#3', 'E3',  'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
];

export const OCTAVE_KEYS_FLAT = [
	'C3',  'Db3', 'D3',  'Eb3', 'E3', 'F3',  'Gb3', 'G3', 'A3', 'Bb3', 'B3',
];

export const WHITE_KEYS = [
	'C3',  'D3',  'E3',  'F3',  'G3', 'A3', 'B3',
];

export const SHARP_KEYS = [
	'C\#3', 'D\#3', 'E\#3', 'G\#3', 'A\#3',
];

export const FLAT_KEYS = [
	'Cb3', 'Db3', 'Eb3', 'Gb3', 'Ab3',
];

export const BLACK_KEYS = [
	...SHARP_KEYS,
	...FLAT_KEYS,
];

export const ALL_KEYS = [
	...WHITE_KEYS,
	...SHARP_KEYS,
	...FLAT_KEYS,
];

// ====================================== Fns ========================================== //
export function addInlineStyles(element, stylesObject)  {
	Object.keys(stylesObject).forEach(key => {
		element.style[key] = stylesObject[key];
	})
}

export function getKeyId(keyName) { 
	return `key-${keyName}`;
}

export function renderKey(container, keyName = 'C3', props = {}) {  
	act(() => { render(<Key keyName={keyName} allKeys={OCTAVE_KEYS_SHARP} {...props}/>, container)})

	const keyId = getKeyId(keyName); 
 	const key = getElement(keyId);

 	triggerKeyResize(key)

	return key;
} 

export function triggerKeyResize(key) {
	// trigger setkeysize 
 		// => triggers updateKeyHeight() to set height in px
 		// => then triggers key fn() to set width based on new height 
 	act(() => { key.dispatchEvent(new CustomEvent("setkeysize", { bubbles: true })) })
} 

export function getWhiteOffset(keyName, containerHeight) {
	const whiteKeyNum = WHITE_KEYS.indexOf(keyName);
   
	const previousWidths = WHITE_KEYS.map((keyName, i) => {
 		if(i < whiteKeyNum) {
 			if(i <  3)  return containerHeight * 0.2;
 			if(i >= 3)  return containerHeight * 0.21;
 		}
 		if(i >= whiteKeyNum) return null;
 	}).filter(val => val); 

 	const totalWidth = previousWidths.reduce((a, b) => a + b, 0);
 	return totalWidth;
}

export function resizeElement(element, newWidth, newHeight) {
	newHeight = (typeof(newHeight) === 'number') ? newHeight + 'px' : newHeight;
	newWidth  = (typeof(newWidth) === 'number')  ? newWidth + 'px' : newWidth;

	element.style.width = newWidth;
	element.style.height = newHeight;
}