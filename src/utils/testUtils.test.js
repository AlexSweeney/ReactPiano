import { isElementOfType } from 'react-dom/test-utils';  
import Key from '../parts/Key/Key.jsx';
import * as testUtils from './testUtils.js';

Object.keys(testUtils).forEach(key => {
	window[key] = testUtils[key];
}) 

// ============================================ Mocks =============================================//
jest.mock('./utils.js');

// ============================================ Vars ==============================================//
let key;
let container;

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

// ============================================ Setup / Teardown ==================================//
beforeEach(() => {
	container = document.createElement('div');
	container.id = CONTAINER_ID;
	addInlineStyles(container, KEY_CONTAINER_STYLES) 
	document.body.appendChild(container); 
})

afterEach(() => {
	document.body.removeChild(container); 
	container = null;
})

// ====================================== Tests ========================================== //
describe('test util functions', () => {
	it('addInlineStyles', () => { 
		Object.keys(KEY_CONTAINER_STYLES).forEach(key => {
			expect(container.style[key]).toEqual(KEY_CONTAINER_STYLES[key])
		}) 
	}) 
})