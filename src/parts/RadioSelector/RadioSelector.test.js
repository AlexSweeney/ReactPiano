import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, isElementOfType, Simulate } from 'react-dom/test-utils';
import { getElement } from '../../utils/utils.js';
import RadioSelector from './RadioSelector.jsx';

// ========================================== Consts / vars ======================================= //
let container; 

const value = 'value-1-string';
const labelValue = 'value 1 string';
const defaultValue = value;
const radioId = `${value}-radio`;
const labelId = `${value}-label`;

// ========================================== Setup / Teardown ===================================== //
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container)
})

afterEach(() => {
	unmountComponentAtNode(container)
})

// ========================================== Tests --------======================================= //
describe('<RadioSelector>', () => {
	describe('on render', () => {
		it('should render', () => {
			act(() => { render(<RadioSelector value={value}/>, container)})
			const radioSelector = getElement(radioId);

			expect(isElementOfType(radioSelector, RadioSelector))
		})

		it('should display value with dashes (-) removed', () => {
			act(() => { render(<RadioSelector value={value}/>, container)})
			const labelElement = getElement(labelId);
 
			expect(labelElement.textContent).toEqual(labelValue)
		})

		it('if props.value === props.defaultValue defaultChecked should be true', () => {
			act(() => { render(<RadioSelector value={value} defaultValue={defaultValue}/>, container)})
			const radioSelector = getElement(radioId);

			expect(radioSelector.defaultChecked).toBe(true)
		})
	})

	describe('on click', () => {
		it('should trigger props.handleClick(value) on click', () => {
			const handleClick = jest.fn();

			act(() => { render(<RadioSelector value={value} handleClick={handleClick}/>, container)})
			const radioSelector = getElement(radioId);

			act(() => { Simulate.click(radioSelector)})

			expect(handleClick).toHaveBeenCalledWith(value)
		})
	})
})