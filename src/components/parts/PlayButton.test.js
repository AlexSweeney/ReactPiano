import React from 'react';
import { render } from 'react-dom';  
import { act, isElementOfType, Simulate } from 'react-dom/test-utils';
import { getElement } from './../utils.js';
import PlayButton from './PlayButton.jsx';

// ============================================ Consts ============================================//
let container;
const playButtonId = 'play-button';

// ============================================ Set up / tear down ================================//
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container)
})

afterEach(() => {
	document.body.removeChild(container)
	container = null;
})

// ============================================ Tests =============================================//
describe('<PlayButton/>', () => {
	describe('on render', () => {
		it('should render', () => {
			act(() => { render(<PlayButton />, container)})
			const playButton = getElement(playButtonId);

			expect(isElementOfType(playButton, PlayButton))
		}) 

		it('should have class "play-button-down" if props.playButtonDown true', () => {
			act(() => { render(<PlayButton playButtonDown={true}/>, container)})
			const playButton = getElement(playButtonId);

			expect(playButton.classList).toContain('play-button-down')
		})
	})

	describe('on click', () => {
		it('should call handle click fn', () => {
			const handleClick = jest.fn();
			act(() => { render(<PlayButton handleClick={handleClick} />, container)})
			const playButton = getElement(playButtonId);

			act(() => { Simulate.click(playButton) })
			expect(handleClick).toHaveBeenCalled()
		})
	})
})