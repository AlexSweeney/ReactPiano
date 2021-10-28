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
jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

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
				// render
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				// select mode
				const showKeyModeButton = getElement(showKeyModeButtonId);
				act(() => Simulate.click(showKeyModeButton))

				// check display
				const pianoDisplay = getElement(pianoDisplayId);
				expect(pianoDisplay.textContent).toEqual('')
			})
		})

		describe('on key hover', () => {
			it('should show hovered key on display', async () => {
				// render
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				// select mode
				const showKeyModeButton = getElement(showKeyModeButtonId);
				act(() => Simulate.click(showKeyModeButton))

				// check display
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
				// render
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				// select mode
				const showKeyModeButton = getElement(showKeyModeButtonId);
				act(() => Simulate.click(showKeyModeButton))

				// check display
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
			it('should play note', async () => {
				// render
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				// select mode
				const showKeyModeButton = getElement(showKeyModeButtonId);
				act(() => Simulate.click(showKeyModeButton))

 				// click keys
				keyNames.forEach((keyName, i) => {
					const keyAudio = getElement(`${keyName}-audio`);
					const playFn = jest.fn();
					keyAudio.play = playFn;

					const key = getElement(`key-${keyName}`);
 						
					act(() => Simulate.mouseOver(key))
					act(() => Simulate.mouseDown(key)) 

					expect(playFn).toHaveBeenCalledTimes(1)
				})
			})
		})

		describe('on key up', () => {
			describe('if over key', () => {
				it('should show hovered key on display', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const showKeyModeButton = getElement(showKeyModeButtonId);
					act(() => Simulate.click(showKeyModeButton))

					// check display
					const pianoDisplay = getElement(pianoDisplayId);
	 
					keyNames.forEach(keyName => {
						const key = getElement(`key-${keyName}`);
						const keyAudio = getElement(`${keyName}-audio`);
						keyAudio.play = () => {};

						act(() => Simulate.mouseOver(key))
						act(() => Simulate.mouseDown(key))
						act(() => Simulate.mouseUp(key))
						expect(pianoDisplay.textContent).toEqual(keyName)
					})
				})
			})

			describe('if not over key', () => {
				it('should not show hovered key on display', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const showKeyModeButton = getElement(showKeyModeButtonId);
					act(() => Simulate.click(showKeyModeButton))

					// check display
					const pianoDisplay = getElement(pianoDisplayId);
	 
					keyNames.forEach(keyName => {
						const key = getElement(`key-${keyName}`);
						const keyAudio = getElement(`${keyName}-audio`);
						keyAudio.play = () => {};

						act(() => Simulate.mouseOver(key))
						act(() => Simulate.mouseDown(key))
						act(() => Simulate.mouseOut(key))
						act(() => Simulate.mouseUp(key))
						expect(pianoDisplay.textContent).toEqual('')
					})
				})
			})
		})
	})

	describe('on select key mode', () => {
		describe('on turn start', () => {
			it('should show target key in display', async () => {
				// render
				await act(async () => { render(<PianoApp/>, container)}) 
				const app = getElement(pianoId);

				// select mode
				const selectKeyModeButton = getElement(selectKeyModeButtonId);
				act(() => Simulate.click(selectKeyModeButton))

				// check display
				const pianoDisplay = getElement(pianoDisplayId); 
				expect(keyNames).toContain(pianoDisplay.textContent) 
			})
		}) 

		describe('on key press', () => {
			describe('on press incorrect', () => {
				it('should play key sound', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))
 
	 				// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;

					keyNames.forEach(keyName => { 
						if(keyName !== targetKey) {
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							const key = getElement(`key-${keyName}`);
		 						
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
 
							expect(keyAudioPlay).toHaveBeenCalledTimes(1)
						} 
					})
				})

				it('should add incorrect class and then remove after 1000ms delay', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))

					// incorrect audio
					const incorrectAudio = getElement('incorrectSound-audio'); 
					const incorrectSoundPlay = jest.fn();
					incorrectAudio.play = incorrectSoundPlay;

					// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;
	 			
	 				keyNames.forEach(keyName => { 
						if(keyName !== targetKey) {
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							const key = getElement(`key-${keyName}`); 
							const classListAddSpy = jest.spyOn(key.classList, 'add');
							const classListRemoveSpy = jest.spyOn(key.classList, 'remove')

							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
 							 
 							expect(classListAddSpy).toHaveBeenCalledWith('incorrect')
 							expect(classListRemoveSpy).not.toHaveBeenCalled()
 							jest.advanceTimersByTime(1000)
 							expect(classListRemoveSpy).toHaveBeenCalledWith('incorrect') 
						} 
					})
				}) 

				it('should play incorrect sound after 750ms delay', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))
 
					// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;
	 			
	 				keyNames.forEach(keyName => {
						if(keyName !== targetKey) {
							// incorrect audio
							const incorrectAudio = getElement('incorrectSound-audio'); 
							incorrectAudio.play = jest.fn(); 
							const incorrectAudioPlaySpy = jest.spyOn(incorrectAudio, 'play'); 

							// Key Audio
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							// Key
							const key = getElement(`key-${keyName}`);
		 						
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
							
							expect(incorrectAudioPlaySpy).toHaveBeenCalledTimes(0)
							jest.advanceTimersByTime(750)
							expect(incorrectAudioPlaySpy).toHaveBeenCalledTimes(1)
						} 
					})
				})
			})

			describe.only('on press correct', () => {
				it('should play key sound', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))
 
					// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;
	 			
	 				keyNames.forEach(keyName => {
						if(keyName === targetKey) {
							// incorrect audio
							const correctAudio = getElement('correctSound-audio'); 
							correctAudio.play = jest.fn(); 
							const correctAudioPlaySpy = jest.spyOn(correctAudio, 'play'); 

							// Key Audio
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							// Key
							const key = getElement(`key-${keyName}`);
		 						
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key))  

							expect(keyAudioPlay).toHaveBeenCalledTimes(1)
						} 
					})
				})

				it('should flash add "correct" class to key, and remove after 1000ms', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))

					// incorrect audio
					const correctAudio = getElement('correctSound-audio'); 
					const correctSoundPlay = jest.fn();
					correctAudio.play = correctSoundPlay;

					// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;
	 			
	 				keyNames.forEach(keyName => { 
						if(keyName === targetKey) {
							// key audio
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							// key
							const key = getElement(`key-${keyName}`); 
							const classListAddSpy = jest.spyOn(key.classList, 'add');
							const classListRemoveSpy = jest.spyOn(key.classList, 'remove')

							// click
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
 							
 							// check
 							expect(classListAddSpy).toHaveBeenCalledWith('correct')
 							expect(classListRemoveSpy).not.toHaveBeenCalled()
 							jest.advanceTimersByTime(1000)
 							expect(classListRemoveSpy).toHaveBeenCalledWith('correct') 
						} 
					})
				})

				it('should play correct sound after 750ms seconds', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))
 
					// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;
	 			
	 				keyNames.forEach(keyName => {
						if(keyName === targetKey) {
							// correct audio
							const correctAudio = getElement('correctSound-audio'); 
							correctAudio.play = jest.fn(); 
							const correctAudioPlaySpy = jest.spyOn(correctAudio, 'play'); 

							// Key Audio
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							// Key
							const key = getElement(`key-${keyName}`);
		 						
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
							
							// check
							expect(correctAudioPlaySpy).toHaveBeenCalledTimes(0)
							jest.advanceTimersByTime(750)
							expect(correctAudioPlaySpy).toHaveBeenCalledTimes(1)
						} 
					})
				})

				it('should add new target key to piano display after 2001ms', async () => {
					// render
					await act(async () => { render(<PianoApp/>, container)}) 
					const app = getElement(pianoId);

					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))
 	
					// piano display
					const pianoDisplay = getElement(pianoDisplayId);

					// click keys
	 				const targetKey = pianoDisplay.textContent;
	 			
	 				keyNames.forEach(keyName => {
						if(keyName === targetKey) {
							// correct audio
							const correctAudio = getElement('correctSound-audio'); 
							correctAudio.play = jest.fn(); 
							const correctAudioPlaySpy = jest.spyOn(correctAudio, 'play'); 

							// Key Audio
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							// Key
							const key = getElement(`key-${keyName}`);
		 						
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
							
							// check before
							expect(pianoDisplay.textContent).toEqual(targetKey)

							// check after
							act(() => { jest.advanceTimersByTime(2001) })
							expect(pianoDisplay.textContent).not.toEqual(targetKey) 
							expect(keyNames).toContain(pianoDisplay.textContent)
						} 
					})
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