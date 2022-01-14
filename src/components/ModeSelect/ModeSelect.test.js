import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import ModeSelect from './ModeSelect.jsx';
import RadioSelector from './parts/RadioSelector.jsx';
import {act, isElementOfType, Simulate} from 'react-dom/test-utils';
import { getElement } from './utils.js';

let container;
let modeSelect;
let handleClick;

const modeSelectId = 'mode-select';
const modes = ['mode-1-label', 'mode-2-label', 'mode-3-label', 'mode-4-label', 'mode-5-label'];
const labels = ['mode 1 label', 'mode 2 label', 'mode 3 label', 'mode 4 label', 'mode 5 label'];

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container)

	handleClick = jest.fn();
	act(() => { render(<ModeSelect modes={modes} defaultMode={modes[0]} handleClick={handleClick}/>, container) })
	modeSelect = getElement(modeSelectId)
})

afterEach(() => {
	unmountComponentAtNode(container)
})

describe('<ModeSelect/>', () => {
	describe('on render', () => {
		it('should render', () => { 
			expect(isElementOfType(modeSelect, ModeSelect))
		})

		it('should render a radio selector for each mode', () => {
			modes.forEach(mode => {
				const radioId = `${mode}-radio`;
				const radio = getElement(radioId);

				expect(isElementOfType(radio, RadioSelector))
			})
		})

		it('radio selectors should display mode without dashes (-)', () => {
			modes.forEach((mode, i) => {
				const labelId = `${mode}-label`;
				const label = getElement(labelId);

				expect(label.textContent).toEqual(labels[i])
			})
		})
	})

	describe('on click mode radio', () => {
		it('should call handleClick', () => {
			modes.forEach((mode, i) => {
				const radioId = `${mode}-radio`;
				const radio = getElement(radioId);

				act(() => { Simulate.click(radio) })
				expect(handleClick).toHaveBeenCalledTimes(i + 1)
			})
		})
	})
})