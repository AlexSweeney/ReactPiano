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

const WHITE_KEY_WIDTH = 100; 

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

// ============================================ Mocks =======================================================//
function MockKey({keyName}) {
	const KEY_LETTER = keyName[0];
	const KEY_TYPE = getKeyType(keyName);
	const KEY_ID = `key-${keyName}`;

	const height = getHeight() + 'px';
	const width = getWidth() + 'px';

	function getKeyType(key) {
		if (key.indexOf('b') === -1 && key.indexOf('#') === -1) return 'white-key';
		if (key.indexOf('b') !== -1 || key.indexOf('#') != -1) return 'black-key';
	}

	function getHeight() {
		if(KEY_TYPE === 'white-key') return getWhiteKeyHeight(); 
		if(KEY_TYPE === 'black-key') return getBlackKeyHeight();
	}

	function getWhiteKeyHeight() {
		return CONTAINER_HEIGHT * CONTAINER_HEIGHT_TO_WHITE_HEIGHT; 
	}

	function getBlackKeyHeight() {
		return CONTAINER_HEIGHT * CONTAINER_HEIGHT_TO_BLACK_HEIGHT;
	}

	function getWidth() {
		if(KEY_TYPE === 'black-key') return (CONTAINER_HEIGHT * BLACK_WIDTH) / 100;
		if(KEY_TYPE === 'white-key') return (CONTAINER_HEIGHT * WHITE_WIDTHS[KEY_LETTER]) / 100;
	}

	return (<div className={`key ${KEY_TYPE}`} style={{height: height, width: width}} id={KEY_ID}>{keyName}</div>)
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
	return MockKey;
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
		describe.only('on shrink', () => {
			it('should shrink to width of white keys', () => {
				const NEW_WIDTH = '100px';
				const NEW_HEIGHT = '100px';

				act(() => render(<Keys keyNames={KEY_NAMES}/>, container))
				const keys = getElement(KEYS_ID);

				container.style.width = NEW_WIDTH;
				container.style.height = NEW_HEIGHT; 
				act(() => { keys.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

				const containerHeight = getElementHeight(container);
				const containerWidth = getElementWidth(container);

				expect(containerWidth).toEqual(NEW_WIDTH)
				expect(containerHeight).toEqual(NEW_HEIGHT)

				const keysWidth = getElementWidth(KEYS_ID, 'number');
				const totalWhiteKeysWidth = getWhiteKeysWidth(container);

				expect(keysWidth).toEqual(totalWhiteKeysWidth)
			}) 
		})

		describe('on expand', () => {
			it('should expand to width of white keys', () => {
				const NEW_WIDTH = '1000px';
				const NEW_HEIGHT = '1000px';

				act(() => render(<Keys keyNames={KEY_NAMES}/>, container))
				const keys = getElement(KEYS_ID);

				container.style.width = NEW_WIDTH;
				container.style.height = NEW_HEIGHT; 
				act(() => { keys.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

				const containerHeight = getElementHeight(container);
				const containerWidth = getElementWidth(container);

				expect(containerWidth).toEqual(NEW_WIDTH)
				expect(containerHeight).toEqual(NEW_HEIGHT)

				const keysWidth = getElementWidth(KEYS_ID, 'number');
				const totalWhiteKeysWidth = getWhiteKeysWidth(container);

				expect(keysWidth).toEqual(totalWhiteKeysWidth)
			})
		})
	})
}) 