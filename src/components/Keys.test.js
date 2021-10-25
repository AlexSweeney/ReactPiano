import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {act, isElementOfType} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer'; 
/*import {
	CONTAINER_HEIGHT_TO_WHITE_HEIGHT,
	CONTAINER_HEIGHT_TO_BLACK_HEIGHT,
	WHITE_HEIGHT_TO_BLACK_WIDTH,
	WHITE_WIDTHS,
	BLACK_WIDTH,
} from './settings/keySizes.js';*/
import {
	addInlineStyles,
	getKeyId,
	triggerKeyResize,
} from './testUtils.js';
import Keys from './Keys.jsx';
import Key from './parts/Key.jsx';

jest.mock('./utils.js')

// ============================================ Constants ===================================================//
let container;
let keys;
const CONTAINER_ID = 'container'; 
// const CONTAINER_WIDTH = 100000;
const CONTAINER_HEIGHT = 100;

const CONTAINER_STYLES = `
.container {  
	resize: both;
	overflow: auto; 
	height: ${CONTAINER_HEIGHT}px;
}`;

const KEYS_ID = 'keys';
const KEY_NAMES = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 
const WHITE_KEYS = ['C3','D3', 'E3','F3','G3','A3','B3'];
const BLACK_KEYS = ['Db3','Eb3','Gb3','Ab3','Bb3']; 
const WHITE_KEYS_WIDTH = (0.2 *  CONTAINER_HEIGHT * 3) + (0.21 *  CONTAINER_HEIGHT * 4);

const KEY_NAMES_TABLE = KEY_NAMES.map(keyName => [keyName]);
const WHITE_KEYS_TABLE = WHITE_KEYS.map(whiteKey => [whiteKey]);
const BLACK_KEYS_TABLE = BLACK_KEYS.map(blackKey => [blackKey]);

// ============================================ Set up / Tear down ==========================================//
beforeEach(() => {
	container = document.createElement('div');
	container.id = CONTAINER_ID;
	addInlineStyles(container, CONTAINER_STYLES) 

	keys = renderKeys(container);

	document.body.appendChild(container); 
})

afterEach(() => {
	document.body.removeChild(container);
	keys = null; 
	container = null;
})

// ============================================ Helper Fns =================================================//
function renderKeys(container) { 
	act(() => { render(<Keys keyNames={KEY_NAMES}/>, container) })
}

