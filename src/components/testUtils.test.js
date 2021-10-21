import { isElementOfType } from 'react-dom/test-utils';  
import Key from './parts/Key.jsx';
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
describe('test functions', () => {
	it('addInlineStyles', () => { 
		Object.keys(KEY_CONTAINER_STYLES).forEach(key => {
			expect(container.style[key]).toEqual(KEY_CONTAINER_STYLES[key])
		}) 
	})

	describe('renderKey(keyName, props)', () => { 
		describe('should render all keys', () => {
			ALL_KEYS.forEach((keyName, i) => {  
				if(i > 0) return; 
				it(`${keyName}`, () => {
					if(i > 0) return; 
					const key = renderKey(container, keyName);
					expect(isElementOfType(key, Key)) 
				})
			})
		})  

		describe('should render when i value passed as prop', () => {
			describe('octave using flat keys', () => {
				OCTAVE_KEYS_FLAT.forEach((keyName, i) => {  
					it(`${keyName}`, () => {
						const key = renderKey(container, keyName, {i});
						expect(isElementOfType(key, Key))  
					}) 
				})
			})

			describe('octave using sharp keys', () => {
				OCTAVE_KEYS_SHARP.forEach((keyName, i) => {  
					it(`${keyName}`, () => {
						const key = renderKey(container, keyName, {i});
						expect(isElementOfType(key, Key))  
					}) 
				})  	
			}) 

			describe('octave using sharp keys with unescaped #', () => {
				OCTAVE_KEYS_UNESCAPED_SHARP.forEach((keyName, i) => {  
					it(`${keyName}`, () => {
						const key = renderKey(container, keyName, {i});
						expect(isElementOfType(key, Key))  
					}) 
				})  	
			})
		}) 
	}) 

	describe('updateKeyHeight() (called on renderKey)', () => { 
		describe('should set natural keys to 100% of container height', () => {
			WHITE_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const key = renderKey(container, keyName);
					const keyHeight = getElementHeight(key, 'number');

					expect(keyHeight).toEqual(CONTAINER_HEIGHT)
				}) 
			})
		})

		describe('should set sharp and flat keys to 65% of container height', () => {
			SHARP_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const key = renderKey(container, keyName);
					const keyHeight = getElementHeight(key, 'number');

					expect(keyHeight).toEqual(CONTAINER_HEIGHT * 0.65)
				})
			})

			FLAT_KEYS.forEach(keyName => {
				it(`${keyName}`, () => {
					const key = renderKey(container, keyName);
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
					const key = renderKey(container, keyName);
					const value = getWhiteOffset(keyName, CONTAINER_HEIGHT);
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
					const key = renderKey(container, keyName);
					const value = getWhiteOffset(keyName, CONTAINER_HEIGHT);
					const target = CONTAINER_HEIGHT * targetValues[keyName];

					expect(value).toEqual(target)
				})
			} 
		})
	})

	describe('resizeElement()', () => {
		describe('passed string', () => {
			it('should expand container', () => {
				const newWidth = '2000px';
				const newHeight = '2000px'; 
				resizeElement(container, newWidth, newHeight)

				const containerHeight = getElementHeight(container);
				const containerWidth = getElementWidth(container);

				expect(containerWidth).toEqual(newWidth)
				expect(containerHeight).toEqual(newHeight)
			})

			it('should shrink container', () => {
				const newWidth = '100px';
				const newHeight = '100px'; 
				resizeElement(container, newWidth, newHeight)

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
				resizeElement(container, newWidth, newHeight)

				const containerHeight = getElementHeight(container, 'number');
				const containerWidth = getElementWidth(container, 'number');

				expect(containerWidth).toEqual(newWidth)
				expect(containerHeight).toEqual(newHeight)
			})

			it('should shrink container', () => {
				const newWidth = 2000;
				const newHeight = 2000;
				resizeElement(container, newWidth, newHeight)

				const containerHeight = getElementHeight(container, 'number');
				const containerWidth = getElementWidth(container, 'number');

				expect(containerWidth).toEqual(newWidth)
				expect(containerHeight).toEqual(newHeight)
			})
		}) 
	})
})