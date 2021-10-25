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
	UNESCAPED_SHARP_KEYS,
	OCTAVE_KEYS_SHARP,
	OCTAVE_KEYS_FLAT,
	WHITE_KEYS,
	SHARP_KEYS,
	FLAT_KEYS,
	BLACK_KEYS,
	ALL_KEYS,
	addInlineStyles,
	getKeyId,  
} from './../testUtils.js';

// ============================================ Vars ==============================================//
let key;
let container;
let count = 0;

// ============================================ Consts ============================================//
const CONTAINER_ID = 'container'; 
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500; 
const KEY_CONTAINER_STYLES = {
	width:  `${CONTAINER_WIDTH}px`,
	height: `${CONTAINER_HEIGHT}px`, 
	resize: 'both',
	overflow: 'auto',
}; 

const KEY_HEIGHT = '250px';
const KEY_WIDTH = '250px';
const KEY_LEFT = '10px';

const WHITE_KEYS_TABLE = makeTable(WHITE_KEYS);
const BLACK_KEYS_TABLE = makeTable(BLACK_KEYS);
const UNESCAPED_SHARP_KEYS_TABLE = makeTable(UNESCAPED_SHARP_KEYS);
const SHARP_KEYS_TABLE = makeTable(SHARP_KEYS);
const FLAT_KEYS_TABLE = makeTable(FLAT_KEYS);

// ============================================ Helper Fns ========================================//
function makeTable(array) {
	return array.map(item => [item]);
}

function renderKey(container, keyName = 'C3', props = {}) {  
	props.width = KEY_WIDTH;
	props.height = KEY_HEIGHT;
	props.left =KEY_LEFT;

	act(() => { render(<Key keyName={keyName} {...props}/>, container)})

	const keyId = getKeyId(keyName); 
 	const key = getElement(keyId); 

	return key;
} 

// ============================================ Mocks =============================================//
jest.mock('./../utils.js'); 

// ============================================ Set up / tear down ================================//
beforeEach(() => {
	container = document.createElement('div');
	container.id = CONTAINER_ID;
	addInlineStyles(container, KEY_CONTAINER_STYLES) 
	document.body.appendChild(container); 
})

afterEach(() => {
	document.body.removeChild(container); 
	container = null;
	count = 0;
})