// ============================================ Tests ======================================================//
describe('<Keys/>', () => {
	describe.only('on render', () => {
		test('<Key> Render: it should render key element for keyName, in order they appear in keyNames', () => {   
			KEY_NAMES.forEach(keyName => {
				const keyId = getKeyId(keyName);
				const thisKey = getElement(keyId);

				expect(isElementOfType(thisKey, Key))
			})
		})

		describe('<Key> Type: ', () => {
			it('should render white keys with "white-key" class', () => {
				WHITE_KEYS.forEach(keyName => {
					const keyId = getKeyId(keyName);
					const thisKey = getElement(keyId);
 					
 					expect(isElementOfType(thisKey, Key))
					expect(thisKey.classList).toContain('white-key')
				}) 
			})

			it('should render black keys with "black-key" class', () => {
				BLACK_KEYS.forEach(keyName => {
					const keyId = getKeyId(keyName);
					const thisKey = getElement(keyId);

					expect(isElementOfType(thisKey, Key))
					expect(thisKey.classList).toContain('black-key')
				}) 
			})
		}) 

		describe('<Key> Width', () => {
			describe('white keys', () => {
				it('white keys should have a width of (C,D,E: 20%, F,G,A,B: 21%) of container height', () => {
					WHITE_KEYS.forEach((keyName, whiteKeyI) => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						const ratio = (whiteKeyI < 3) ? 0.2 : 0.21;
						console.log(thisKey)
						expect(thisKey.style.width).toEqual(CONTAINER_HEIGHT * ratio + 'px')
					})
				})
			})
			
			it('black keys should have width of 12% of container height', () => {
				BLACK_KEYS.forEach(keyName => {
					const keyId = getKeyId(keyName);
					const thisKey = getElement(keyId);

					expect(thisKey.style.width).toEqual(CONTAINER_HEIGHT * 0.12 + 'px')
				}) 
			})
		})

		describe('<Key> height', () => {
			it('white keys have height of 100%', () => {
				WHITE_KEYS.forEach(keyName => {
					const keyId = getKeyId(keyName);
					const thisKey = getElement(keyId);

					expect(thisKey.style.height).toEqual('100%')
				}) 
			})

			it('black keys have height of 65%', () => {
				BLACK_KEYS.forEach(keyName => {
					const keyId = getKeyId(keyName);
					const thisKey = getElement(keyId);

					expect(thisKey.style.height).toEqual('65%')
				}) 
			})
		})

		describe('<Key> left', () => {
			it('white keys should be render adjacent to each other', () => {
				let left = 0;

				WHITE_KEYS.forEach((keyName, whiteKeyI) => {
					const keyId = getKeyId(keyName);
					const thisKey = getElement(keyId);

					const thisRatio = (whiteKeyI < 3) ? 0.2 : 0.21;
					const thisWidth = CONTAINER_HEIGHT * thisRatio;

					const thisLeft = left;
					left += thisWidth;

					expect(thisKey.style.left).toEqual(thisLeft + 'px')
				})
			})

			it('black keys should be rendered with left of i * blackKeyWidth (12% of container Height)', () => {
				const blackKeyWidth = CONTAINER_HEIGHT * 0.12;

				BLACK_KEYS.forEach((keyName) => {
					const keyId = getKeyId(keyName);
					const thisKey = getElement(keyId);
					const i = KEY_NAMES.indexOf(keyName);

					expect(thisKey.style.left).toEqual(i * blackKeyWidth + 'px')
				})
			})
		})

		test('<Keys> Width should be same as width of all white keys', () => {
			const keys = getElement(KEYS_ID);
			expect(keys.style.width).toEqual(WHITE_KEYS_WIDTH + 'px')
		})
	}) 

	describe.skip('on change size', () => {
		describe('on shrink', () => {
			it('should shrink to width of white keys', () => {
				const newWidth = '100px';
				const newHeight = '100px';

				act(() => render(<Keys keyNames={KEY_NAMES}/>, container))
			
				changeContainerSize(newWidth, newHeight)

				const keysWidth = getElementWidth(KEYS_ID, 'number');
				const totalWhiteKeysWidth = getWhiteKeysWidth(container);

				expect(keysWidth).toEqual(totalWhiteKeysWidth)
			}) 
		})

		describe('on expand', () => {
			it('should expand to width of white keys', () => {
				const newWidth = '1000px';
				const newHeight = '1000px';

				act(() => render(<Keys keyNames={KEY_NAMES}/>, container))
			 	
			 	changeContainerSize(newWidth, newHeight)

				const keysWidth = getElementWidth(KEYS_ID, 'number');
				const totalWhiteKeysWidth = getWhiteKeysWidth(container);

				expect(keysWidth).toEqual(totalWhiteKeysWidth)
			})
		})
	})
}) 
















// ============================================ Add style sheet =============================================//
/*var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `${CONTAINER_STYLES}`;
document.getElementsByTagName('head')[0].appendChild(style);

// ============================================ Helper Fns ==================================================//


/*function getKeyType(key) {
	if (key.indexOf('b') === -1 && key.indexOf('#') === -1) return 'white-key';
	if (key.indexOf('b') !== -1 || key.indexOf('#') != -1) return 'black-key';
}

function getWhiteKeysWidth(container) {
	const whiteKeys = Array.from(container.querySelectorAll('.white-key')); 
	const totalWhiteKeysWidth = whiteKeys.reduce((total, key) => { 
		const thisWidth = getElementWidth(key, 'number');
		return total + thisWidth;
	}, 0); 

	return totalWhiteKeysWidth;
}

function changeContainerSize(newWidth, newHeight) {
	// set
	container.style.width = newWidth;
	container.style.height = newHeight; 
 	
	// check
	const containerHeight = getElementHeight(container);
	const containerWidth = getElementWidth(container);

	expect(containerWidth).toEqual(newWidth)
	expect(containerHeight).toEqual(newHeight)
}

function callOnResizeTrigger(id, fn) {
	const element = getElement(id);
	element.addEventListener('resizetrigger', fn)
}

function triggerResize(id) {
	const element = getElement(id);
	act(() => { element.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })
}*/

// ============================================ Mocks =======================================================//
// function MockKey({keyName}) {
// 	/* 
// 		* on render
// 			* color
// 				* render natural keys with 'white-key' class
// 				* render black keys with 'black-key' class
// 			* size
// 				* width 
// 					* C D E 20% of container height
// 					* F G A B 21% of container height
// 				* height
// 					* 100% of container height
// 		* on resize trigger event
// 			* adjust size
// 	*/

