import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {act} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer'; 
import {
	CONTAINER_HEIGHT_TO_WHITE_HEIGHT,
	CONTAINER_HEIGHT_TO_BLACK_HEIGHT,
	WHITE_HEIGHT_TO_BLACK_WIDTH,
	WHITE_WIDTHS,
	BLACK_WIDTH,
} from './settings/keySizes.js';
import {
	getElement,
	getElementWidth,
	getElementHeight,
	pxToNumber,
} from './utils.js';
import Keys from './Keys.jsx';

// ============================================ Constants ===================================================//
let container;
const CONTAINER_ID = 'container';
let containerWidth = 500;
let containerHeight = 500;
 
const CONTAINER_STYLE = `
.container { 
	width:  ${containerWidth}px;
	height: ${containerHeight}px; 
	resize: both;
	overflow: auto;
}`;

const KEYS_ID = 'keys';
const KEY_NAMES = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 

// ============================================ Add style sheet =============================================//
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `${CONTAINER_STYLE}`;
document.getElementsByTagName('head')[0].appendChild(style);

// ============================================ Helper Fns ==================================================//
function getKeyType(key) {
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
}

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
  
function mockTriggerOnSizeChange(id, fn) {  
	// listen for custom event, in code trigger on size change
	const element = document.getElementById(id);
	element.addEventListener('resizetrigger', () => {
		// set height manually, in code use css style
		updateKeyHeight(id, container)
	
		// call width calculate fn
		fn(id)
	})
}

jest.mock('./utils.js', () => { 
	const allUtils = jest.requireActual('./utils.js');

	return {
		...allUtils,
		triggerOnSizeChange: mockTriggerOnSizeChange,
	} 
})

// jest.mock('./parts/Key.jsx', () => {
// 	return MockKey;
// }); 

// ============================================ Set up / Tear down ====================================================//
beforeEach(() => {
	container = document.createElement('div');
	container.id = CONTAINER_ID;
	document.body.appendChild(container)
})

afterEach(() => {
	document.body.removeChild(container)
	container = null;
}) 

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

describe.skip('<Keys/>', () => {
	describe('on render', () => {
		it('should render key for every keyName passed', () => {   
			const testRenderer = TestRenderer.create(<Keys keyNames={KEY_NAMES}/>); 

			const numKeyNames = KEY_NAMES.length;

			const numRenderedKeys = testRenderer.toJSON().children.filter((child, i) => { 
				return child.props.className.includes('key') && child.props.id === `key-${KEY_NAMES[i]}`;
			}).length;

			expect(numRenderedKeys).toEqual(numKeyNames)
		})

		describe('should show a keyboard with correctly spaced keys', () => {
			describe('white keys should be adjacent to each other', () => {

			})

			describe('black keys should have left value of i * black key width', () => {

			})
		})

		it('should expand to width of white keys', () => {
			act(() => render(<Keys keyNames={KEY_NAMES}/>, container))
			
			const keysWidth = getElementWidth(KEYS_ID, 'number');	 
			const totalWhiteKeysWidth = getWhiteKeysWidth(container);

 			expect(keysWidth).toEqual(totalWhiteKeysWidth)
		})
	}) 

	describe('on change size', () => {
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