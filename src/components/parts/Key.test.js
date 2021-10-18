import React from 'react';
import { render } from 'react-dom'; 
import { act, Simulate } from 'react-dom/test-utils'; 
import Key from './Key.jsx'; 
import { 
	getElementHeight,
	getElementWidth,
	pxToNumber,
	triggerOnSizeChange,
} from './../utils.js';

// ============================================ Vars =========================================================//
let key;
let container;
let iframe;
const WHITE_WIDTH = 24;
const BLACK_WIDTH = 14;

// ============================================ Add style sheet =============================================//
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
.container { 
	width:  500px;
	height: 500px; 
	resize: both;
	overflow: auto;
}
`;
document.getElementsByTagName('head')[0].appendChild(style);

// ============================================ Helper Fns =============================================//
function getKeyId(keyName) {
	const idKeyName = keyName.replace('#', 'sharp');
	return `#key-${idKeyName}`;
}

function getKeyType(keyId) {
	const keyName = keyId.replace('sharp', '#'); 

	if(keyName.indexOf('b') === -1 && keyName.indexOf('#') === -1) return 'white-key';
	if(keyName.indexOf('b') !== -1 || keyName.indexOf('#') != -1) return 'black-key';
}

function renderKey(keyName, props = {}) {
	act(() => { render(<Key keyName={keyName} {...props}/>, container) })

	const keyId = getKeyId(keyName); 
	const key = container.querySelector(keyId);  
	act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

	return key;
}

function updateKeyHeight(id, container) {
	const keyType = getKeyType(id);
	const element = document.getElementById(id);
	const containerHeight = getElementHeight(container, 'number');

	if(keyType === 'white-key') {
		element.style.height = containerHeight + 'px';
	}

	if(keyType === 'black-key') {
		element.style.height = containerHeight * 0.65 + 'px';
	}
}

