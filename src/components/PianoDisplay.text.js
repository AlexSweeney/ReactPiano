import React from 'react';
import {render} from 'react-dom';
import {act, Simulate} from 'react-dom/test-utils';
import PianoDisplay from './PianoDisplay.jsx';

let container;
const pianoDisplayId = 'piano-display';

const displayString = 'hello-world';
let showPlayButton = false;
let handlePlayButtonClick = null;
let playButtonDown = false;

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


			})
		})

		describe('if showPlayButton false', () => {
			it.only('should show displayString', () => {
				showPlayButton = false;
				const pianoDisplay = renderPianoDisplay();

				console.log(pianoDisplay)
				console.log(pianoDisplay.textContent)
			})
		})
	})

	describe('on click play button', () => {
		it('should call handlePlayButtonClick', () => {

		})
	})
})