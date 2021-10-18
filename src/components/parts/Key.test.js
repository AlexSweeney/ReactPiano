import React from 'react';
import { render } from 'react-dom'; 
import { act, Simulate } from 'react-dom/test-utils'; 
import Key from './Key.jsx'; 
import { 
	triggerOnSizeChange,
	getElementHeight,
} from './../utils.js';

let key;
let container;
let iframe;

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
.container { 
	width:  500px;
	height: 500px; 
	resize: both;
	overflow: auto;
}`;
document.getElementsByTagName('head')[0].appendChild(style);
  
function getId(key) {
	return `#key-${key}-octave-3`;
}

function renderKey(keyName, props = {}) {
	const id = getId(keyName);
	act(() => { render(<Key keyName={keyName} {...props}/>, container) })
	const key = container.querySelector(id);  
	act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })
	return key;
}

function getWidth(element) {
	return window.getComputedStyle(element).width;
}

function getHeight(element) {
	return window.getComputedStyle(element).height;
} 

function mockTriggerOnSizeChange(id, fn) { 
	const element = document.getElementById(id);
	element.addEventListener('resizetrigger', () => {
		// set key height to container height - 100% height style doesn't work in test
		const element = document.getElementById(id);
		element.style.height = window.getComputedStyle(container).height;
		// call width calculate fn
		fn(id)
	})
}

jest.mock('./../utils.js', () => { 
	const allUtils = jest.requireActual('./../utils.js');

	return {
		...allUtils,
		triggerOnSizeChange: mockTriggerOnSizeChange,
	} 
})

beforeEach(() => {
	container = document.createElement('div'); 
	container.classList.add('container') 
	document.body.appendChild(container);

})

afterEach(() => {
	document.body.removeChild(container);
	container = null;
})

describe('on render', () => { 
	it('should have class "white-key" if natural key', () => {
		const keyName = 'C3';
		const key = renderKey(keyName);

		expect(key.className).toContain('white-key')
		expect(key.className).not.toContain('black-key')
	})

	it('should have class "black-key" if flat key (b)', () => {
		const keyName = 'B3b';
		const key = renderKey(keyName); 

		expect(key.className).toContain('black-key')
		expect(key.className).not.toContain('white-key')
	})

	it('should have class "black-key" if sharp key (#)', () => {
		const keyName = 'B3sharp';
		const key = renderKey(keyName); 

		expect(key.className).toContain('black-key')
		expect(key.className).not.toContain('white-key')
	})

	it('should have class "key-out"', () => {
		const keyName = 'C3';
		const key = renderKey(keyName);
 
		expect(key.className).toContain('key-out')
	})
})

describe('on size change', () => {
	describe('expand', () => {
		it('width should be 20% of height', () => {
			const keyName = 'C3'; 
			const key = renderKey(keyName); 
	 
			container.style.width = '1000px';
			container.style.height = '1000px';

			act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })
			
			expect(getWidth(key)).toEqual('200px')
		})
	})

	describe('shrink', () => {
		it('width should be 20% of height', () => {
			const keyName = 'C3'; 
			const key = renderKey(keyName); 
	 
			container.style.width = '100px';
			container.style.height = '100px';

			act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })
			
			expect(getWidth(key)).toEqual('20px')
		})
	}) 
})

describe('on over', () => {
	it('should have class "key-over"', () => {
		const keyName = 'C3';
		const key = renderKey(keyName);   
 
		act(() => { Simulate.mouseOver(key) })
  	expect(key.className).toContain('key-over') 
	})

	it('should call handleOver function', () => {
		const handleOver = jest.fn();
		const keyName = 'C3';
		const key = renderKey(keyName, {handleOver}); 

		act(() => { Simulate.mouseOver(key) })
		expect(handleOver).toHaveBeenCalled()
	})
})

describe('on out', () => {
	describe('mouse up', () => {
		it('should have class "key-out"', () => {
			const keyName = 'C3';
			const handleOver = jest.fn();
			const key = renderKey(keyName, {handleOver});   
	 	
	 		act(() => { Simulate.mouseOver(key) })
			act(() => { Simulate.mouseOut(key) })
	  	expect(key.className).toContain('key-out') 
		}) 
	})

	describe('mouse down', () => {
		it('should have class "key-out"', () => {
			const keyName = 'C3';
			const handleOver = jest.fn();
			const key = renderKey(keyName, {handleOver}); 
	 		
	 		act(() => { Simulate.mouseOver(key) })
	 		act(() => { Simulate.mouseDown(key) })
			act(() => { Simulate.mouseOut(key) })
	  	expect(key.className).toContain('key-out') 
		})	
	})
	
	it('should call handleOut function', () => {
			const keyName = 'C3';
			const handleOut = jest.fn();
			const key = renderKey(keyName, {handleOut});  

			act(() => { Simulate.mouseOver(key) })
			act(() => { Simulate.mouseOut(key) })
			expect(handleOut).toHaveBeenCalled()
		}) 
})

describe('on down', () => {
	it('should have class "key-down"', () => {
		const keyName = 'C3';
		const handleOver = jest.fn();
		const key = renderKey(keyName, {handleOver});   
 	
 		act(() => { Simulate.mouseOver(key) })
		act(() => { Simulate.mouseDown(key) })
  	expect(key.className).toContain('key-down') 
	}) 
	 
	it('should call handleDown function', () => {
			const keyName = 'C3';
			const handleDown = jest.fn();
			const key = renderKey(keyName, {handleDown});  

			act(() => { Simulate.mouseOver(key) })
			act(() => { Simulate.mouseDown(key) })
			expect(handleDown).toHaveBeenCalled()
		}) 
})

describe('on up', () => {
	describe('on mouse over', () => {
		it('should have class "key-over"', () => {
			const keyName = 'C3'; 
			const key = renderKey(keyName);    

			act(() => { Simulate.mouseOver(key) })
			act(() => { Simulate.mouseDown(key) })
			act(() => { Simulate.mouseUp(key) })

	  	expect(key.className).toContain('key-over') 
		}) 
	})

	describe('on mouse out', () => {
		it('should have class "key-out"', () => {
			const keyName = 'C3'; 
			const key = renderKey(keyName);    
			
			act(() => { Simulate.mouseOver(key) })
			act(() => { Simulate.mouseDown(key) }) 
			act(() => { Simulate.mouseOut(key) })
			act(() => { Simulate.mouseUp(key) })

	  	expect(key.className).toContain('key-out') 
		}) 
	}) 
})

