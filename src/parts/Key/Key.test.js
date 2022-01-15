import React from 'react'; 
import { render, cleanup, screen, fireEvent  } from '@testing-library/react';
import { isElementOfType } from 'react-dom/test-utils';   
import Key from './Key.jsx';  
import { getElement } from '../../utils/utils.js';

import { 
	WHITE_KEYS,
	BLACK_KEYS,
	ALL_KEYS, 
} from '../../utils/testUtils.js';

function makeTable(array) {
	return array.map(item => [item]);
}

// ============================================ Set up / tear down ================================ //
afterEach(() => {
	cleanup()
})

// ============================================ Mocks ============================================= //
jest.mock('../../utils/utils.js'); 

// ============================================ Tests ============================================= //
describe('<Key>', () => {
	describe('can render', () => { 
		test.each(makeTable(ALL_KEYS)) ('%s', (thisKeyName) => {
			const {container} = render(<Key keyName={thisKeyName}/>);
			const thisKeyElement = container.querySelector('.key');
	
			expect(isElementOfType(thisKeyElement, Key)); 
		}) 
	})

	describe('on render', () => {  
		describe('key color', () => {
			describe('white keys should have class "white-key"', () => {
				test.each(makeTable(WHITE_KEYS))('%s', (thisKeyName) => {
					const {container} = render(<Key keyName={thisKeyName}/>);
					const thisKeyElement = container.querySelector('.key');
					
					expect(thisKeyElement.className).toContain('white-key') 
				}) 
			})

			describe('black keys should have class "black-key"', () => {
				test.each(makeTable(BLACK_KEYS))('%s', (thisKeyName) => {
					const {container} = render(<Key keyName={thisKeyName}/>);
					const thisKeyElement = container.querySelector('.key');
					
					expect(thisKeyElement.className).toContain('black-key') 
				}) 
			}) 
		})
		
		describe('cursor class', () => {
			it('should have class "key-out"', () => { 
				const {container} = render(<Key keyName="C3"/>);
				const keyElement = container.querySelector('.key');

				expect(keyElement.className).toContain('key-out')
			}) 
		})

		describe('size', () => {
			it('should have passed width', () => {
				const width = '50px';
				const {container} = render(<Key keyName="C3" width={width}/>);
				const keyElement = container.querySelector('.key');

				expect(keyElement.style.width).toEqual(width)
			})

			it('should have passed height', () => {
				const height = '50px';
				const {container} = render(<Key keyName="C3" height={height}/>);
				const keyElement = container.querySelector('.key');

				expect(keyElement.style.height).toEqual(height)
			}) 

			it('should have passed left', () => {
				const left = '50px';
				const {container} = render(<Key keyName="C3" left={left}/>);
				const keyElement = container.querySelector('.key');

				expect(keyElement.style.left).toEqual(left)
			})  
		})
	}) 

	describe('on over', () => {
		it('should have class "key-over"', () => {
			const {container} = render(<Key keyName="C3"/>);
			const keyElement = container.querySelector('.key');
 
			fireEvent.mouseOver(keyElement);
		  expect(keyElement.className).toContain('key-over')
		})

		it('should call handleOver function', () => {	 
			const handleOver = jest.fn(); 

			const {container} = render(<Key keyName="C3" handleOver={handleOver}/>);
			const keyElement = container.querySelector('.key'); 

			fireEvent.mouseOver(keyElement); 
			expect(handleOver).toHaveBeenCalled()
		})
	})

	describe('on out', () => {
		describe('mouse up', () => {
			it('should have class "key-out"', () => {
				const {container} = render(<Key keyName="C3"/>);
				const keyElement = container.querySelector('.key'); 

				fireEvent.mouseOver(keyElement);
				fireEvent.mouseOut(keyElement);

				expect(keyElement.className).toContain('key-out') 
			}) 

			it('should call handleOut function', () => {
				const handleOut = jest.fn();
				const {container} = render(<Key keyName="C3" handleOut={handleOut}/>);
				const keyElement = container.querySelector('.key'); 

				fireEvent.mouseOver(keyElement);
				fireEvent.mouseOut(keyElement);

				expect(handleOut).toHaveBeenCalled() 
			}) 
		})

		describe('mouse down', () => {
			it('should have class "key-out"', () => { 
				const {container} = render(<Key keyName="C3"/>);
				const keyElement = container.querySelector('.key'); 

				fireEvent.mouseOver(keyElement);
				fireEvent.mouseDown(keyElement);
				fireEvent.mouseOut(keyElement);

				expect(keyElement.className).toContain('key-out') 
			}) 

			it('should call handleOut function', () => {
				const handleOut = jest.fn();
				const {container} = render(<Key keyName="C3" handleOut={handleOut}/>);
				const keyElement = container.querySelector('.key'); 

				fireEvent.mouseOver(keyElement);
				fireEvent.mouseDown(keyElement);
				fireEvent.mouseOut(keyElement);

				expect(handleOut).toHaveBeenCalled() 
			}) 
		}) 
	})

	describe('on down', () => {
		it('should have class "key-down"', () => {
			const {container} = render(<Key keyName="C3"/>);
			const keyElement = container.querySelector('.key'); 

			fireEvent.mouseOver(keyElement)
			fireEvent.mouseDown(keyElement)

			expect(keyElement.className).toContain('key-down') 
		}) 
		 
		it('should call handleDown function', () => {
			const handleDown = jest.fn();
			const {container} = render(<Key keyName="C3" handleDown={handleDown}/>);
			const keyElement = container.querySelector('.key'); 

			fireEvent.mouseOver(keyElement)
			fireEvent.mouseDown(keyElement)

			expect(handleDown).toHaveBeenCalled() 
		}) 
	}) 
})