// ============================================ Mocks =============================================//
function mockTriggerOnSizeChange(id, fn) { 
	const element = document.getElementById(id);
	element.addEventListener('resizetrigger', () => {
		// set height manually, in code use css style
		updateKeyHeight(id, container)
	
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

// ============================================ Set up / tear down ===============================//
beforeEach(() => {
	container = document.createElement('div'); 
	container.classList.add('container') 
	document.body.appendChild(container);

})

afterEach(() => {
	document.body.removeChild(container);
	container = null;
})

// ============================================ on Render ==========================================//
describe('on render', () => { 
	describe('key color', () => {
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
			const keyName = 'C3#';
			const key = renderKey(keyName); 

			expect(key.className).toContain('black-key')
			expect(key.className).not.toContain('white-key')
		})	
	})
	
	describe('cursor class', () => {
		it('should have class "key-out"', () => {
			const keyName = 'C3';
			const key = renderKey(keyName);
	 
			expect(key.className).toContain('key-out')
		}) 
	})

	describe('size', () => {
		describe('white key', () => {
			it('width with should be 20% of container height', () => {
				const keyName = 'C3'; 
				const key = renderKey(keyName);

				const containerHeight = getElementHeight(container, 'number');
				const keyWidth = getElementWidth(key, 'number');
				const targetHeight = containerHeight * 0.2;
		 		 
				expect(keyWidth).toEqual(targetHeight)
			})

			it('height should be 100% container height', () => {
				const keyName = 'C3'; 
				const key = renderKey(keyName);

				const containerHeight = getElementHeight(container);
				const keyHeight = getElementHeight(key);
		 		
		 		expect(containerHeight).toEqual(keyHeight) 
			})
		})

		describe('black key', () => {
			it('width should be whiteWidth (20% of height) * (blackWidth/whiteWidth)', () => {
				const keyName = 'C3#';
				const key = renderKey(keyName); 

				const containerHeight = getElementHeight(container, 'number'); 
				const keyWidth = getElementWidth(key, 'number').toFixed(4);
				const targetKeyWidth = (containerHeight * 0.2 * (BLACK_WIDTH / WHITE_WIDTH)).toFixed(4);
		 		 
				expect(keyWidth).toEqual(targetKeyWidth)
			})

			it('height be 65% of container height', () => {
				const keyName = 'C3#';
				const key = renderKey(keyName);

				const containerHeight = getElementHeight(container, 'number');
				
				const keyHeight = getElementHeight(key, 'number');
				const targetHeight = containerHeight * 0.65;
		 		 
				expect(keyHeight).toEqual(targetHeight)
			})
		})
	})  

	describe('offset', () => {
		describe('white keys => should have offset value of white key i * white key width (20% of height)', () => {
			it('C', () => {
				const C = renderKey('C3', {i: 0});  
				const whiteWidth = getElementHeight(container, 'number') * 0.2;
				const left_c = whiteWidth * 0 + 'px';
				expect(C.style.left).toEqual(left_c)  
			})

			it('D', () => {
				const D = renderKey('D3', {i: 2}); 
				const whiteWidth = getElementHeight(container, 'number') * 0.2;
				const left_d = whiteWidth * 1 + 'px';
				expect(D.style.left).toEqual(left_d)
			})

			it('E', () => {
				const E = renderKey('E3', {i: 4}); 
				const whiteWidth = getElementHeight(container, 'number') * 0.2;
				const left_e = whiteWidth * 2 + 'px';
				expect(E.style.left).toEqual(left_e)
			})

			it('F', () => {
				const F = renderKey('F3', {i: 5}); 
				const whiteWidth = getElementHeight(container, 'number') * 0.2;
				const left_f = whiteWidth * 3 + 'px';
				expect(F.style.left).toEqual(left_f)
			})

			it('G', () => {
				const G = renderKey('G3', {i: 7}); 
				const whiteWidth = getElementHeight(container, 'number') * 0.2;
				const left_g = whiteWidth * 4 + 'px';
				expect(G.style.left).toEqual(left_g)
			})

			it('A', () => {
				const A = renderKey('A3', {i: 9});  
				const whiteWidth = getElementHeight(container, 'number') * 0.2;
				const left_a = whiteWidth * 5 + 'px';
				expect(A.style.left).toEqual(left_a)
			})

			it('B', () => {
				const B = renderKey('B3', {i: 11}); 
				const whiteWidth = getElementHeight(container, 'number') * 0.2;
				const left_b = whiteWidth * 6 + 'px';
				expect(B.style.left).toEqual(left_b)
			})
		})

		describe('black keys => should have offset value of  current i * black key width', () => {
			it('Db', () => { 
				const Db = renderKey('Db', {i: 1});  

				const containerHeight = getElementHeight(container, 'number');
				const whiteWidth = containerHeight * 0.2;
				const blackWidth = whiteWidth * (BLACK_WIDTH / WHITE_WIDTH);

				const left = 1 * blackWidth + 'px'; 
				expect(Db.style.left).toEqual(left)  
			})

			it('Eb', () => {   
				const Eb = renderKey('Eb', {i: 3});  

				const containerHeight = getElementHeight(container, 'number');
				const whiteWidth = containerHeight * 0.2;
				const blackWidth = whiteWidth * (BLACK_WIDTH / WHITE_WIDTH);
 
				const left = 3 * blackWidth + 'px'; 
				expect(Eb.style.left).toEqual(left)  
			})

			it('Gb', () => {  
				const Gb = renderKey('Gb', {i: 6});  

				const containerHeight = getElementHeight(container, 'number');
				const whiteWidth = containerHeight * 0.2;
				const blackWidth = whiteWidth * (BLACK_WIDTH / WHITE_WIDTH);
 
				const left = 6 * blackWidth + 'px'; 
				expect(Gb.style.left).toEqual(left)  
			})

			it('Ab', () => {  
				const Ab = renderKey('Ab', {i: 8});  

				const containerHeight = getElementHeight(container, 'number');
				const whiteWidth = containerHeight * 0.2;
				const blackWidth = whiteWidth * (BLACK_WIDTH / WHITE_WIDTH);
 
				const left = 8 * blackWidth + 'px'; 
				expect(Ab.style.left).toEqual(left)  
			})

			it('Bb', () => {  
				const Bb = renderKey('Bb', {i: 10});

				const containerHeight = getElementHeight(container, 'number');
				const whiteWidth = containerHeight * 0.2;
				const blackWidth = whiteWidth * (BLACK_WIDTH / WHITE_WIDTH);
 
				const left = 10 * blackWidth + 'px'; 
				expect(Bb.style.left).toEqual(left)  
			})
		})
	})
})

describe('on size change', () => {
	describe('expand', () => {
		describe('white key', () => {
			it('width should be 20% of height', () => {
				const keyName = 'C3'; 
				const key = renderKey(keyName); 
		 
				container.style.width = '1000px';
				container.style.height = '1000px';

				act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })
				const keyWidth = getElementWidth(key);
				const targetWidth = 1000 * 0.2 + 'px';

				expect(keyWidth).toEqual(targetWidth)
			})

			it('height should be 100% of container', () => {
				const keyName = 'C3'; 
				const key = renderKey(keyName); 
		 
				container.style.width = '1000px';
				container.style.height = '1000px';

				act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })
				const keyHeight = getElementHeight(key);
				const targetHeight = '1000px';

				expect(keyHeight).toEqual(targetHeight)
			})
		})

		describe('black key', () => {
			describe('black key', () => {
				it('width should be whiteWidth (20% of height) * (blackWidth/whiteWidth)', () => {
					const keyName = 'C3#';
					const key = renderKey(keyName);

					container.style.width = '1000px';
					container.style.height = '1000px';

					act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

					const containerHeight = getElementHeight(container, 'number');
					
					const keyWidth = getElementWidth(key, 'number').toFixed(4);
					const targetKeyWidth = (containerHeight * 0.2 * (BLACK_WIDTH / WHITE_WIDTH)).toFixed(4);
			 		 
					expect(keyWidth).toEqual(targetKeyWidth)
				})

				it('height be 65% of container height', () => {
					const keyName = 'C3#';
					const key = renderKey(keyName);

					container.style.width = '1000px';
					container.style.height = '1000px';

					act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

					const containerHeight = getElementHeight(container, 'number');
					
					const keyHeight = getElementHeight(key, 'number');
					const targetHeight = containerHeight * 0.65;
			 		 
					expect(keyHeight).toEqual(targetHeight)
				})
			})
		}) 
	})

	describe('shrink', () => {
		 describe('white key', () => {
			it('width should be 20% of height', () => {
				const keyName = 'C3'; 
				const key = renderKey(keyName); 
		 
				container.style.width = '100px';
				container.style.height = '100px';

				act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })
				const keyWidth = getElementWidth(key);
				const targetWidth = 100 * 0.2 + 'px';

				expect(keyWidth).toEqual(targetWidth)
			})

			it('height should be 100% of container', () => {
				const keyName = 'C3'; 
				const key = renderKey(keyName); 
		 
				container.style.width = '1000px';
				container.style.height = '1000px';

				act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })
				const keyHeight = getElementHeight(key);
				const targetHeight = '1000px';

				expect(keyHeight).toEqual(targetHeight)
			})
		})

		describe('black key', () => {
			describe('black key', () => {
				it('width should be whiteWidth (20% of container height) * (blackWidth/whiteWidth)', () => {
					const keyName = 'C3#';
					const key = renderKey(keyName);

					container.style.width = '100px';
					container.style.height = '100px';

					act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

					const containerHeight = getElementHeight(container, 'number');
					
					const keyWidth = getElementWidth(key, 'number').toFixed(4);
					const targetKeyWidth = (containerHeight * 0.2 * (BLACK_WIDTH / WHITE_WIDTH)).toFixed(4);
			 		 
					expect(keyWidth).toEqual(targetKeyWidth)
				})

				it('height be 65% of container height', () => {
					const keyName = 'C3#';
					const key = renderKey(keyName);

					container.style.width = '100px';
					container.style.height = '100px';

					act(() => { key.dispatchEvent(new CustomEvent("resizetrigger", { bubbles: true })) })

					const containerHeight = getElementHeight(container, 'number');
					
					const keyHeight = getElementHeight(key, 'number');
					const targetHeight = containerHeight * 0.65;
			 		 
					expect(keyHeight).toEqual(targetHeight)
				})
			})
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

