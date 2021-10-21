import React from 'react';
import { render } from 'react-dom'; 
import { act, Simulate, isElementOfType } from 'react-dom/test-utils';  
import Key from './Key.jsx'; 
import {
	WHITE_KEY_WIDTHS,
	WHITE_OFFSET_TOTALS,
	BLACK_KEY_WIDTH,
	WHITE_HEIGHT,
	BLACK_HEIGHT,
} from './../settings/KeySizes.js';

import { 
	getKeyType,
	getElement,
	getElementHeight,
	getElementWidth,
	pxToNumber,
	triggerOnSizeChange,
} from './../utils.js';

// ============================================ Vars =========================================================//
let key;
let container;

const UNESCAPED_SHARP_KEYS = [
	'C3', 'C#3',  'D3', 'D#3', 'E3',  'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
];

// Key = escapes # automatically => need to use escaped for reference
const OCTAVE_KEYS_SHARP = [
	'C3', 'C\#3',  'D3', 'D\#3', 'E3',  'F3', 'F\#3', 'G3', 'G\#3', 'A3', 'A\#3', 'B3',
];

const OCTAVE_KEYS_FLAT = [
	'C3',  'Db3', 'D3',  'Eb3', 'E3', 'F3',  'Gb3', 'G3', 'A3', 'Bb3', 'B3',
];

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
 
function renderKey(keyName = 'C3', props = {}) {  
	act(() => { render(<Key keyName={keyName} allKeys={OCTAVE_KEYS_SHARP} {...props}/>, container)})

	const keyId = getKeyId(keyName); 
 	const key = getElement(keyId);

 	triggerKeyResize(key)

	return key;
}

function triggerKeyResize(key) {
	// trigger setkeysize 
 		// => triggers updateKeyHeight() to set height in px
 		// => then triggers key fn() to set width based on new height 
 	act(() => { key.dispatchEvent(new CustomEvent("setkeysize", { bubbles: true })) })
} 

function getWhiteOffset(keyName) {
	const whiteKeyNum = WHITE_KEYS.indexOf(keyName);

	const previousWidths = WHITE_KEYS.map((keyName, i) => {
 		if(i < whiteKeyNum) {
 			if(i <  3)  return CONTAINER_HEIGHT * 0.2;
 			if(i >= 3)  return CONTAINER_HEIGHT * 0.21;
 		}
 		if(i >= whiteKeyNum) return null;
 	}).filter(val => val); 

 	const totalWidth = previousWidths.reduce((a, b) => a + b, 0);
 	return totalWidth;
}

function resizeContainer(newWidth, newHeight) {
	newHeight = (typeof(newHeight) === 'number') ? newHeight + 'px' : newHeight;
	newWidth  = (typeof(newWidth) === 'number')  ? newWidth + 'px' : newWidth;

	container.style.width = newWidth;
	container.style.height = newHeight;
}

// ============================================ Mocks =============================================//
jest.mock('./../utils.js'); 

// ============================================ Set up / tear down ===============================//
beforeEach(() => {
	container = document.createElement('div');
	container.id = 'container';
	addInlineStyles(container, KEY_CONTAINER_STYLES) 
	document.body.appendChild(container); 
})

afterEach(() => {
	document.body.removeChild(container); 
	container = null;
})

