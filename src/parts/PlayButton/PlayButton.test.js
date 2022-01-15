import React from 'react';
import { render, cleanup, fireEvent  } from '@testing-library/react';
import { isElementOfType } from 'react-dom/test-utils';
import PlayButton from './PlayButton.jsx';

// ============================================ Set up / tear down ================================//
afterEach(() => {
	cleanup()
})

// ============================================ Tests =============================================//
describe('<PlayButton/>', () => {
	describe('on render', () => {
		it('should render', () => {
			const {container} = render(<PlayButton/>);
			const playButtonElement = container.querySelector('#play-button'); 

			expect(isElementOfType(playButtonElement, PlayButton))
		}) 

		it('should have class "play-button-down" if props.playButtonDown true', () => {
			const playButtonDown = true;
			const {container} = render(<PlayButton playButtonDown={playButtonDown}/>);
			const playButtonElement = container.querySelector('#play-button'); 

			expect(playButtonElement.classList).toContain('play-button-down') 
		})
	})

	describe('on click', () => {
		it('should call handle click fn', () => {
			const handleClick = jest.fn();
			const {container} = render(<PlayButton handleClick={handleClick}/>);
			const playButtonElement = container.querySelector('#play-button'); 

			fireEvent.click(playButtonElement)

			expect(isElementOfType(playButtonElement, PlayButton)) 
		})
	})
})