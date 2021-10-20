import React from 'react';
import { render } from 'react-dom'; 
import { act, isElementOfType } from 'react-dom/test-utils';  
import Key from './Key.jsx'; 
import {
	WHITE_WIDTHS,
	WHITE_OFFSET_TOTALS,
	BLACK_WIDTH,
	WHITE_HEIGHT,
	BLACK_HEIGHT,
} from './../settings/KeySizes.js';

import { 
	getElement,
	getElementHeight,
	getElementWidth,
	pxToNumber,
	triggerOnSizeChange,
} from './../utils.js';

// ============================================ Vars =========================================================//
let key;
let keyContainer; 
const NATURAL_KEYS = [
	'C3',  'D3',  'E3',  'F3',  'G3', 'A3', 'B3',
];

const SHARP_KEYS = [
	'C#3', 'D#3', 'E#3', 'G#3', 'A#3',
];

const FLAT_KEYS = [
	'Cb3', 'Db3', 'Eb3', 'Gb3', 'Ab3',
];

const ALL_KEYS = [
	...NATURAL_KEYS,
	...SHARP_KEYS,
	...FLAT_KEYS,
];

const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500;

const KEY_CONTAINER_STYLES = {
	width:  `${CONTAINER_WIDTH}px`,
	height: `${CONTAINER_HEIGHT}px`, 
	resize: 'both',
	overflow: 'auto',
}; 

// ============================================ Helper Fns =============================================//
function addInlineStyles(element, stylesObject)  {
	Object.keys(stylesObject).forEach(key => {
		element.style[key] = stylesObject[key];
	})
}

function getKeyId(keyName) {
	const idKeyName = keyName.replace('#', 'sharp');
	return `key-${idKeyName}`;
}

function getKeyType(keyId) {
	const keyName = keyId.replace('sharp', '#'); 

	if(keyName.indexOf('b') === -1 && keyName.indexOf('#') === -1) return 'white-key';
	if(keyName.indexOf('b') !== -1 || keyName.indexOf('#') != -1) return 'black-key';
} 
 
function renderKey(keyName = 'C3', props = {}) {  
	act(() => { render(<Key keyName={keyName} {...props}/>, keyContainer)})

	const keyId = getKeyId(keyName);
 	updateKeyHeight(keyId)   

  const key = keyContainer.querySelector(`#${keyId}`);
	return key;
}

function updateKeyHeight(id) { 
	const keyColor = getKeyType(id); 
	const element = document.getElementById(id); 
	const containerHeight = getElementHeight(keyContainer, 'number');

	if(keyColor === 'white-key') {
		element.style.height = containerHeight + 'px';
	}

	if(keyColor === 'black-key') {
		element.style.height = containerHeight * 0.65 + 'px';
	} 
}

// ============================================ Mocks =============================================//
function mockTriggerOnSizeChange(id, fn) { 
	/*
		Real function 
			* listens for size change on id
			* calls fn() on size change

		Instance use
			* key height = 100% for white, 65% for black
			* key width = fn() call sets width based on height

		Mock function 
			* listens for setkeysize event
			* on resizekey event 
				* set height of key to height parent manually
				* call fn() => sets width based on height
	*/
 
	document.addEventListener('setkeysize', () => {  
		updateKeyHeight(id)
	
		// call width calculate fn
		fn()
	}) 
}

jest.mock('./../utils.js', () => { 
	const allUtils = jest.requireActual('./../utils.js');

	return {
		...allUtils,
		triggerOnSizeChange: mockTriggerOnSizeChange,
	} 
})

// ============================================ Set up / tear down ===============================//
beforeEach(() => {
	keyContainer = document.createElement('div');
	addInlineStyles(keyContainer, KEY_CONTAINER_STYLES) 
	document.body.appendChild(keyContainer); 
})

afterEach(() => {
	document.body.removeChild(keyContainer); 
	keyContainer = null;
})

