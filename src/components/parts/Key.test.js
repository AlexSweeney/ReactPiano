import React from 'react';
import { render } from 'react-dom'; 
import { act, isElementOfType } from 'react-dom/test-utils';  
import Key from './Key.jsx'; 
import {
	WHITE_KEY_WIDTHS,
	WHITE_OFFSET_TOTALS,
	BLACK_KEY_WIDTH,
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

// Key = escapes # automatically => need to use escaped for reference
const OCTAVE_KEYS_SHARP = [
	'C3', 'C\#3',  'D3', 'D\#3', 'E3',  'F3', 'F\#3', 'G3', 'G\#3', 'A3', 'A\#3', 'B3',
]

const OCTAVE_KEYS_FLAT = [
	'C3',  'Db3', 'D3',  'Eb3', 'E3', 'F3',  'Gb3', 'G3', 'A3', 'Bb3', 'B3',
]

const WHITE_KEYS = [
	'C3',  'D3',  'E3',  'F3',  'G3', 'A3', 'B3',
];

const SHARP_KEYS = [
	'C\#3', 'D\#3', 'E\#3', 'G\#3', 'A\#3',
];

const FLAT_KEYS = [
	'Cb3', 'Db3', 'Eb3', 'Gb3', 'Ab3',
];

const BLACK_KEYS = [
	...SHARP_KEYS,
	...FLAT_KEYS,
];

const ALL_KEYS = [
	...WHITE_KEYS,
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
	return `key-${keyName}`;
}

function getKeyType(keyName) { 
	if(keyName.indexOf('b') === -1 && keyName.indexOf('#') === -1) return 'white-key';
	if(keyName.indexOf('b') !== -1 || keyName.indexOf('#') != -1) return 'black-key';
} 
 
function renderKey(keyName = 'C3', props = {}) {  
	act(() => { render(<Key keyName={keyName} allKeys={OCTAVE_KEYS_SHARP} {...props}/>, keyContainer)})

	const keyId = getKeyId(keyName); 
 	const key = getElement(keyId);

 	triggerResize(key)

	return key;
}

function triggerResize(key) {
	// trigger setkeysize 
 		// => triggers updateKeyHeight() to set height in px
 		// => then triggers key fn() to set width based on new height 
 	act(() => { key.dispatchEvent(new CustomEvent("setkeysize", { bubbles: true })) })
}

function updateKeyHeight(id) {   
	const keyColor = getKeyType(id); 
	const element = getElement(id);
	const containerHeight = getElementHeight(keyContainer, 'number');  

	if(keyColor === 'white-key') {
		element.style.height = containerHeight + 'px';
	}

	if(keyColor === 'black-key') {
		element.style.height = containerHeight * 0.65 + 'px';
	} 
}

function getWhiteOffset(keyName) {
	const whiteKeyNum = WHITE_KEYS.indexOf(keyName);

	const previousWidths = WHITE_KEYS.map((keyName, i) => {
 		if(i < whiteKeyNum) {
 			if(i < 3)   return CONTAINER_HEIGHT * 0.2;
 			if(i >= 3)  return CONTAINER_HEIGHT * 0.21;
 		}
 		if(i >= whiteKeyNum) return null;
 	}).filter(val => val); 

 	const totalWidth = previousWidths.reduce((a, b) => a + b, 0);
 	return totalWidth;
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
				* set height of key that triggered event  manually
				* call fn() => sets width based on height
	*/
	const element = getElement(id);
 
	element.addEventListener('setkeysize', (e) => {  
		updateKeyHeight(e.srcElement.id)
	
		// call fn to update width based on new height
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

	describe('renderKey(keyName, props)', () => { 
			it('should render all keys', () => {
				ALL_KEYS.forEach(keyName => {  
					const key = renderKey(keyName);
					triggerResize(key)
					expect(isElementOfType(key, Key)) 
 				})
			})  
		it('should render when i value passed as prop', () => {
			OCTAVE_KEYS_FLAT.forEach((keyName, i) => {  
				const key = renderKey(keyName, {i});
				expect(isElementOfType(key, Key))  
			})

			OCTAVE_KEYS_SHARP.forEach((keyName, i) => {  
				const key = renderKey(keyName, {i});
				expect(isElementOfType(key, Key))  
			})  
		}) 
	}) 

	describe('updateKeyHeight() (called on render)', () => { 
		it('should set natural keys to 100% of container height', () => {
			WHITE_KEYS.forEach(keyName => {
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

	describe('getWhiteOffset()', () => {
		it('C D E should have offset of 0% / 20% / 40% / 60%  of container height', () => {
			const targetValues = {
				'C3' : 0,
				'D3' : 0.2,
				'E3' : 0.4,
				'F3' : 0.6,
			};

			for(const keyName in targetValues) {
				const key = renderKey(keyName);
				const value = getWhiteOffset(keyName);
				const target = CONTAINER_HEIGHT * targetValues[keyName];

				expect(value).toEqual(target)
			} 
		})

		it('F G A B should have offset of 81% / 102% / 123% of container height', () => {
			const targetValues = { 
				'G3' : 0.81,
				'A3' : 1.02,
				'B3' : 1.23,
			};

			for(const keyName in targetValues) {
				const key = renderKey(keyName);
				const value = getWhiteOffset(keyName);
				const target = CONTAINER_HEIGHT * targetValues[keyName];

				expect(value).toEqual(target)
			} 
		})
	})
})

// ============================================ on Render ==========================================//
describe('<Key>', () => {
	describe('on render', () => { 
		// passed unescaped # = should render

		describe('key color', () => {
			it('white keys should have class "white-key" and not "black-key', () => {
				WHITE_KEYS.forEach(keyName => {
					const key = renderKey(keyName);

					expect(key.className).toContain('white-key')
					expect(key.className).not.toContain('black-key')
				})  
			})

			it('black keys should have class "black-key" and not "white-key', () => {
				BLACK_KEYS.forEach(keyName => {
					const key = renderKey(keyName);

					expect(key.className).toContain('black-key')
					expect(key.className).not.toContain('white-key') 
				})  
			}) 
		})
		
		describe('cursor class', () => {
			it('should have class "key-out"', () => {
				ALL_KEYS.forEach(keyName => {
					const key = renderKey(keyName); 
					expect(key.className).toContain('key-out')
				}) 
			}) 
		})

		describe('size', () => {
			describe('white keys', () => {
				it('keys C D E: width should be 20% of container height', () => {
					['C3', 'D3', 'E3'].forEach(keyName => {
						const key = renderKey(keyName); 

						const keyHeight = getElementHeight(key, 'number');
						console.log('keyHeight', keyHeight)
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = CONTAINER_HEIGHT * 0.2;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					}) 
				}) 

				it('keys F G A B: width should be 21% of container height', () => {
					['F3', 'G3', 'A3', 'B3'].forEach(keyName => {
						const key = renderKey(keyName); 
						const keyWidth = getElementWidth(key, 'number');
						const targetHeight = CONTAINER_HEIGHT * 0.21;
				 		 
						expect(keyWidth).toEqual(targetHeight)
					})
				}) 

				it('height should be 100% container height', () => {
					WHITE_KEYS.forEach(keyName => { 
						const key = renderKey(keyName); 
						const keyHeight = getElementHeight(key);
				 		
				 		expect(CONTAINER_HEIGHT).toEqual(keyHeight)
					}) 
				})
			})

			describe('black keys', () => {
				it('width should be whiteHeight (100%) * WidthToHeight Ratio (blackWidth/whiteHeight)', () => {
					BLACK_KEYS.forEach(keyName => { 
						const key = renderKey(keyName);   
						const keyWidth = getElementWidth(key, 'number');
						const widthToHeightRatio = BLACK_KEY_WIDTH / 100;
				 		const targetKeyWidth = CONTAINER_HEIGHT * widthToHeightRatio; 

						expect(keyWidth).toEqual(targetKeyWidth) 
					}) 
				})

				it('height be 65% of container height', () => {
					BLACK_KEYS.forEach(keyName => {  
						const key = renderKey(keyName); 
						const keyHeight = getElementHeight(key, 'number');
						const targetHeight = CONTAINER_HEIGHT * 0.65;
				 		 
						expect(keyHeight).toEqual(targetHeight)
					})
				})
			})
		})  

		describe('offset', () => {
			describe.only('white keys => should have offset value of the total width of previous white keys', () => {
				WHITE_KEYS.forEach((keyName, whiteKeyI) => {
					/* 
						white keys have different widths 
							C D E = 20% of container height 
							F G A B = 21% of container height 
					*/   
					it(`${keyName} should have left of ${getWhiteOffset(keyName) + 'px'}`, () => {
						const i = OCTAVE_KEYS_SHARP.indexOf(keyName); 
						const key = renderKey(keyName, {i});  
						const keyLeft = key.style.left;	 

						const targetLeft = getWhiteOffset(keyName) + 'px';

						if(keyLeft !== targetLeft) console.log('ERROR', keyName)
					 	expect(keyLeft).toEqual(targetLeft)
					})   
				})
			})

			describe('black keys => should have offset value of i * black key width', () => {
				BLACK_KEYS.forEach((keyName, blackI) => {
					it(`${keyName} should have a left of ${(CONTAINER_HEIGHT *	BLACK_KEY_WIDTH) / 100}`, () => { 
						const i = OCTAVE_KEYS_SHARP.indexOf(keyName); 
						const key = renderKey(keyName, { i });  

						const keyLeft = key.style.left;	

						const keyWidth = (CONTAINER_HEIGHT *	BLACK_KEY_WIDTH) / 100;
						const targetLeft = keyWidth * i + 'px';
						
						expect(keyLeft).toEqual(targetLeft); 
					})
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
						const keyName = 'C3sharp';
						const key = renderKey(keyName); 

						container.style.width = '1000px';
						container.style.height = '1000px'; 
						act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

						const containerHeight = getElementHeight(container, 'number');  

						const keyWidth = getElementWidth(key, 'number');
						const widthToHeightRatio = BLACK_KEY_WIDTH / 100;
			 			const targetKeyWidth = containerHeight * widthToHeightRatio; 

			 			expect(containerHeight).toEqual(1000)
						expect(keyWidth).toEqual(targetKeyWidth) 
					})

					it('height should  be 65% of container height', () => { 
						const keyName = 'C3sharp';
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
						const keyName = 'C3sharp';
						const key = renderKey(keyName); 

						container.style.width = '100px';
						container.style.height = '100px'; 
						act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

						const containerHeight = getElementHeight(container, 'number');  

						const keyWidth = getElementWidth(key, 'number');
						const widthToHeightRatio = BLACK_KEY_WIDTH / 100;
			 			const targetKeyWidth = containerHeight * widthToHeightRatio; 

			 			expect(containerHeight).toEqual(100)
						expect(keyWidth).toEqual(targetKeyWidth) 
					})

					it('height should  be 65% of container height', () => { 
						const keyName = 'C3sharp';
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