// ============================================ <Key> tests ==========================================//
describe('<Key>', () => {
	describe('can render', () => {
		describe('white keys', () => {
			test.each(WHITE_KEYS_TABLE)('%s',
				(keyName) => { 
					const key = renderKey(container, keyName);
					expect(isElementOfType(key, Key))  
				}
			)
		}) 

		describe('sharp keys', () => {
			describe('sharp keys width unescaped # character', () => {
				test.each(UNESCAPED_SHARP_KEYS_TABLE)('%s', 
					(keyName) => {
						const key = renderKey(container, keyName);
						expect(isElementOfType(key, Key))  
					}
				) 
			})

			describe('sharp keys width escaped # character', () => {
				test.each(SHARP_KEYS_TABLE)('%s', 
					(keyName) => {
						const key = renderKey(container, keyName);
						expect(isElementOfType(key, Key))  
					}
				)
			})
		})

		describe('flat keys', () => {
			test.each(FLAT_KEYS_TABLE)('%s', 
				(keyName) => {
					const key = renderKey(container, keyName);
					expect(isElementOfType(key, Key))  
				}
			)  
		})
	})

	describe('on render', () => {  
		describe('key color', () => {
			describe('white keys should have class "white-key"', () => {
				test.each(WHITE_KEYS_TABLE)('%s', (keyName) => {
					const key = renderKey(container, keyName);

					expect(key.className).toContain('white-key')
				}) 
			})

			describe('black keys should have class "black-key"', () => {
				test.each(BLACK_KEYS_TABLE)('%s', (keyName) => {
					const key = renderKey(container, keyName);

					expect(key.className).toContain('black-key')
				})
			}) 
		})
		
		describe('cursor class', () => {
			it('should have class "key-out"', () => { 
				const key = renderKey(container); 
				expect(key.className).toContain('key-out')
			}) 
		})

		describe('size', () => {
			it('should have passed width', () => {
				const key = renderKey(container); 
				expect(key.style.width).toEqual(KEY_WIDTH)
			})

			it('should have passed height', () => {
				const key = renderKey(container); 
				expect(key.style.height).toEqual(KEY_HEIGHT)
			})
		})

		it('position should have passed left', () => {
				const key = renderKey(container); 
				expect(key.style.left).toEqual(KEY_LEFT)
			})

		// describe('size', () => {
		// 	describe('white keys', () => {
		// 		describe('keys C D E: width should be 20% of container height', () => {
		// 			test.each([['C3'], ['D3'], ['E3']])('%s', (keyName) => {
		// 				const key = renderKey(container, keyName); 

		// 				const keyHeight = getElementHeight(key, 'number'); 
		// 				const keyWidth = getElementWidth(key, 'number');
		// 				const targetWidth = CONTAINER_HEIGHT * 0.2;
				 		 
		// 				expect(keyWidth).toEqual(targetWidth)
		// 			})  
		// 		}) 

		// 		describe('keys F G A B: width should be 21% of container height', () => {
		// 			test.each([['F3'], ['G3'], ['A3'], ['B3']])('%s', (keyName) => {
		// 				const key = renderKey(container, keyName); 
		// 				const keyWidth = getElementWidth(key, 'number');
		// 				const targetWidth = CONTAINER_HEIGHT * 0.21;
				 		 
		// 				expect(keyWidth).toEqual(targetWidth)
		// 			})
		// 		}) 

		// 		describe('height should be 100% container height', () => {
		// 			test.each(WHITE_KEYS_TABLE)('$s', (keyName) => {
		// 				const key = renderKey(container, keyName); 
		// 				const keyHeight = getElementHeight(key, 'number');
					 		
		// 			 	expect(keyHeight).toEqual(CONTAINER_HEIGHT)
		// 			})
		// 		})
		// 	})

		// 	describe('black keys', () => {
		// 		describe('width should be whiteHeight (100%) * WidthToHeight Ratio (blackWidth/whiteHeight)', () => {
		// 			test.each(BLACK_KEYS_TABLE)('%s', (keyName) => {
		// 				const key = renderKey(container, keyName);   
		// 				const keyWidth = getElementWidth(key, 'number');
		// 				const widthToHeightRatio = BLACK_KEY_WIDTH / 100;
		// 		 		const targetKeyWidth = CONTAINER_HEIGHT * widthToHeightRatio; 

		// 				expect(keyWidth).toEqual(targetKeyWidth) 
		// 			}) 
		// 		})

		// 		describe('height be 65% of container height', () => {
		// 			test.each(BLACK_KEYS_TABLE)('%s', (keyName) => {
		// 				const key = renderKey(container, keyName); 
		// 				const keyHeight = getElementHeight(key, 'number');
		// 				const targetHeight = CONTAINER_HEIGHT * 0.65;
				 		 
		// 				expect(keyHeight).toEqual(targetHeight)
		// 			})
		// 		})
		// 	})
		// })  

		// describe('offset', () => { 
		// 	// describe.only('white keys => should have offset value of the total width of previous white keys', () => {
		// 	// 	/* 
		// 	// 		white keys have different widths 
		// 	// 			C D E = 20% of container height 
		// 	// 			F G A B = 21% of container height 
		// 	// 	*/    
				

		// 	// 	// test.each(WHITE_KEYS_TABLE)(`${testFn()}`, (keyName) => {
		// 	// 	// 	const key = renderKey(container, keyName);

		// 	// 	// 	count += 1;
		// 	// 	// 	console.log('count', count)
		// 	// 	// 	/*if(keyName === 'C3') {
		// 	// 	// 		console.log('inside test', arguments)
		// 	// 	// 	}*/
					
		// 	// 	// })	
		// 	// 	// ${getWhiteOffset(`${'%s'}`, CONTAINER_HEIGHT)}`

		// 	// 	(`%s should have offset of ${'%s'}`, (keyName) => {
		// 	// 		testNum += 1;
		// 	// 		const i = OCTAVE_KEYS_SHARP.indexOf(keyName); 
		// 	// 		const key = renderKey(container, keyName, {i});  
		// 	// 		const keyLeft = key.style.left;	 

		// 	// 		const targetLeft = getWhiteOffset(keyName, CONTAINER_HEIGHT) + 'px';
 
		// 	// 		 expect(keyLeft).toEqual(targetLeft)
		// 	// 	})
		// 	// 	// test.each(WHITE_KEYS_TABLE)(`%s should have offset of  ${getWhiteOffset(WHITE_KEYS[testNum], CONTAINER_HEIGHT)}`, (keyName) => {
		// 	// 	// 	testNum++;
		// 	// 	// 	const i = OCTAVE_KEYS_SHARP.indexOf(keyName); 
		// 	// 	// 	const key = renderKey(container, keyName, {i});  
		// 	// 	// 	const keyLeft = key.style.left;	 

		// 	// 	// 	const targetLeft = getWhiteOffset(keyName, CONTAINER_HEIGHT) + 'px';
 
		// 	// 	// 	 expect(keyLeft).toEqual(targetLeft)
		// 	// 	// })

		// 	// /*	WHITE_KEYS.forEach((keyName, whiteKeyI) => {
					
		// 	// 		it(`${keyName} should have left of ${getWhiteOffset(keyName, CONTAINER_HEIGHT) + 'px'}`, () => {
		// 	// 			const i = OCTAVE_KEYS_SHARP.indexOf(keyName); 
		// 	// 			const key = renderKey(container, keyName, {i});  
		// 	// 			const keyLeft = key.style.left;	 

		// 	// 			const targetLeft = getWhiteOffset(keyName, CONTAINER_HEIGHT) + 'px';
 
		// 	// 		 	expect(keyLeft).toEqual(targetLeft)
		// 	// 		})   
		// 	// 	})*/
		// 	// })

		// 	// describe('black keys => should have offset value of i * black key width', () => {
		// 	// 	BLACK_KEYS.forEach((keyName, blackI) => {
		// 	// 		it(`${keyName} should have a left of ${(CONTAINER_HEIGHT *	BLACK_KEY_WIDTH) / 100}`, () => { 
		// 	// 			const i = OCTAVE_KEYS_SHARP.indexOf(keyName); 
		// 	// 			const key = renderKey(container, keyName, { i });  

		// 	// 			const keyLeft = key.style.left;	

		// 	// 			const keyWidth = (CONTAINER_HEIGHT * BLACK_KEY_WIDTH) / 100;
		// 	// 			const targetLeft = keyWidth * i + 'px';
						
		// 	// 			expect(keyLeft).toEqual(targetLeft); 
		// 	// 		})
		// 	// 	}) 
		// 	// })
		// })
	})

	/*describe('on container resize', () => {
		describe('expand', () => {
			describe('white keys', () => {
				describe('width', () => {
					describe('keys C D E: width should be 20% of container height', () => {
						['C3', 'D3', 'E3'].forEach(keyName => {
							it(`${keyName}`, () => { 
								const newWidth = 1000;
								const newHeight = 1000;

								const key = renderKey(container, keyName); 

								resizeElement(container, newWidth, newHeight)
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

								const key = renderKey(container, keyName);

								resizeElement(container, newWidth, newHeight)
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

								const key = renderKey(container, keyName);

								resizeElement(container, newWidth, newHeight)
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
								const key = renderKey(container, keyName); 

								resizeElement(container, newWidth, newHeight)
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
								const key = renderKey(container, keyName);

								resizeElement(container, newWidth, newHeight)
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

								const key = renderKey(container, keyName); 

								resizeElement(container, newWidth, newHeight)
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

								const key = renderKey(container, keyName);

								resizeElement(container, newWidth, newHeight)
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

								const key = renderKey(container, keyName);

								resizeElement(container, newWidth, newHeight)
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
								const key = renderKey(container, keyName); 

								resizeElement(container, newWidth, newHeight)
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
								const newWidth = 100;
								const newHeight = 100;
								const key = renderKey(container, keyName);

								resizeElement(container, newWidth, newHeight)
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
					const key = renderKey(container, keyName);   
	 
					act(() => { Simulate.mouseOver(key) })
		  		expect(key.className).toContain('key-over')
				}) 
			}) 
		})

		describe('should call handleOver function', () => {
			ALL_KEYS.forEach(keyName => {
				it('${keyName}', () => {
					const handleOver = jest.fn(); 
					const key = renderKey(container, keyName, {handleOver}); 

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
						const key = renderKey(container, keyName);   
				 	
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
						const key = renderKey(container, keyName, {handleOut});   
				 		
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
						const key = renderKey(container, keyName);   
				 	
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
						const key = renderKey(container, keyName, {handleOut});   
				 		
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
					const key = renderKey(container, keyName, {handleOver});   
			 	
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
					const key = renderKey(container, keyName, {handleDown});  

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
						const key = renderKey(container, keyName);    

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
						const key = renderKey(container, keyName);    
				
						act(() => { Simulate.mouseOver(key) })
						act(() => { Simulate.mouseDown(key) }) 
						act(() => { Simulate.mouseOut(key) })
						act(() => { Simulate.mouseUp(key) })

				  	expect(key.className).toContain('key-out') 
					})
				}) 
			}) 
		}) 
	})*/
})