// ============================================ prepare ============================================//
describe('test functions', () => {
	describe('container (test)', () => {
		it('should have inline styles from KEY_CONTAINER_STYLES object', () => {
			Object.keys(KEY_CONTAINER_STYLES).forEach(key => {
				expect(container.style[key]).toEqual(KEY_CONTAINER_STYLES[key])
			})
		})
	})

	describe('renderKey(keyName, props)', () => { 
		describe('should render all keys', () => {
			ALL_KEYS.forEach(keyName => {  
				it(`${keyName}`, () => {
					const key = renderKey(keyName);
					expect(isElementOfType(key, Key)) 
				})
			})
		})  

		describe('should render when i value passed as prop', () => {
			describe('octave using flat keys', () => {
				OCTAVE_KEYS_FLAT.forEach((keyName, i) => {  
					it(`${keyName}`, () => {
						const key = renderKey(keyName, {i});
						expect(isElementOfType(key, Key))  
					}) 
				})
			})

			describe('octave using sharp keys', () => {
				OCTAVE_KEYS_SHARP.forEach((keyName, i) => {  
					it(`${keyName}`, () => {
						const key = renderKey(keyName, {i});
						expect(isElementOfType(key, Key))  
					}) 
				})  	
			}) 
		}) 
	}) 

	describe('updateKeyHeight() (called on render)', () => { 
		describe('should set natural keys to 100% of container height', () => {
			WHITE_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const key = renderKey(keyName);
					const keyHeight = getElementHeight(key, 'number');

					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
				}) 
			})
		})

		describe('should set sharp and flat keys to 65% of container height', () => {
			SHARP_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const key = renderKey(keyName);
					const keyHeight = getElementHeight(key, 'number');

					expect(keyHeight).toEqual(CONTAINER_HEIGHT * 0.65)
				})
			})

			FLAT_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const key = renderKey(keyName);
					const keyHeight = getElementHeight(key, 'number');

					expect(keyHeight).toEqual(CONTAINER_HEIGHT * 0.65)
				})
			})
		})
	})

	describe('getWhiteOffset()', () => {
		describe('C D E should have offset of 0% / 20% / 40% / 60%  of container height', () => {
			const targetValues = {
				'C3' : 0,
				'D3' : 0.2,
				'E3' : 0.4,
				'F3' : 0.6,
			};

			for(const keyName in targetValues) {
				it(`${keyName}`, () => {
					const key = renderKey(keyName);
					const value = getWhiteOffset(keyName);
					const target = CONTAINER_HEIGHT * targetValues[keyName];

					expect(value).toEqual(target)
				}) 
			} 
		})

		describe('F G A B should have offset of 81% / 102% / 123% of container height', () => {
			const targetValues = { 
				'G3' : 0.81,
				'A3' : 1.02,
				'B3' : 1.23,
			};

			for(const keyName in targetValues) {
				it(`${keyName}`, () => {
					const key = renderKey(keyName);
					const value = getWhiteOffset(keyName);
					const target = CONTAINER_HEIGHT * targetValues[keyName];

					expect(value).toEqual(target)
				})
			} 
		})
	})

	describe('resizeContainer()', () => {
		describe('passed string', () => {
			it('should expand container', () => {
				const newWidth = '2000px';
				const newHeight = '2000px'; 
				resizeContainer(newWidth, newHeight)

				const containerHeight = getElementHeight(container);
				const containerWidth = getElementWidth(container);

				expect(containerWidth).toEqual(newWidth)
				expect(containerHeight).toEqual(newHeight)
			})

			it('should shrink container', () => {
				const newWidth = '100px';
				const newHeight = '100px'; 
				resizeContainer(newWidth, newHeight)

				const containerHeight = getElementHeight(container);
				const containerWidth = getElementWidth(container);

				expect(containerWidth).toEqual(newWidth)
				expect(containerHeight).toEqual(newHeight)
			})
		})

		describe('passed number', () => {
			it('should shrink container', () => {
				const newWidth = 100;
				const newHeight = 100;
				resizeContainer(newWidth, newHeight)

				const containerHeight = getElementHeight(container, 'number');
				const containerWidth = getElementWidth(container, 'number');

				expect(containerWidth).toEqual(newWidth)
				expect(containerHeight).toEqual(newHeight)
			})

			it('should shrink container', () => {
				const newWidth = 2000;
				const newHeight = 2000;
				resizeContainer(newWidth, newHeight)

				const containerHeight = getElementHeight(container, 'number');
				const containerWidth = getElementWidth(container, 'number');

				expect(containerWidth).toEqual(newWidth)
				expect(containerHeight).toEqual(newHeight)
			})
		}) 
	})
})

