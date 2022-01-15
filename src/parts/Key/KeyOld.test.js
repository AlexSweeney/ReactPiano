import React from 'react';
// import { render, unmountComponentAtNode } from 'react-dom'; 
import { render, cleanup } from '@testing-library/react';
import { isElementOfType } from 'react-dom/test-utils';  
// import { act, Simulate, isElementOfType } from 'react-dom/test-utils';  
import Key from './Key.jsx';  
import { getElement } from '../../utils/utils.js';

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
} from '../../utils/testUtils.js';

// ============================================ Vars ==============================================//
let key;
let container;
let count = 0;

// ============================================ Consts ============================================//
const CONTAINER_ID = 'container'; 
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500; 
const KEY_CONTAINER_STYLES = {
	width:  CONTAINER_WIDTH + 'px',
	height: CONTAINER_HEIGHT + 'px',  
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
	props.left = KEY_LEFT;

	render(<Key keyName={keyName} {...props}/>)

	const keyId = getKeyId(keyName); 
 	const key = getElement(keyId); 

	return key;
} 

// ============================================ Mocks =============================================//
jest.mock('../../utils/utils.js'); 

// ============================================ Set up / tear down ================================//
beforeEach(() => {
	// container = document.createElement('div');
	// container.id = CONTAINER_ID;
	// addInlineStyles(container, KEY_CONTAINER_STYLES) 
	// document.body.appendChild(container); 
})

afterEach(() => {
	cleanup()
	// unmountComponentAtNode(container);
})