// 	// ==================== Constants ========================== //
// 	const KEY_LETTER = keyName[0];
// 	const KEY_TYPE = getKeyType(keyName);
// 	const KEY_ID = `key-${keyName}`;
	 
// 	const [height, setHeight] = useState(getHeight());
// 	const [width, setWidth] = useState(getWidth());

// 	// ==================== Event Handlers ===================== //
// 	function onRender() {
// 		callOnResizeTrigger(CONTAINER_ID, onContainerSizeChange)
// 	}

// 	function onContainerSizeChange() {
// 		console.log('onContainerSizeChange -----')
// 		const newWidth = getWidth();
// 		const newHeight = getHeight();

// 		console.log('newWidth', newWidth)
// 		console.log('newHeight', newHeight)
// 		setWidth(newWidth)
// 		setHeight(newHeight)
// 	}	

// 	// ==================== Helper Fns ========================= //
// 	function getKeyType(key) {
// 		if (key.indexOf('b') === -1 && key.indexOf('#') === -1) return 'white-key';
// 		if (key.indexOf('b') !== -1 || key.indexOf('#') != -1) return 'black-key';
// 	}

// 	function getHeight() {
// 		return CONTAINER_HEIGHT * CONTAINER_HEIGHT_TO_WHITE_HEIGHT; 
// 	}

// 	function getWidth() {
// 		return (CONTAINER_HEIGHT * WHITE_WIDTHS[KEY_LETTER]) / 100;
// 	}

// 	// ==================== Listen / Trigger ==================== //
// 	useEffect(() => {
// 		onRender()
// 	}, [])

// 	// ==================== Output ============================== //
// 	if(KEY_TYPE === 'black-key') return null;
// 	if(KEY_TYPE === 'white-key') {
// 		return (
// 			<div className={`key white-key`} 
// 				style={{height: height + 'px', width: width + 'px'}} 
// 				id={KEY_ID}>
// 				{keyName}
// 			</div>
// 		)
// 	} 
// }
  
/*function mockTriggerOnSizeChange(id, fn) {  
	// listen for custom event, in code trigger on size change
	const element = document.getElementById(id);
	element.addEventListener('resizetrigger', () => {
		// set height manually, in code use css style
		updateKeyHeight(id, container)
	
		// call width calculate fn
		fn(id)
	})
}*/
/*
jest.mock('./utils.js', () => { 
	const allUtils = jest.requireActual('./utils.js');

	return {
		...allUtils,
		triggerOnSizeChange: mockTriggerOnSizeChange,
	} 
})
*/
// jest.mock('./parts/Key.jsx', () => {
// 	return MockKey;
// }); 



// ============================================ Tests ================================================================//
// describe('<MockKey>', () => {
// 	describe('onRender', () => {
// 		describe('color classes', () => {
// 			describe('should render natural keys with className "white-key"', () => {
// 				it('C', () => {
// 					const keyName = 'C3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
// 					const className = testRenderer.toJSON().props.className;
// 					expect(className).toContain('white-key')
// 				})
			
// 				it('D', () => {
// 					const keyName = 'D3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
// 					const className = testRenderer.toJSON().props.className;
// 					expect(className).toContain('white-key')
// 				})

// 				it('E', () => {
// 					const keyName = 'E3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
// 					const className = testRenderer.toJSON().props.className;
// 					expect(className).toContain('white-key')
// 				})

// 				it('F', () => {
// 					const keyName = 'F3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
// 					const className = testRenderer.toJSON().props.className;
// 					expect(className).toContain('white-key')
// 				})

// 				it('G', () => {
// 					const keyName = 'G3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
// 					const className = testRenderer.toJSON().props.className;
// 					expect(className).toContain('white-key')
// 				})

// 				it('A', () => {
// 					const keyName = 'A3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
// 					const className = testRenderer.toJSON().props.className;
// 					expect(className).toContain('white-key')
// 				})

// 				it('B', () => {
// 					const keyName = 'B3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
// 					const className = testRenderer.toJSON().props.className;
// 					expect(className).toContain('white-key')
// 				})
// 			})

// 			describe('should not render sharp keys', () => {
// 				it('C#', () => {
// 					const keyName = 'C#3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				})

// 				it('D#', () => {
// 					const keyName = 'D#3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				})

// 				it('F#', () => {
// 					const keyName = 'F#3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				})

// 				it('G#', () => {
// 					const keyName = 'G#3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				}) 

// 				it('A#', () => {
// 					const keyName = 'A#3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				}) 
// 			})

// 			describe('should not render flat keys', () => {
// 				it('Db', () => {
// 					const keyName = 'Db3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				})