// ============================================ prepare ============================================//
describe('test functions', () => {
	describe('keyContainer (test)', () => {
		it('should have inline styles from KEY_CONTAINER_STYLES object', () => {
			Object.keys(KEY_CONTAINER_STYLES).forEach(key => {
				expect(keyContainer.style[key]).toEqual(KEY_CONTAINER_STYLES[key])
			})
		})
	})

	describe('renderKey()', () => { 
		it('should render all keys', () => {
			ALL_KEYS.forEach(keyName => { 
				const key = renderKey(keyName);
				expect(isElementOfType(key, Key)) 
 			})
		})  
	}) 

	describe('updateKeyHeight() (called on render)', () => { 
		it('should set natural keys to 100% of container height', () => {
			NATURAL_KEYS.forEach(keyName => {
				const key = renderKey(keyName);
				const keyHeight = getElementHeight(key, 'number');

				expect(keyHeight).toEqual(CONTAINER_HEIGHT)
			})
		})

		it('should set sharp and flat keys to 65% of container height', () => {
			SHARP_KEYS.forEach(keyName => {
				const key = renderKey(keyName);
				const keyHeight = getElementHeight(key, 'number');

				expect(keyHeight).toEqual(CONTAINER_HEIGHT * 0.65)
			})

			FLAT_KEYS.forEach(keyName => {
				const key = renderKey(keyName);
				const keyHeight = getElementHeight(key, 'number');

				expect(keyHeight).toEqual(CONTAINER_HEIGHT * 0.65)
			})
		})
	})
})