// ============================================ Tests =============================================//
describe('<Key>', () => {
	// describe('can render', () => {
	// 	describe.only('white keys', () => {
	// 		WHITE_KEYS.forEach(whiteKey => {
	// 			console.log('keyname', whiteKey)
	// 			expect(true)
	// 		})
	// 		// const thisKey = renderKey(container);
	// 		// expect(isElementOfType(thisKey, Key))   
	// 		// test.each(WHITE_KEYS_TABLE)('%s',
	// 		// 	(keyName) => { 
	// 		// 		const key = renderKey(container, keyName);
	// 		// 		expect(isElementOfType(key, Key))   
	// 		// 	}
	// 		// )
	// 	}) 

	// 	// describe('sharp keys', () => {
	// 	// 	describe('sharp keys width unescaped # character', () => {
	// 	// 		test.each(UNESCAPED_SHARP_KEYS_TABLE)('%s', 
	// 	// 			(keyName) => {
	// 	// 				const key = renderKey(container, keyName);
	// 	// 				expect(isElementOfType(key, Key))  
	// 	// 			}
	// 	// 		) 
	// 	// 	})

	// 	// 	describe('sharp keys width escaped # character', () => {
	// 	// 		test.each(SHARP_KEYS_TABLE)('%s', 
	// 	// 			(keyName) => {
	// 	// 				const key = renderKey(container, keyName);
	// 	// 				expect(isElementOfType(key, Key))  
	// 	// 			}
	// 	// 		)
	// 	// 	})
	// 	// })

	// 	// describe('flat keys', () => {
	// 	// 	test.each(FLAT_KEYS_TABLE)('%s', 
	// 	// 		(keyName) => {
	// 	// 			const key = renderKey(container, keyName);
	// 	// 			expect(isElementOfType(key, Key))  
	// 	// 		}
	// 	// 	)  
	// 	// })
	// })

	// describe('on render', () => {  
	// 	describe('key color', () => {
	// 		describe('white keys should have class "white-key"', () => {
	// 			test.each(WHITE_KEYS_TABLE)('%s', (keyName) => {
	// 				const key = renderKey(container, keyName);
	// 				expect(key.className).toContain('white-key')
	// 			}) 
	// 		})

	// 		describe('black keys should have class "black-key"', () => {
	// 			test.each(BLACK_KEYS_TABLE)('%s', (keyName) => {
	// 				const key = renderKey(container, keyName);

	// 				expect(key.className).toContain('black-key')
	// 			})
	// 		}) 
	// 	})
		
	// 	describe('cursor class', () => {
	// 		it('should have class "key-out"', () => { 
	// 			const key = renderKey(container); 
	// 			expect(key.className).toContain('key-out')
	// 		}) 
	// 	})

	// 	describe('size', () => {
	// 		it('should have passed width', () => {
	// 			const key = renderKey(container); 
	// 			expect(key.style.width).toEqual(KEY_WIDTH)
	// 		})

	// 		it('should have passed height', () => {
	// 			const key = renderKey(container); 
	// 			expect(key.style.height).toEqual(KEY_HEIGHT)
	// 		})
	// 	})

	// 	it('position should have passed left', () => {
	// 		const key = renderKey(container); 
	// 		expect(key.style.left).toEqual(KEY_LEFT)
	// 	}) 
	// }) 

	// describe('on over', () => {
	// 	it('should have class "key-over"', () => {
	// 		const key = renderKey(container, 'C3');   
	 
	// 		act(() => { Simulate.mouseOver(key) })
	// 	  expect(key.className).toContain('key-over')
	// 	})

	// 	it('should call handleOver function', () => {	 
	// 		const handleOver = jest.fn(); 
	// 		const key = renderKey(container, 'C3', {handleOver}); 

	// 		act(() => { Simulate.mouseOver(key) })
	// 		expect(handleOver).toHaveBeenCalled()
	// 	})
	// })

	// describe('on out', () => {
	// 	describe('mouse up', () => {
	// 		it('should have class "key-out"', () => {
	// 			const key = renderKey(container, 'C3');   
		 	
	// 	 		act(() => { Simulate.mouseOver(key) })
	// 			act(() => { Simulate.mouseOut(key) })
	// 	  	expect(key.className).toContain('key-out') 
	// 		}) 

	// 		it('should call handleOut function', () => {
	// 			const handleOut = jest.fn();
	// 			const key = renderKey(container, 'C3', {handleOut});   
		 		
	// 	 		act(() => { Simulate.mouseOver(key) })
	// 			act(() => { Simulate.mouseOut(key) })
	// 	  	expect(handleOut).toHaveBeenCalled()
	// 		}) 
	// 	})

	// 	describe('mouse down', () => {
	// 		it('should have class "key-out"', () => {
	// 			const key = renderKey(container, 'C3');   
		 	
	// 	 		act(() => { Simulate.mouseOver(key) })
	// 	 		act(() => { Simulate.mouseDown(key) })
	// 			act(() => { Simulate.mouseOut(key) })
	// 	  	expect(key.className).toContain('key-out')
	// 		}) 

	// 		it('should call handleOut function', () => {
	// 			const handleOut = jest.fn();
	// 			const key = renderKey(container, 'C3', {handleOut});   
		 		
	// 	 		act(() => { Simulate.mouseOver(key) })
	// 	 		act(() => { Simulate.mouseDown(key) })
	// 			act(() => { Simulate.mouseOut(key) })
	// 	  	expect(handleOut).toHaveBeenCalled() 
	// 		}) 
	// 	}) 
	// })

	// describe('on down', () => {
	// 	it('should have class "key-down"', () => {
	// 		const handleOver = jest.fn();
	// 		const key = renderKey(container, 'C3', {handleOver});   
	 	
	//  		act(() => { Simulate.mouseOver(key) })
	// 		act(() => { Simulate.mouseDown(key) })
	//   	expect(key.className).toContain('key-down') 
	// 	}) 
		 
	// 	it('should call handleDown function', () => {
	// 		const handleDown = jest.fn();
	// 		const key = renderKey(container, 'C3', {handleDown});  

	// 		act(() => { Simulate.mouseOver(key) })
	// 		act(() => { Simulate.mouseDown(key) })
	// 		expect(handleDown).toHaveBeenCalled()
	// 	}) 
	// }) 
})