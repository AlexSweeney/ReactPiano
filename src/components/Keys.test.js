import React from 'react';
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
const CONTAINER_HEIGHT = 500;
const CONTAINER_WIDTH = 500;

const CONTAINER_STYLE = `
.container { 
	width:  ${CONTAINER_HEIGHT}px;
	height: ${CONTAINER_WIDTH}px; 
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

	// update
	const keys = getElement(KEYS_ID);
	act(() => { keys.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

	// check
	const containerHeight = getElementHeight(container);
	const containerWidth = getElementWidth(container);

	expect(containerWidth).toEqual(newWidth)
	expect(containerHeight).toEqual(newHeight)
}

// ============================================ Mocks =======================================================//
function MockWhiteKey({keyName}) {
	const KEY_LETTER = keyName[0];
	const KEY_TYPE = getKeyType(keyName);
	const KEY_ID = `key-${keyName}`;
	if(KEY_TYPE === 'black-key') return;

	const height = getHeight() + 'px';
	const width = getWidth() + 'px';

	function getKeyType(key) {
		if (key.indexOf('b') === -1 && key.indexOf('#') === -1) return 'white-key';
		if (key.indexOf('b') !== -1 || key.indexOf('#') != -1) return 'black-key';
	}

	function getHeight() {
		return CONTAINER_HEIGHT * CONTAINER_HEIGHT_TO_WHITE_HEIGHT; 
	}

	function getWidth() {
		return (CONTAINER_HEIGHT * BLACK_WIDTH) / 100;
	}

	return (<div className={`key white-key`} style={{height: height, width: width}} id={KEY_ID}>{keyName}</div>)
}
  
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

jest.mock('./parts/Key.jsx', () => {
	return MockWhiteKey;
}); 

// ============================================ Set up / Tear down ====================================================//
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container)
})

afterEach(() => {
	document.body.removeChild(container)
	container = null;
}) 

// ============================================ Tests ================================================================//
describe('<MockKey>', () => {
	describe('onRender', () => {
		describe('color classes', () => {
			describe('should render natural keys with className "white-key"', () => {
				it('C', () => {
					const keyName = 'C3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('white-key')
				})
			
				it('D', () => {
					const keyName = 'D3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('white-key')
				})

				it('E', () => {
					const keyName = 'E3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('white-key')
				})

				it('F', () => {
					const keyName = 'F3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('white-key')
				})

				it('G', () => {
					const keyName = 'G3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('white-key')
				})

				it('A', () => {
					const keyName = 'A3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('white-key')
				})

				it('B', () => {
					const keyName = 'B3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('white-key')
				})
			})

			describe('should not render sharp keys', () => {
				it('C#', () => {
					const keyName = 'C#3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				})

				it('D#', () => {
					const keyName = 'D#3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				})

				it('F#', () => {
					const keyName = 'F#3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				})

				it('G#', () => {
					const keyName = 'G#3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				}) 

				it('A#', () => {
					const keyName = 'A#3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				}) 
			})

			describe('should not render flat keys', () => {
				it('Db', () => {
					const keyName = 'Db3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				})

				it('Eb', () => {
					const keyName = 'Eb3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				})

				it('Gb', () => {
					const keyName = 'Gb3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				})

				it('Ab', () => {
					const keyName = 'Ab3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				}) 

				it('Bb', () => {
					const keyName = 'Bb3';
					const testRenderer = TestRenderer.create(<MockKey keyName={keyName}/>);
		 
					const className = testRenderer.toJSON().props.className;
					expect(className).toContain('black-key')
				}) 
			})
		})
		
		describe('width', () => {
			describe('natural keys', () => {
				describe('should render keys C D E with width 20% of container height ', () => {

				})

				describe('should render keys F G A B with width 21% of container height ', () => {

				})
			})
			
			it('should render black keys with 65% container height', () => {
				
			})
		})

		describe('height', () => {
			it('should render white keys with 100% container height', () => {

			})

			it('should render black keys with 65% container height', () => {
				
			})
		})
	})

	describe('onContainerSizeChange', () => {

	})
})

describe('<Keys/>', () => {
	describe('on render', () => {
		it('should render key for every keyName passed', () => {   
			const testRenderer = TestRenderer.create(<Keys keyNames={KEY_NAMES}/>); 

			const numKeyNames = KEY_NAMES.length;

			const numRenderedKeys = testRenderer.toJSON().children.filter((child, i) => { 
				return child.props.className.includes('key') && child.props.id === `key-${KEY_NAMES[i]}`;
			}).length;

			expect(numRenderedKeys).toEqual(numKeyNames)
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