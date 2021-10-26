import React from 'react';
import {render} from 'react-dom';
import {act, isElementOfType, Simulate} from 'react-dom/test-utils';
import PianoDisplay from './PianoDisplay.jsx';
import { getElement } from './utils.js';

// ========================================= Consts and Vars ========================================= //
let container;
const pianoDisplayId = 'piano-display';
const playButtonId = 'play-button';

// ================ Props
const displayString = 'this is a display string';
let showPlayButton = false;
let handlePlayButtonClick = null;
let playButtonDown = false;

// ========================================= Helper Fns ============================================== //
function renderPianoDisplay() {
	const props = {
		displayString,
		showPlayButton,
		handlePlayButtonClick,
		playButtonDown,
	}

	act(() => { render(<PianoDisplay {...props}/>, container)})
	
	const pianoDisplay = getElement(pianoDisplayId);
	return pianoDisplay;
}

// ========================================= Setup / Teardown ======================================== //
beforeEach(() => {
	handlePlayButtonClick = jest.fn();

	container = document.createElement('div');
	document.body.appendChild(container)
})

afterEach(() => {
	handlePlayButtonClick = null;

	document.body.removeChild(container)
	container = null;
})

// ========================================= Tests =================================================== //
describe('<PianoDisplay/>', () => {
	describe('on render', () => {
		it('should render', () => {
			const pianoDisplay = renderPianoDisplay();

			expect(isElementOfType(pianoDisplay, PianoDisplay))
		})

		describe('if showPlayButton true', () => {
			it('should show PlayButton', () => {
				showPlayButton = true;
				const pianoDisplay = renderPianoDisplay();
				const playButton = pianoDisplay.querySelector(`#${playButtonId}`);

				expect(playButton)
			})
		})

		describe('if showPlayButton false', () => {
			it('should show displayString', () => {
				showPlayButton = false;
				const pianoDisplay = renderPianoDisplay();

				expect(pianoDisplay.textContent).toEqual(displayString) 
			})
		})
	})

	describe('on click play button', () => {
		it('should call handlePlayButtonClick', () => {
			showPlayButton = true;
			const pianoDisplay = renderPianoDisplay();
			const playButton = pianoDisplay.querySelector(`#${playButtonId}`);

			act(() => Simulate.click(playButton))

			expect(handlePlayButtonClick).toHaveBeenCalled()
		})
	})
})