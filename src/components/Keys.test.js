import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {act, isElementOfType} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';  
import {
	addInlineStyles,
	getKeyId,
	triggerKeyResize,
} from './testUtils.js';
import Keys from './Keys.jsx';
import Key from './parts/Key.jsx';
// ============================================ Mocks =======================================================//
jest.mock('./utils.js')

// ============================================ Constants ===================================================//
let container;
let keys;
const CONTAINER_ID = 'container';  
const CONTAINER_HEIGHT = 100;

const CONTAINER_STYLES = {
	resize: 'both',
	overflow: 'auto',
	height: CONTAINER_HEIGHT + 'px',
}; 

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

function simulateSizeChange(newHeight) {
	container.style.height = newHeight + 'px';

	// change <Keys> height manually, code has 100% height so does automatically
	const keys = getElement(KEYS_ID);
	expect(keys.style.height).toEqual('100%')
	keys.style.height = newHeight + 'px';

	// trigger internal <Keys> functions to adjust width to new height
	act(() => { keys.dispatchEvent(new CustomEvent("resizekeys", { bubbles: true })) })
}

// ============================================ Tests ======================================================//
describe('<Keys/>', () => {
	describe('on render', () => {
		test('<Key> Render: it should render key element for keyName, in order they appear in keyNames', () => {   
			KEY_NAMES.forEach(keyName => {
				const keyId = getKeyId(keyName);
				const thisKey = getElement(keyId);

				expect(isElementOfType(thisKey, Key))
			})
		}) 

		describe('<Key> width:', () => {
			describe('white keys', () => {
				it('white keys should have a width of (C,D,E: 20%, F,G,A,B: 21%) of container height', () => {
					WHITE_KEYS.forEach((keyName, whiteKeyI) => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);
						const ratio = (whiteKeyI < 3) ? 0.2 : 0.21; 

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

		describe('<Key> height:', () => {
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

		describe('<Key> left:', () => {
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

		test('<Keys> Width: should be same as width of all white keys', () => {
			const keys = getElement(KEYS_ID);
			expect(keys.style.width).toEqual(WHITE_KEYS_WIDTH + 'px')
		})
	}) 

	describe('on change size', () => {
		describe('on shrink', () => {
			describe('<Key> width:', () => {
				describe('white keys', () => {
					it('white keys should have a width of (C,D,E: 20%, F,G,A,B: 21%) of container height', () => {
						simulateSizeChange(CONTAINER_HEIGHT / 2)

						WHITE_KEYS.forEach((keyName, whiteKeyI) => {
							const keyId = getKeyId(keyName);
							const thisKey = getElement(keyId);
							const ratio = (whiteKeyI < 3) ? 0.2 : 0.21; 

							expect(thisKey.style.width).toEqual((CONTAINER_HEIGHT * ratio) / 2 + 'px')
						})
					})
				})
				
				it('black keys should have width of 12% of container height', () => {
					simulateSizeChange(CONTAINER_HEIGHT / 2)

					BLACK_KEYS.forEach(keyName => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						expect(thisKey.style.width).toEqual((CONTAINER_HEIGHT * 0.12) / 2 + 'px')
					}) 
				})
			})

			describe('<Key> height:', () => {
				it('white keys have height of 100%', () => {
					simulateSizeChange(CONTAINER_HEIGHT / 2)

					WHITE_KEYS.forEach(keyName => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						expect(thisKey.style.height).toEqual('100%')
					}) 
				})

				it('black keys have height of 65%', () => {
					simulateSizeChange(CONTAINER_HEIGHT / 2)

					BLACK_KEYS.forEach(keyName => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						expect(thisKey.style.height).toEqual('65%')
					}) 
				})
			})

			describe('<Key> left:', () => {
				it('white keys should be render adjacent to each other', () => {
					simulateSizeChange(CONTAINER_HEIGHT / 2)
					let left = 0;

					WHITE_KEYS.forEach((keyName, whiteKeyI) => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						const thisRatio = (whiteKeyI < 3) ? 0.2 : 0.21;
						const thisWidth = CONTAINER_HEIGHT * thisRatio;

						const thisLeft = left;
						left += thisWidth;

						expect(thisKey.style.left).toEqual(thisLeft / 2 + 'px')
					})
				})

				it('black keys should be rendered with left of i * blackKeyWidth (12% of container Height)', () => {
					simulateSizeChange(CONTAINER_HEIGHT / 2)
					const blackKeyWidth = CONTAINER_HEIGHT * 0.12;

					BLACK_KEYS.forEach((keyName) => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);
						const i = KEY_NAMES.indexOf(keyName);

						expect(thisKey.style.left).toEqual((i * blackKeyWidth) / 2 + 'px')
					})
				})
			})

			test('<Keys> width: should be same as width of all white keys', () => {
				simulateSizeChange(CONTAINER_HEIGHT / 2)

				const keys = getElement(KEYS_ID);
				expect(keys.style.width).toEqual(WHITE_KEYS_WIDTH / 2 + 'px')
			})
		})

		describe('on expand', () => {
			describe('<Key> width:', () => {
				describe('white keys', () => {
					it('white keys should have a width of (C,D,E: 20%, F,G,A,B: 21%) of container height', () => {
						simulateSizeChange(CONTAINER_HEIGHT * 2)

						WHITE_KEYS.forEach((keyName, whiteKeyI) => {
							const keyId = getKeyId(keyName);
							const thisKey = getElement(keyId);
							const ratio = (whiteKeyI < 3) ? 0.2 : 0.21;

							expect(thisKey.style.width).toEqual((CONTAINER_HEIGHT * ratio) * 2 + 'px')
						})
					})
				})
				
				it('black keys should have width of 12% of container height', () => {
					simulateSizeChange(CONTAINER_HEIGHT * 2)

					BLACK_KEYS.forEach(keyName => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						expect(thisKey.style.width).toEqual((CONTAINER_HEIGHT * 0.12) * 2 + 'px')
					}) 
				})
			})

			describe('<Key> height:', () => {
				it('white keys have height of 100%', () => {
					simulateSizeChange(CONTAINER_HEIGHT * 2)

					WHITE_KEYS.forEach(keyName => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						expect(thisKey.style.height).toEqual('100%')
					}) 
				})

				it('black keys have height of 65%', () => {
					simulateSizeChange(CONTAINER_HEIGHT * 2)

					BLACK_KEYS.forEach(keyName => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						expect(thisKey.style.height).toEqual('65%')
					}) 
				})
			})

			describe('<Key> left:', () => {
				it('white keys should be render adjacent to each other', () => {
					simulateSizeChange(CONTAINER_HEIGHT * 2)
					let left = 0;

					WHITE_KEYS.forEach((keyName, whiteKeyI) => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);

						const thisRatio = (whiteKeyI < 3) ? 0.2 : 0.21;
						const thisWidth = CONTAINER_HEIGHT * thisRatio;

						const thisLeft = left;
						left += thisWidth;

						expect(thisKey.style.left).toEqual(thisLeft * 2 + 'px')
					})
				})

				it('black keys should be rendered with left of i * blackKeyWidth (12% of container Height)', () => {
					simulateSizeChange(CONTAINER_HEIGHT * 2)
					const blackKeyWidth = CONTAINER_HEIGHT * 0.12;

					BLACK_KEYS.forEach((keyName) => {
						const keyId = getKeyId(keyName);
						const thisKey = getElement(keyId);
						const i = KEY_NAMES.indexOf(keyName);

						expect(thisKey.style.left).toEqual((i * blackKeyWidth) * 2 + 'px')
					})
				})
			})

			test('<Keys> width: should be same as width of all white keys', () => {
				simulateSizeChange(CONTAINER_HEIGHT * 2)

				const keys = getElement(KEYS_ID);
				expect(keys.style.width).toEqual(WHITE_KEYS_WIDTH * 2 + 'px')
			})
		})
	})
})