// 				it('Eb', () => {
// 					const keyName = 'Eb3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				})

// 				it('Gb', () => {
// 					const keyName = 'Gb3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				})

// 				it('Ab', () => {
// 					const keyName = 'Ab3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				}) 

// 				it('Bb', () => {
// 					const keyName = 'Bb3';
// 					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 			 
// 		 			expect(testRenderer.toJSON()).toEqual(null) 
// 				}) 
// 			})
// 		})
		
// 		describe('width', () => {
// 			describe('should render keys C D E with width 20% of container height ', () => {
// 				it('C', () => {
// 					const keyName = 'C3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyWidth = getElementWidth(keyId, 'number');
 
// 		 			const targetWidth = CONTAINER_HEIGHT * 0.2;
					
// 					expect(keyWidth).toEqual(targetWidth)
// 				})

// 				it('D', () => {
// 					const keyName = 'D3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyWidth = getElementWidth(keyId, 'number');

// 		 			const targetWidth = CONTAINER_HEIGHT * 0.2;
					
// 					expect(keyWidth).toEqual(targetWidth)
// 				})

// 				it('E', () => {
// 					const keyName = 'E3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyWidth = getElementWidth(keyId, 'number');

// 		 			const targetWidth = CONTAINER_HEIGHT * 0.2;
					
// 					expect(keyWidth).toEqual(targetWidth)
// 				})
// 			})

// 			describe('should render keys F G A B with width 21% of container height ', () => {
// 				it('F', () => {
// 					const keyName = 'F3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyWidth = getElementWidth(keyId, 'number');

// 		 			const targetWidth = CONTAINER_HEIGHT * 0.21;
					
// 					expect(keyWidth).toEqual(targetWidth)
// 				})

// 				it('G', () => {
// 					const keyName = 'G3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyWidth = getElementWidth(keyId, 'number');

// 		 			const targetWidth = CONTAINER_HEIGHT * 0.21;
					
// 					expect(keyWidth).toEqual(targetWidth)
// 				})

// 				it('A', () => {
// 					const keyName = 'A3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyWidth = getElementWidth(keyId, 'number');

// 		 			const targetWidth = CONTAINER_HEIGHT * 0.21;
					
// 					expect(keyWidth).toEqual(targetWidth)
// 				})

// 				it('B', () => {
// 					const keyName = 'B3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyWidth = getElementWidth(keyId, 'number');

// 		 			const targetWidth = CONTAINER_HEIGHT * 0.21;
					
// 					expect(keyWidth).toEqual(targetWidth)
// 				})
// 			})
// 		})

// 		describe('height', () => {
// 			describe('should render white keys with 100% container height', () => {
// 				it('C', () => {
// 					const keyName = 'C3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyHeight = getElementHeight(keyId, 'number');
   
// 					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
// 				})

// 				it('D', () => {
// 					const keyName = 'D3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyHeight = getElementHeight(keyId, 'number');
   
// 					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
// 				})

// 				it('E', () => {
// 					const keyName = 'E3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyHeight = getElementHeight(keyId, 'number');
   
// 					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
// 				})

// 				it('F', () => {
// 					const keyName = 'F3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyHeight = getElementHeight(keyId, 'number');
   
// 					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
// 				})

// 				it('G', () => {
// 					const keyName = 'G3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyHeight = getElementHeight(keyId, 'number');
   
// 					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
// 				})

// 				it('A', () => {
// 					const keyName = 'A3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyHeight = getElementHeight(keyId, 'number');
   
// 					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
// 				})

// 				it('B', () => {
// 					const keyName = 'B3';
// 					const keyId = `key-${keyName}`;

// 					act(() => render(<MockKey keyName={keyName}/>, container)) 
// 		 			const keyHeight = getElementHeight(keyId, 'number');
   
// 					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
// 				})
// 			})
// 		})
// 	})

// 	describe('onContainerSizeChange', () => {
// 		describe.only('shrink', () => {
// 			it('should adjust width to 20% of new height', () => {
// 				const newWidth = '100px';
// 				const newHeight = '100px';
// 				const keyName = 'C3';	
// 				const keyId = `key-${keyName}`;

// 				act(() => render(<MockKey keyName={keyName}/>, container))
				
// 				changeContainerSize(newWidth, newHeight)
// 				triggerResize(keyId)

// 				const keyWidth = getElementWidth(keyId);

// 				expect(keyWidth).toEqual(100 * 0.2);
// 			}) 
// 		})

// 		describe('expand', () => {

// 		}) 
// 	})
// })