// ============================================ on Render ==========================================//
describe('<Key>', () => {
	describe('render', () => {
		describe('white keys', () => {
			WHITE_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const key = renderKey(keyName);
					expect(isElementOfType(key, Key))  
				})
			})
		})

		describe('sharp keys', () => {
			describe('unescaped # character', () => {
				UNESCAPED_SHARP_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {
						const key = renderKey(keyName);
						expect(isElementOfType(key, Key))  
					})
				})
			})

			describe('escaped # character', () => {
				SHARP_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {
						const key = renderKey(keyName);
						expect(isElementOfType(key, Key))  
					})
				})
			})
		})

		describe('flat keys', () => {
			FLAT_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const key = renderKey(keyName);
					expect(isElementOfType(key, Key))  
				})
			})
		})
	})

	describe('on render', () => {  
		describe('key color', () => {
			describe('white keys should have class "white-key" and not "black-key', () => {
				WHITE_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {
						const key = renderKey(keyName);

						expect(key.className).toContain('white-key')
						expect(key.className).not.toContain('black-key')
					}) 
				})  
			})

			describe('black keys should have class "black-key" and not "white-key', () => {
				BLACK_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {
						const key = renderKey(keyName);

						expect(key.className).toContain('black-key')
						expect(key.className).not.toContain('white-key') 
					})
				})  
			}) 
		})
		
		describe('cursor class', () => {
			describe('should have class "key-out"', () => {
				ALL_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {
						const key = renderKey(keyName); 
						expect(key.className).toContain('key-out')
					})
				}) 
			}) 
		})

		describe('size', () => {
			describe('white keys', () => {
				describe('keys C D E: width should be 20% of container height', () => {
					['C3', 'D3', 'E3'].forEach(keyName => {
						it(`${keyName}`, () => {
							const key = renderKey(keyName); 

							const keyHeight = getElementHeight(key, 'number'); 
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = CONTAINER_HEIGHT * 0.2;
					 		 
							expect(keyWidth).toEqual(targetHeight)
						})
					}) 
				}) 

				describe('keys F G A B: width should be 21% of container height', () => {
					['F3', 'G3', 'A3', 'B3'].forEach(keyName => {
						it(`${keyName}`, () => {
							const key = renderKey(keyName); 
							const keyWidth = getElementWidth(key, 'number');
							const targetHeight = CONTAINER_HEIGHT * 0.21;
					 		 
							expect(keyWidth).toEqual(targetHeight)
						})
					})
				}) 

				describe('height should be 100% container height', () => {
					WHITE_KEYS.forEach(keyName => { 
						it(`${keyName}`, () => {
							const key = renderKey(keyName); 
							const keyHeight = getElementHeight(key, 'number');
					 		
					 		expect(CONTAINER_HEIGHT).toEqual(keyHeight)
				 		})
					}) 
				})
			})

			describe('black keys', () => {
				describe('width should be whiteHeight (100%) * WidthToHeight Ratio (blackWidth/whiteHeight)', () => {
					BLACK_KEYS.forEach(keyName => { 
						it(`${keyName}`, () => {
							const key = renderKey(keyName);   
							const keyWidth = getElementWidth(key, 'number');
							const widthToHeightRatio = BLACK_KEY_WIDTH / 100;
					 		const targetKeyWidth = CONTAINER_HEIGHT * widthToHeightRatio; 

							expect(keyWidth).toEqual(targetKeyWidth) 
						})
					}) 
				})

				describe('height be 65% of container height', () => {
					BLACK_KEYS.forEach(keyName => { 
						it(`${keyName}`, () => { 
							const key = renderKey(keyName); 
							const keyHeight = getElementHeight(key, 'number');
							const targetHeight = CONTAINER_HEIGHT * 0.65;
					 		 
							expect(keyHeight).toEqual(targetHeight)
						})
					})
				})
			})
		})  

		describe('offset', () => {
			describe('white keys => should have offset value of the total width of previous white keys', () => {
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

						const keyWidth = (CONTAINER_HEIGHT * BLACK_KEY_WIDTH) / 100;
						const targetLeft = keyWidth * i + 'px';
						
						expect(keyLeft).toEqual(targetLeft); 
					})
				}) 
			})
		})
	})

	describe('on container resize', () => {
		describe('expand', () => {
			describe('white keys', () => {
				describe('width', () => {
					describe('keys C D E: width should be 20% of container height', () => {
						['C3', 'D3', 'E3'].forEach(keyName => {
							it(`${keyName}`, () => { 
								const newWidth = 1000;
								const newHeight = 1000;

								const key = renderKey(keyName); 

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyWidth = getElementWidth(key, 'number'); 
								const targetHeight = newHeight * 0.2;
								expect(keyWidth).toEqual(targetHeight)
							})
						})
					}) 

					describe('keys F G A B: width should be 21% of container height', () => {
						['F3', 'G3', 'A3', 'B3'].forEach(keyName => {
							it(`${keyName}`, () => { 
								const newWidth = 1000;
								const newHeight = 1000;

								const key = renderKey(keyName);

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyWidth = getElementWidth(key, 'number');
								const targetHeight = newHeight * 0.21;
								expect(keyWidth).toEqual(targetHeight)
							})
						})
					}) 
				}) 
				
				describe('height', () => {
					describe('height should be 100% container height', () => {
						WHITE_KEYS.forEach((keyName, i) => {
							it(`${keyName}`, () => {  
								const newWidth = 1000;
								const newHeight = 1000;

								const key = renderKey(keyName);

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyHeight = getElementHeight(key, 'number'); 
								expect(keyHeight).toEqual(newHeight)
							})
						})
					})
				}) 
			})

			describe('black keys', () => {
				describe('black key', () => {
					describe('width should be whiteHeight (100%) * WidthToHeight Ratio (blackWidth/whiteHeight)', () => {
						BLACK_KEYS.forEach(keyName => {
							it(`${keyName}`, () => {
								const newWidth = 1000;
								const newHeight = 1000;
								const key = renderKey(keyName); 

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyWidth = getElementWidth(key, 'number');

								const widthToHeightRatio = BLACK_KEY_WIDTH / 100;
				 				const targetKeyWidth = newHeight * widthToHeightRatio; 

				 				expect(keyWidth).toEqual(targetKeyWidth) 
							}) 
						}) 
					})

					describe('height should  be 65% of container height', () => { 
						BLACK_KEYS.forEach(keyName => {
							it(`${keyName}`, () => {
								const newWidth = 1000;
								const newHeight = 1000;
								const key = renderKey(keyName);

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyHeight = getElementHeight(key, 'number');
								const targetHeight = newHeight * 0.65;

								expect(keyHeight).toEqual(targetHeight) 
							}) 
						})
					})
				})
			}) 
		})

		describe('shrink', () => {
			describe('white keys', () => {
				describe('width', () => {
					describe('keys C D E: width should be 20% of container height', () => {
						['C3', 'D3', 'E3'].forEach(keyName => {
							it(`${keyName}`, () => { 
								const newWidth = 100;
								const newHeight = 100;

								const key = renderKey(keyName); 

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyWidth = getElementWidth(key, 'number'); 
								const targetHeight = newHeight * 0.2;
								expect(keyWidth).toEqual(targetHeight)
							})
						})
					}) 

					describe('keys F G A B: width should be 21% of container height', () => {
						['F3', 'G3', 'A3', 'B3'].forEach(keyName => {
							it(`${keyName}`, () => { 
								const newWidth = 100;
								const newHeight = 100;

								const key = renderKey(keyName);

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyWidth = getElementWidth(key, 'number');
								const targetHeight = newHeight * 0.21;
								expect(keyWidth).toEqual(targetHeight)
							})
						})
					}) 
				}) 
				
				describe('height', () => {
					describe('height should be 100% container height', () => {
						WHITE_KEYS.forEach((keyName, i) => {
							it(`${keyName}`, () => {  
								const newWidth = 100;
								const newHeight = 100;

								const key = renderKey(keyName);

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyHeight = getElementHeight(key, 'number'); 
								expect(keyHeight).toEqual(newHeight)
							})
						})
					})
				}) 
			})

			describe('black keys', () => {
				describe('black key', () => {
					describe('width should be whiteHeight (100%) * WidthToHeight Ratio (blackWidth/whiteHeight)', () => {
						BLACK_KEYS.forEach(keyName => {
							it(`${keyName}`, () => {
								const newWidth = 100;
								const newHeight = 100;
								const key = renderKey(keyName); 

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyWidth = getElementWidth(key, 'number');

								const widthToHeightRatio = BLACK_KEY_WIDTH / 100;
				 				const targetKeyWidth = newHeight * widthToHeightRatio; 

				 				expect(keyWidth).toEqual(targetKeyWidth) 
							}) 
						}) 
					})

					describe('height should  be 65% of container height', () => { 
						BLACK_KEYS.forEach((keyName, i) => {
							it(`${keyName}`, () => {
								if(i > 0) return;
								const newWidth = 100;
								const newHeight = 100;
								const key = renderKey(keyName);

								resizeContainer(newWidth, newHeight)
								triggerKeyResize(key)

								const keyHeight = getElementHeight(key, 'number');
								const targetHeight = newHeight * 0.65;

								expect(keyHeight).toEqual(targetHeight) 
							}) 
						})
					})
				})
			})
		}) 
	})

	describe('on over', () => {
		describe('should have class "key-over"', () => {
			ALL_KEYS.forEach(keyName => {
				it('${keyName}', () => {
					const key = renderKey(keyName);   
	 
					act(() => { Simulate.mouseOver(key) })
		  		expect(key.className).toContain('key-over')
				}) 
			}) 
		})

		describe('should call handleOver function', () => {
			ALL_KEYS.forEach(keyName => {
				it('${keyName}', () => {
					const handleOver = jest.fn(); 
					const key = renderKey(keyName, {handleOver}); 

					act(() => { Simulate.mouseOver(key) })
					expect(handleOver).toHaveBeenCalled()
				})
			}) 
		})
	})

	describe('on out', () => {
		describe('mouse up', () => {
			describe('should have class "key-out"', () => {
				ALL_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {  
						const key = renderKey(keyName);   
				 	
				 		act(() => { Simulate.mouseOver(key) })
						act(() => { Simulate.mouseOut(key) })
				  	expect(key.className).toContain('key-out') 
					})
				}) 
			}) 

			describe('should call handleOut function', () => {
				ALL_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {  
						const handleOut = jest.fn();
						const key = renderKey(keyName, {handleOut});   
				 		
				 		act(() => { Simulate.mouseOver(key) })
						act(() => { Simulate.mouseOut(key) })
				  	expect(handleOut).toHaveBeenCalled()
					})
				}) 
			}) 
		})

		describe('mouse down', () => {
			describe('should have class "key-out"', () => {
				ALL_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {  
						const key = renderKey(keyName);   
				 	
				 		act(() => { Simulate.mouseOver(key) })
				 		act(() => { Simulate.mouseDown(key) })
						act(() => { Simulate.mouseOut(key) })
				  	expect(key.className).toContain('key-out') 
					})
				}) 
			}) 

			describe('should call handleOut function', () => {
				ALL_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {  
						const handleOut = jest.fn();
						const key = renderKey(keyName, {handleOut});   
				 		
				 		act(() => { Simulate.mouseOver(key) })
				 		act(() => { Simulate.mouseDown(key) })
						act(() => { Simulate.mouseOut(key) })
				  	expect(handleOut).toHaveBeenCalled()
					})
				}) 
			}) 
		}) 
	})

	describe('on down', () => {
		describe('should have class "key-down"', () => {
			ALL_KEYS.forEach(keyName => {
				it(`${keyName}`, () => { 
					const handleOver = jest.fn();
					const key = renderKey(keyName, {handleOver});   
			 	
			 		act(() => { Simulate.mouseOver(key) })
					act(() => { Simulate.mouseDown(key) })
			  	expect(key.className).toContain('key-down') 
				})
			}) 
		}) 
		 
		describe('should call handleDown function', () => {
			ALL_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const handleDown = jest.fn();
					const key = renderKey(keyName, {handleDown});  

					act(() => { Simulate.mouseOver(key) })
					act(() => { Simulate.mouseDown(key) })
					expect(handleDown).toHaveBeenCalled()
				})  
			})
		}) 
	})

	describe('on up', () => {
		describe('on mouse over', () => {
			describe('should have class "key-over"', () => {
				ALL_KEYS.forEach(keyName => {
					it(`${keyName}`, () => { 
						const key = renderKey(keyName);    

						act(() => { Simulate.mouseOver(key) })
						act(() => { Simulate.mouseDown(key) })
						act(() => { Simulate.mouseUp(key) })

				  	expect(key.className).toContain('key-over') 
					})
				}) 
			}) 
		})

		describe('on mouse out', () => {
			describe('should have class "key-out"', () => {
				ALL_KEYS.forEach(keyName => {
					it(`${keyName}`, () => {
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
	})
})



