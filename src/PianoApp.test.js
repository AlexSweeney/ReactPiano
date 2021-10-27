import React from 'react';
import {render} from 'react-dom';
import {act, isElementOfType, Simulate} from 'react-dom/test-utils';
import { getElement } from './components/utils.js';
import PianoApp from './PianoApp.jsx';
import ModeSelect from './components/ModeSelect.jsx';
import PianoDisplay from './components/PianoDisplay.jsx';
import VolumeControl from './components/VolumeControl.jsx';
import Keys from './components/Keys.jsx';

let container;
const pianoId = 'piano-app';
const modeSelectId = 'mode-select';
const pianoDisplayId = 'piano-display';
const volumeControlId = 'volume-control';

const showKeyModeButtonId = 'show-key-radio';
const selectKeyModeButtonId = 'select-key-radio';
const selectKeyByEarId = 'select-key-by-ear-radio';

const keysId = 'keys';
const keyNames = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 

jest.mock('./components/utils.js')

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container)
})

afterEach(() => {
	document.body.removeChild(container)
	container = null; 
})

describe('<PianoApp/>', () => {
	describe('on render', () => {
		it('should render', async () => {
			await act(async () => { render(<PianoApp/>, container)}) 
			const app = getElement(pianoId);

			expect(isElementOfType(app, PianoApp))
		})

		it('should show mode selector', async () => {
			await act(async () => { render(<PianoApp/>, container)}) 
			const modeSelect = getElement(modeSelectId);

			expect(isElementOfType(modeSelect, ModeSelect))
		})

		it('should show feedback display', async () => {
			await act(async () => { render(<PianoApp/>, container)}) 
			const pianoDisplay = getElement(pianoDisplayId);

			expect(isElementOfType(pianoDisplay, PianoDisplay))
		})

		it('should show volume slide', async () => {
			await act(async () => { render(<PianoApp/>, container)}) 
			const volumeControl = getElement(pianoDisplayId);

			expect(isElementOfType(volumeControl, VolumeControl))
		})

		it('should show keys', async () => {
			await act(async () => { render(<PianoApp/>, container)}) 
			const keys = getElement(keysId);

			expect(isElementOfType(keys, Keys))
		})
	})
	
	test.todo('on load audio error')
	/*describe('on load audio error', () => {
		it('should show overlay with error information', () => {

		})
	})*/

	describe('on show key mode', () => {
		describe('on start', () => {
			it('should not show any key on display', async () => {
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				const showKeyModeButton = getElement(showKeyModeButtonId);
				act(() => Simulate.click(showKeyModeButton))

				const pianoDisplay = getElement(pianoDisplayId);

				expect(pianoDisplay.textContent).toEqual('')
			})
		})

		describe('on key hover', () => {
			it('should show hovered key on display', async () => {
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				const showKeyModeButton = getElement(showKeyModeButtonId);
				act(() => Simulate.click(showKeyModeButton))

				const pianoDisplay = getElement(pianoDisplayId);
 
				keyNames.forEach(keyName => {
					const key = getElement(`key-${keyName}`);
					act(() => Simulate.mouseOver(key))
					expect(pianoDisplay.textContent).toEqual(keyName)
				})
			})
		})

		describe('on key out', () => {
			it('should not show any key on display', async () => {
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				const showKeyModeButton = getElement(showKeyModeButtonId);
				act(() => Simulate.click(showKeyModeButton))

				const pianoDisplay = getElement(pianoDisplayId);
 
				keyNames.forEach(keyName => {
					const key = getElement(`key-${keyName}`);
					act(() => Simulate.mouseOver(key))
					act(() => Simulate.mouseOut(key))
					expect(pianoDisplay.textContent).toEqual('')
				})
			})
		})

		describe('on key down', () => {
			it.only('should play note', async () => {
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				const showKeyModeButton = getElement(showKeyModeButtonId);
				act(() => Simulate.click(showKeyModeButton))

				const pianoDisplay = getElement(pianoDisplayId);
 
				keyNames.forEach((keyName, i) => {
					if(i > 0) return;
					const keyAudio = getElement(`${keyName}-audio`);
					const key = getElement(`key-${keyName}`);
 					
 					// console.log(keyAudio)
					// const spy = jest.spyOn(keyAudio, 'play')

					act(() => Simulate.mouseOver(key))
					act(() => Simulate.mouseDown(key)) 

					// expect(spy).toHaveBeenCalled()
					// spy.mockRestore();
				})
			})
		})

		describe('on key up', () => {

		})
	})

	describe('on select key mode', () => {
		describe('on turn start', () => {
			it('should show target key in display', () => {

			})
		})
		

		describe('on key press', () => {
			describe('on press incorrect', () => {
				it('should play incorrect sound', () => {

				})

				it('should flash key red', () => {

				})
			})

			describe('on press correct', () => {
				it('should play correct sound', () => {
					
				})

				it('should flash key green', () => {

				})

				it('should display new target key in display', () => {

				})
			})
		})
	})

	describe('on select key by ear mode', () => {
		describe('on turn start', () => {
			it('should play target key', () => {

			})
		})
		 
		describe('on key press', () => {
			describe('on press incorrect', () => {
				it('should play incorrect sound', () => {

				})

				it('should flash key red', () => {

				})
			})

			describe('on press correct', () => {
				it('should play correct sound', () => {
					
				})

				it('should flash key green', () => {

				})

				it('should display target key name', () => {

				})

				it('should play new target key sound', () => {

				})
			})
		})
	})

	test.todo('on resize')
/*	describe('on resize', () => {
		describe('on shrink', () => {
			it('should keep proportions', () => {

			})
		})

		describe('on expand', () => {
			it('should keep proportions', () => {
				
			})
		})
	})*/
})