// ============================================ on Render ==========================================//
describe('<Key>', () => {
	describe('on render', () => { 
		describe('key color', () => {
			it('should have class "white-key" if natural key', () => {
				const keyName = 'C3';
				const key = renderKey(keyName);
 				
 				// console.log(getElementWidth(key))
			 	// console.log(getElementHeight(key))

			 // const child = getElement('demo-key-child');
				// console.log(window.getComputedStyle(child))
			  // console.log(window.getComputedStyle(child))
			 // 	console.log(getElementWidth(child))
			 //	console.log(getElementHeight(child))

				// expect(key.className).toContain('white-key')
				// expect(key.className).not.toContain('black-key')
			})

			it('should have class "black-key" if flat key (b)', () => {
				const keyName = 'B3b';
				const key = renderKey(keyName); 

				expect(key.className).toContain('black-key')
				expect(key.className).not.toContain('white-key')
			})

			it('should have class "black-key" if sharp key (#)', () => {
				const keyName = 'C3#';
				const key = renderKey(keyName); 

				expect(key.className).toContain('black-key')
				expect(key.className).not.toContain('white-key')
			})	
		})
		
		describe('cursor class', () => {
			it('should have class "key-out"', () => {
				const keyName = 'C3';
				const key = renderKey(keyName);
		 
				expect(key.className).toContain('key-out')
			}) 
		})

		describe('size', () => {
			describe('white keys', () => {
				describe('keys C D E: width should be 20% of container height', () => {
					it('C', () => {
						const keyName = 'C3'; 
						const key = renderKey(keyName);

						const containerHeight = getElementHeight(container, 'number');
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = containerHeight * 0.2;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					})

					it('D', () => {
						const keyName = 'D3'; 
						const key = renderKey(keyName);

						const containerHeight = getElementHeight(container, 'number');
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = containerHeight * 0.2;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					})

					it('E', () => {
						const keyName = 'E3'; 
						const key = renderKey(keyName);

						const containerHeight = getElementHeight(container, 'number');
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = containerHeight * 0.2;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					})
				}) 

				describe('keys F G A B: width should be 21% of container height', () => {
					it('F', () => {
						const keyName = 'F3'; 
						const key = renderKey(keyName);

						const containerHeight = getElementHeight(container, 'number');
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = containerHeight * 0.21;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					})

					it('G', () => {
						const keyName = 'G3'; 
						const key = renderKey(keyName);

						const containerHeight = getElementHeight(container, 'number');
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = containerHeight * 0.21;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					})

					it('A', () => {
						const keyName = 'A3'; 
						const key = renderKey(keyName);

						const containerHeight = getElementHeight(container, 'number');
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = containerHeight * 0.21;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					})

					it('B', () => {
						const keyName = 'B3'; 
						const key = renderKey(keyName);

						const containerHeight = getElementHeight(container, 'number');
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = containerHeight * 0.21;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					})
				}) 

				it('height should be 100% container height', () => {
					const keyName = 'C3'; 
					const key = renderKey(keyName);

					const containerHeight = getElementHeight(container);
					const keyHeight = getElementHeight(key);
			 		
			 		expect(containerHeight).toEqual(keyHeight) 
				})
			})

			describe('black key', () => {
				it('width should be whiteHeight (100%) * WidthToHeight Ratio (blackWidth/whiteHeight)', () => {
					const keyName = 'C3#';
					const key = renderKey(keyName); 

					const containerHeight = getElementHeight(container, 'number');  

					const keyWidth = getElementWidth(key, 'number');
					const widthToHeightRatio = BLACK_WIDTH / 100;
			 		const targetKeyWidth = containerHeight * widthToHeightRatio; 

					expect(keyWidth).toEqual(targetKeyWidth) 
				})

				it('height be 65% of container height', () => {
					const keyName = 'C3#';
					const key = renderKey(keyName);

					const containerHeight = getElementHeight(container, 'number');
					
					const keyHeight = getElementHeight(key, 'number');
					const targetHeight = containerHeight * 0.65;
			 		 
					expect(keyHeight).toEqual(targetHeight)
				})
			})
		})  

		describe('offset', () => {
			describe('white keys => should have offset value of white key i * white key width (20% / 21% of height)', () => {
				it('C', () => {
					const keyName = 'C3';
					const i = 0;

					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number');
					const offsetTotal = WHITE_OFFSET_TOTALS[keyName[0]] / 100;
					const targetLeft = containerHeight * (offsetTotal * 100) / 100 + 'px';

					expect(keyLeft).toEqual(targetLeft); 
				})

				it('D', () => {
					const keyName = 'D3';
					const i = 2;
					
					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number');
					const offsetTotal = WHITE_OFFSET_TOTALS[keyName[0]] / 100;
					const targetLeft = containerHeight * (offsetTotal * 100) / 100 + 'px';

					expect(keyLeft).toEqual(targetLeft); 
				})

				it('E', () => {
					const keyName = 'E3';
					const i = 4;
					
					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number');
					const offsetTotal = WHITE_OFFSET_TOTALS[keyName[0]] / 100;
					const targetLeft = containerHeight * (offsetTotal * 100) / 100 + 'px';

					expect(keyLeft).toEqual(targetLeft);
				})

				it('F', () => {
					const keyName = 'F3';
					const i = 5;
					
					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number');
					const offsetTotal = WHITE_OFFSET_TOTALS[keyName[0]] / 100;
					const targetLeft = containerHeight * (offsetTotal * 100) / 100 + 'px';

					expect(keyLeft).toEqual(targetLeft); 
				})

				it('G', () => {
					const keyName = 'G3';
					const i = 7;
					
					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number');
					const offsetTotal = WHITE_OFFSET_TOTALS[keyName[0]] / 100;
					const targetLeft = containerHeight * (offsetTotal * 100) / 100 + 'px';

					expect(keyLeft).toEqual(targetLeft);  
				})

				it('A', () => {
					const keyName = 'A3';
					const i = 9;
					
					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number');
					const offsetTotal = WHITE_OFFSET_TOTALS[keyName[0]] / 100;
					const targetLeft = containerHeight * (offsetTotal * 100) / 100 + 'px';

					expect(keyLeft).toEqual(targetLeft); 
				})

				it('B', () => {
					const keyName = 'B3';
					const i = 11;
					
					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number');
					const offsetTotal = WHITE_OFFSET_TOTALS[keyName[0]] / 100;
					const targetLeft = containerHeight * (offsetTotal * 100) / 100 + 'px';

					expect(keyLeft).toEqual(targetLeft);   
				})
			})

			describe('black keys => should have offset value of i * black key width', () => {
				it('Db', () => { 
					const keyName = 'Db3';
					const i = 1;

					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number'); 
					const blackKeyWidth = (containerHeight * BLACK_WIDTH) / 100;
					const targetLeft = blackKeyWidth * i + 'px';

					expect(keyLeft).toEqual(targetLeft)
				})

				it('Eb', () => {   
					const keyName = 'Eb3';
					const i = 3;

					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number'); 
					const blackKeyWidth = (containerHeight * BLACK_WIDTH) / 100;
					const targetLeft = blackKeyWidth * i + 'px';

					expect(keyLeft).toEqual(targetLeft)
				})

				it('Gb', () => {  
					const keyName = 'Gb3';
					const i = 6;

					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number'); 
					const blackKeyWidth = (containerHeight * BLACK_WIDTH) / 100;
					const targetLeft = blackKeyWidth * i + 'px';

					expect(keyLeft).toEqual(targetLeft)  
				})

				it('Ab', () => {  
					const keyName = 'Ab3';
					const i = 8;

					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number'); 
					const blackKeyWidth = (containerHeight * BLACK_WIDTH) / 100;
					const targetLeft = blackKeyWidth * i + 'px';

					expect(keyLeft).toEqual(targetLeft)  
				})

				it('Bb', () => {  
					const keyName = 'Bb3';
					const i = 10;

					const key = renderKey(keyName, { i });  
					const keyLeft = key.style.left;

					const containerHeight = getElementHeight(container, 'number'); 
					const blackKeyWidth = (containerHeight * BLACK_WIDTH) / 100;
					const targetLeft = blackKeyWidth * i + 'px';

					expect(keyLeft).toEqual(targetLeft)
				})
			})
		})
	})

	describe('on size change', () => {
		describe('expand', () => {
			describe('white keys', () => {
				describe('width', () => {
					describe('keys C D E: width should be 20% of container height', () => {
						it('C', () => {
							const keyName = 'C3'; 
							const key = renderKey(keyName);

							container.style.width = '1000px';
							container.style.height = '1000px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.2;
					 		
					 		expect(containerHeight).toEqual(1000)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('D', () => {
							const keyName = 'D3'; 
							const key = renderKey(keyName);

							container.style.width = '1000px';
							container.style.height = '1000px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.2;
					 		
					 		expect(containerHeight).toEqual(1000)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('E', () => {
							const keyName = 'E3'; 
							const key = renderKey(keyName);

							container.style.width = '1000px';
							container.style.height = '1000px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.2;
					 		
					 		expect(containerHeight).toEqual(1000)
							expect(keyWidth).toEqual(targetHeight)
						})
					}) 

					describe('keys F G A B: width should be 21% of container height', () => {
						it('F', () => {
							const keyName = 'F3'; 
							const key = renderKey(keyName);

							container.style.width = '1000px';
							container.style.height = '1000px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.21;
					 		
					 		expect(containerHeight).toEqual(1000)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('G', () => {
							const keyName = 'G3'; 
							const key = renderKey(keyName);

							container.style.width = '1000px';
							container.style.height = '1000px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.21;
					 		
					 		expect(containerHeight).toEqual(1000)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('A', () => {
							const keyName = 'A3'; 
							const key = renderKey(keyName);

							container.style.width = '1000px';
							container.style.height = '1000px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.21;
					 		
					 		expect(containerHeight).toEqual(1000)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('B', () => {
							const keyName = 'B3'; 
							const key = renderKey(keyName);

							container.style.width = '1000px';
							container.style.height = '1000px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.21;
					 		
					 		expect(containerHeight).toEqual(1000)
							expect(keyWidth).toEqual(targetHeight)
						})
					}) 
				}) 
				
				describe('height', () => {
					it('height should be 100% container height', () => {
						const keyName = 'C3'; 
						const key = renderKey(keyName);

						container.style.width = '1000px';
						container.style.height = '1000px'; 
						act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

						const containerHeight = getElementHeight(container, 'number');
						const keyHeight = getElementHeight(key, 'number');
				 		
				 		expect(containerHeight).toEqual(1000)
				 		expect(containerHeight).toEqual(keyHeight) 
					})
				}) 
			})

			describe('black keys', () => {
				describe('black key', () => {
					it('width should be whiteHeight (100%) * WidthToHeight Ratio (blackWidth/whiteHeight)', () => {
						const keyName = 'C3#';
						const key = renderKey(keyName); 

						container.style.width = '1000px';
						container.style.height = '1000px'; 
						act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

						const containerHeight = getElementHeight(container, 'number');  

						const keyWidth = getElementWidth(key, 'number');
						const widthToHeightRatio = BLACK_WIDTH / 100;
			 			const targetKeyWidth = containerHeight * widthToHeightRatio; 

			 			expect(containerHeight).toEqual(1000)
						expect(keyWidth).toEqual(targetKeyWidth) 
					})

					it('height should  be 65% of container height', () => { 
						const keyName = 'C3#';
						const key = renderKey(keyName);

						container.style.width = '1000px';
						container.style.height = '1000px'; 
						act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

						const containerHeight = getElementHeight(container, 'number');
					
						const keyHeight = getElementHeight(key, 'number');
						const targetHeight = containerHeight * 0.65;
			 		 	
			 		 	expect(containerHeight).toEqual(1000)
						expect(keyHeight).toEqual(targetHeight) 
					})
				})
			}) 
		})

		describe('shrink', () => {
			describe('white keys', () => {
				describe('width', () => {
					describe('keys C D E: width should be 20% of container height', () => {
						it('C', () => {
							const keyName = 'C3'; 
							const key = renderKey(keyName);

							container.style.width = '100px';
							container.style.height = '100px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.2;
					 		
					 		expect(containerHeight).toEqual(100)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('D', () => {
							const keyName = 'D3'; 
							const key = renderKey(keyName);

							container.style.width = '100px';
							container.style.height = '100px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.2;
					 		
					 		expect(containerHeight).toEqual(100)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('E', () => {
							const keyName = 'E3'; 
							const key = renderKey(keyName);

							container.style.width = '100px';
							container.style.height = '100px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.2;
					 		
					 		expect(containerHeight).toEqual(100)
							expect(keyWidth).toEqual(targetHeight)
						})
					}) 

					describe('keys F G A B: width should be 21% of container height', () => {
						it('F', () => {
							const keyName = 'F3'; 
							const key = renderKey(keyName);

							container.style.width = '100px';
							container.style.height = '100px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.21;
					 		
					 		expect(containerHeight).toEqual(100)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('G', () => {
							const keyName = 'G3'; 
							const key = renderKey(keyName);

							container.style.width = '100px';
							container.style.height = '100px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.21;
					 		
					 		expect(containerHeight).toEqual(100)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('A', () => {
							const keyName = 'A3'; 
							const key = renderKey(keyName);

							container.style.width = '100px';
							container.style.height = '100px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.21;
					 		
					 		expect(containerHeight).toEqual(100)
							expect(keyWidth).toEqual(targetHeight)
						})

						it('B', () => {
							const keyName = 'B3'; 
							const key = renderKey(keyName);

							container.style.width = '100px';
							container.style.height = '100px'; 
							act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

							const containerHeight = getElementHeight(container, 'number');
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = containerHeight * 0.21;
					 		
					 		expect(containerHeight).toEqual(100)
							expect(keyWidth).toEqual(targetHeight)
						})
					})  
				})

				describe('height', () => {
					it('height should be 100% container height', () => {
						const keyName = 'C3'; 
						const key = renderKey(keyName);

						container.style.width = '100px';
						container.style.height = '100px'; 
						act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

						const containerHeight = getElementHeight(container, 'number');
						const keyHeight = getElementHeight(key, 'number');
				 		
				 		expect(containerHeight).toEqual(100)
				 		expect(containerHeight).toEqual(keyHeight) 
					}) 
				}) 
			})

			describe('black keys', () => {
				describe('black key', () => {
					it('width should be whiteHeight (100%) * WidthToHeight Ratio (blackWidth/whiteHeight)', () => {
						const keyName = 'C3#';
						const key = renderKey(keyName); 

						container.style.width = '100px';
						container.style.height = '100px'; 
						act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

						const containerHeight = getElementHeight(container, 'number');  

						const keyWidth = getElementWidth(key, 'number');
						const widthToHeightRatio = BLACK_WIDTH / 100;
			 			const targetKeyWidth = containerHeight * widthToHeightRatio; 

			 			expect(containerHeight).toEqual(100)
						expect(keyWidth).toEqual(targetKeyWidth) 
					})

					it('height should  be 65% of container height', () => { 
						const keyName = 'C3#';
						const key = renderKey(keyName);

						container.style.width = '100px';
						container.style.height = '100px'; 
						act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

						const containerHeight = getElementHeight(container, 'number');
					
						const keyHeight = getElementHeight(key, 'number');
						const targetHeight = containerHeight * 0.65;
			 		 	
			 		 	expect(containerHeight).toEqual(100)
						expect(keyHeight).toEqual(targetHeight) 
					})
				})
			}) 
		}) 
	})

	describe('on over', () => {
		it('should have class "key-over"', () => {
			const keyName = 'C3';
			const key = renderKey(keyName);   
	 
			act(() => { Simulate.mouseOver(key) })
	  	expect(key.className).toContain('key-over') 
		})

		it('should call handleOver function', () => {
			const handleOver = jest.fn();
			const keyName = 'C3';
			const key = renderKey(keyName, {handleOver}); 

			act(() => { Simulate.mouseOver(key) })
			expect(handleOver).toHaveBeenCalled()
		})
	})

	describe('on out', () => {
		describe('mouse up', () => {
			it('should have class "key-out"', () => {
				const keyName = 'C3';
				const handleOver = jest.fn();
				const key = renderKey(keyName, {handleOver});   
		 	
		 		act(() => { Simulate.mouseOver(key) })
				act(() => { Simulate.mouseOut(key) })
		  	expect(key.className).toContain('key-out') 
			}) 
		})

		describe('mouse down', () => {
			it('should have class "key-out"', () => {
				const keyName = 'C3';
				const handleOver = jest.fn();
				const key = renderKey(keyName, {handleOver}); 
		 		
		 		act(() => { Simulate.mouseOver(key) })
		 		act(() => { Simulate.mouseDown(key) })
				act(() => { Simulate.mouseOut(key) })
		  	expect(key.className).toContain('key-out') 
			})	
		})
		
		it('should call handleOut function', () => {
				const keyName = 'C3';
				const handleOut = jest.fn();
				const key = renderKey(keyName, {handleOut});  

				act(() => { Simulate.mouseOver(key) })
				act(() => { Simulate.mouseOut(key) })
				expect(handleOut).toHaveBeenCalled()
			}) 
	})

	describe('on down', () => {
		it('should have class "key-down"', () => {
			const keyName = 'C3';
			const handleOver = jest.fn();
			const key = renderKey(keyName, {handleOver});   
	 	
	 		act(() => { Simulate.mouseOver(key) })
			act(() => { Simulate.mouseDown(key) })
	  	expect(key.className).toContain('key-down') 
		}) 
		 
		it('should call handleDown function', () => {
				const keyName = 'C3';
				const handleDown = jest.fn();
				const key = renderKey(keyName, {handleDown});  

				act(() => { Simulate.mouseOver(key) })
				act(() => { Simulate.mouseDown(key) })
				expect(handleDown).toHaveBeenCalled()
			}) 
	})

	describe('on up', () => {
		describe('on mouse over', () => {
			it('should have class "key-over"', () => {
				const keyName = 'C3'; 
				const key = renderKey(keyName);    

				act(() => { Simulate.mouseOver(key) })
				act(() => { Simulate.mouseDown(key) })
				act(() => { Simulate.mouseUp(key) })

		  	expect(key.className).toContain('key-over') 
			}) 
		})

		describe('on mouse out', () => {
			it('should have class "key-out"', () => {
				const keyName = 'C3'; 
				const key = renderKey(keyName);    
				
				act(() => { Simulate.mouseOver(key) })
				act(() => { Simulate.mouseDown(key) }) 
				act(() => { Simulate.mouseOut(key) })
				act(() => { Simulate.mouseUp(key) })

		  	expect(key.className).toContain('key-out') 
			}) 
		}) 
	})
})



