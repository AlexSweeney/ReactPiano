import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
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
const playButtonId = 'play-button';

const showKeyModeButtonId = 'show-key-radio';
const selectKeyModeButtonId = 'select-key-radio';
const selectKeyByEarId = 'select-key-by-ear-radio';

const keysId = 'keys';
const keyNames = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 

jest.mock('./components/utils.js') 
jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

beforeEach(async () => {
	container = document.createElement('div');
	document.body.appendChild(container) 

	await act(async () => { render(<PianoApp/>, container)}) 

	// mock audio.play 
	const audioTags = Array.from(container.getElementsByTagName('audio'))
	audioTags.forEach(audioTag => {
		audioTag.play = () => {};
	})
})

afterEach(() => {   
	act(() => jest.runAllTimers())
	unmountComponentAtNode(container)
})

async function renderPiano() {
	await act(async () => { render(<PianoApp/>, container)}) 

	// mock audio.play 
	const audioTags = Array.from(container.getElementsByTagName('audio'))
	audioTags.forEach(audioTag => {
		audioTag.play = () => {};
	})
}

describe('<PianoApp/>', () => {
	describe('on render', () => {
		it('should render', async () => {
			const app = getElement(pianoId);

			expect(isElementOfType(app, PianoApp))
		})

		it('should show mode selector', async () => {
			const modeSelect = getElement(modeSelectId);

			expect(isElementOfType(modeSelect, ModeSelect))
		})

		it('should show feedback display', async () => {
			const pianoDisplay = getElement(pianoDisplayId);

			expect(isElementOfType(pianoDisplay, PianoDisplay))
		})

		it('should show volume slide', async () => {
			const volumeControl = getElement(pianoDisplayId);

			expect(isElementOfType(volumeControl, VolumeControl))
		})

		it('should show keys', async () => {
			const keys = getElement(keysId);

			expect(isElementOfType(keys, Keys))
		})
	})
	
	test.todo('on load audio error') 

	describe('on show key mode', () => {
		describe('on start', () => {
			it('should not show any key on display', async () => {
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
					// select mode
					const showKeyModeButton = getElement(showKeyModeButtonId);
					act(() => Simulate.click(showKeyModeButton))

					// check display
					const pianoDisplay = getElement(pianoDisplayId);
	 
					keyNames.forEach(keyName => {
						const key = getElement(`key-${keyName}`); 

						act(() => Simulate.mouseOver(key))
						act(() => Simulate.mouseDown(key))
						act(() => Simulate.mouseUp(key))
						expect(pianoDisplay.textContent).toEqual(keyName)
					})
				})
			})

			describe('if not over key', () => {
				it('should not show hovered key on display', async () => {
					// select mode
					const showKeyModeButton = getElement(showKeyModeButtonId);
					act(() => Simulate.click(showKeyModeButton))

					// check display
					const pianoDisplay = getElement(pianoDisplayId);
	 
					keyNames.forEach(keyName => {
						const key = getElement(`key-${keyName}`); 

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
			it('should show target key in display', () => {
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
				it('should play key sound', () => {
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

				it('should add incorrect class and then remove after 1000ms delay', () => {
					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton)) 

					// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;
	 			
	 				keyNames.forEach(keyName => { 
						if(keyName !== targetKey) {   
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

				it('should play incorrect sound after 750ms delay', () => {
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
							const incorrectAudioSpy = jest.spyOn(incorrectAudio, 'play'); 

							// Key Audio
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							// Key
							const key = getElement(`key-${keyName}`);
		 						
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
							
							expect(incorrectAudioSpy).toHaveBeenCalledTimes(0)
							jest.advanceTimersByTime(750)
							expect(incorrectAudioSpy).toHaveBeenCalledTimes(1)
						} 
					})
				})
			})

			describe('on press correct', () => {
				it('should play key sound', () => {
					// select mode
					const selectKeyModeButton = document.getElementById(selectKeyModeButtonId); 
					act(() => Simulate.click(selectKeyModeButton))
 
					// click keys
 					const targetKey = getElement(pianoDisplayId).textContent;
 			
 					keyNames.forEach(keyName => {
						if(keyName === targetKey) { 
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

				it('should add "correct" class to key, and remove after 1000ms', () => {
					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))
  
					// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;
	 			
	 				keyNames.forEach(keyName => { 
						if(keyName === targetKey) { 
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

				it('should play correct sound after 750ms seconds', () => {
					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))
 
					// click keys
	 				const targetKey = getElement(pianoDisplayId).textContent;
	 			
	 				keyNames.forEach(keyName => {
						if(keyName === targetKey) {
							// correct audio
							const correctAudio = getElement('correctSound-audio');  
							const correctAudioSpy = jest.spyOn(correctAudio, 'play'); 

							// Key Audio
							const keyAudio = getElement(`${keyName}-audio`);
							const keyAudioPlay = jest.fn();
							keyAudio.play = keyAudioPlay;

							// Key
							const key = getElement(`key-${keyName}`);
		 						
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
							
							// check
							expect(correctAudioSpy).toHaveBeenCalledTimes(0)
							jest.advanceTimersByTime(750)
							expect(correctAudioSpy).toHaveBeenCalledTimes(1)
						} 
					})
				})

				it('should add new target key to piano display after 2001ms', () => {
					// select mode
					const selectKeyModeButton = getElement(selectKeyModeButtonId);
					act(() => Simulate.click(selectKeyModeButton))
 	
					// piano display
					const pianoDisplay = getElement(pianoDisplayId);

					// click keys
	 				const targetKey = pianoDisplay.textContent;
	 			
	 				keyNames.forEach(keyName => {
						if(keyName === targetKey) { 
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
			it('should play target key', async () => {
				// listen for key sounds 
				const playFn = jest.fn();

				keyNames.forEach(keyName => {
					const key = getElement(keyName + '-audio');
					key.play = playFn;
				}) 

				// select mode
				const selectKeyByEarButton = getElement(selectKeyByEarId);
				act(() => Simulate.click(selectKeyByEarButton))

				// check sound played 
				expect(playFn).toHaveBeenCalledTimes(1)
			})
		})

		describe('on press play button', () => { 
			it('should play target key', () => {
				// listen for target key 
				let targetKey;

				keyNames.forEach(keyName => {
					const key = getElement(keyName + '-audio');
					key.play = () => { targetKey = keyName};
				}) 

				// select mode
				const selectKeyByEarButton = getElement(selectKeyByEarId);
				act(() => Simulate.click(selectKeyByEarButton))

				// listen on target key
				const targetAudio = getElement(targetKey + '-audio');
				const playSpy =	jest.spyOn(targetAudio, 'play');

				// press play button 
				const playButton = getElement(playButtonId);
				act(() => Simulate.click(playButton))

				// check
				expect(playSpy).toHaveBeenCalledTimes(1)
			})
		})
		 
		describe('on key press', () => {
			describe('on press incorrect', () => {
				it('should play key sound', async () => {
					// save target key when played on render
					let targetKey; 

					keyNames.forEach(keyName => {
						const key = getElement(keyName + '-audio');
						key.play = () => { targetKey = keyName };
					}) 

					// select mode 
					const selectKeyByEarButton = getElement(selectKeyByEarId);
					act(() => Simulate.click(selectKeyByEarButton))
  
					// press incorrect keys
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

				it('should play incorrect sound after 750ms', async () => {
					// save target key when played on render
					let targetKey;  

					keyNames.forEach(keyName => {
						const key = getElement(keyName + '-audio');
						key.play = () => { targetKey = keyName };
					}) 

					// select mode 
					const selectKeyByEarButton = getElement(selectKeyByEarId);
					act(() => Simulate.click(selectKeyByEarButton)) 

					// reset keyName play fns
					keyNames.forEach(keyName => {
						const key = getElement(keyName + '-audio');
						key.play = () => { };
					})

					// press incorrect key
					keyNames.forEach((keyName, i) => { 
						// if(i > 1) return;
						if(keyName !== targetKey) {   
							// spy on incorrect audio play
							const incorrectAudio = getElement('incorrectSound-audio');  
							incorrectAudio.play = jest.fn();
							const incorrectAudioSpy = jest.spyOn(incorrectAudio, 'play');  

							// press key
							const key = getElement(`key-${keyName}`);
			 						
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
 
	 						// check
							expect(incorrectAudioSpy).toHaveBeenCalledTimes(0)
							act(() => jest.advanceTimersByTime(750))
							expect(incorrectAudioSpy).toHaveBeenCalledTimes(1) 
						} 
					})
				})

				it('should add class "incorrect" and remove after 1000ms', async () => {
					// listen for target key
					let targetKey; 

					keyNames.forEach(keyName => {
						const keyAudio = getElement(keyName + '-audio');
						keyAudio.play = () => { targetKey = keyName };
					}) 

					// select mode
					const selectKeyByEarButton = getElement(selectKeyByEarId);
					act(() => Simulate.click(selectKeyByEarButton))

					// reset key.play fns
					keyNames.forEach(keyName => {
						const keyAudio = getElement(keyName + '-audio');
						keyAudio.play = () => {  };
					}) 

					getElement('incorrectSound-audio').play = () => {};

					// press incorrect keys
					keyNames.forEach(keyName => {
						if(keyName !== targetKey) {  
							// key
							const key = getElement(`key-${keyName}`); 
							const classListAddSpy = jest.spyOn(key.classList, 'add');
							const classListRemoveSpy = jest.spyOn(key.classList, 'remove')

							// click
							act(() => Simulate.mouseOver(key))
							act(() => Simulate.mouseDown(key)) 
	 							
	 						// check
	 						expect(classListAddSpy).toHaveBeenCalledWith('incorrect')
	 						expect(classListRemoveSpy).not.toHaveBeenCalled()
	 					 	act(() => jest.advanceTimersByTime(1000))
 							expect(classListRemoveSpy).toHaveBeenCalledWith('incorrect') 
 						} 
					})
				}) 
			})  

			describe('on press correct', () => {
				it('should play correct sound after 750ms seconds', async () => {
					// save target key when played on render
					let targetKey; 

					keyNames.forEach(keyName => {
						const key = getElement(keyName + '-audio');
						key.play = () => { targetKey = keyName; };
					}) 

					// select mode 
					const selectKeyByEarButton = getElement('select-key-by-ear-radio'); 
					act(() => Simulate.click(selectKeyByEarButton))   
  
					// spy on correct audio
					const correctAudio = getElement('correctSound-audio');  
					correctAudio.play = jest.fn();
					const correctAudioSpy = jest.spyOn(correctAudio, 'play'); 

					// click key
					const key = getElement(`key-${targetKey}`); 
					act(() => Simulate.mouseOver(key))
					act(() => Simulate.mouseDown(key)) 

					act(() => jest.advanceTimersByTime(750))

					// check 
					expect(correctAudioSpy).toHaveBeenCalledTimes(1) 
				})

				it('should add "correct" class to key, and remove after 1000ms', async () => {
					// save target key when played on render
					let targetKey; 

					keyNames.forEach(keyName => {
						const key = getElement(keyName + '-audio');
						key.play = () => { targetKey = keyName };
					}) 
  
					// select mode 
					const selectKeyByEarButton = getElement(selectKeyByEarId);
					act(() => Simulate.click(selectKeyByEarButton))

					const key = getElement(`key-${targetKey}`); 
					const classListAddSpy = jest.spyOn(key.classList, 'add');
					const classListRemoveSpy = jest.spyOn(key.classList, 'remove')

					// click
					act(() => Simulate.mouseOver(key))
					act(() => Simulate.mouseDown(key)) 
						
					// check
					expect(classListAddSpy).toHaveBeenCalledWith('correct')
					expect(classListRemoveSpy).not.toHaveBeenCalled()
					act(() => jest.advanceTimersByTime(1000))
					expect(classListRemoveSpy).toHaveBeenCalledWith('correct') 
				})

				it('should display target key name and remove and show play button after 3000ms', async () => {
					// save target key when played on render
					let targetKey; 

					keyNames.forEach(keyName => {
						const key = getElement(keyName + '-audio');
						key.play = () => { targetKey = keyName };
					}) 
  
					// select mode 
					const selectKeyByEarButton = getElement(selectKeyByEarId);
					act(() => Simulate.click(selectKeyByEarButton))

					// click
					const key = getElement(`key-${targetKey}`);
					act(() => Simulate.mouseOver(key))
					act(() => Simulate.mouseDown(key)) 
						
					// check
					const display = getElement('piano-display');
					expect(display.textContent).toEqual(targetKey)
					expect(getElement('play-button')).toEqual(null)

					act(() => jest.advanceTimersByTime(3000))
					expect(display.textContent).toEqual("")
					expect(getElement('play-button')).not.toEqual(null)
				})

				it('should play new target key sound after 3000ms', async () => {
					// save target key when played on render
					let targetKey; 

					keyNames.forEach(keyName => {
						const key = getElement(keyName + '-audio');
						key.play = () => { targetKey = keyName };
					}) 

					// select mode 
					const selectKeyByEarButton = getElement(selectKeyByEarId);
					act(() => Simulate.click(selectKeyByEarButton)) 

					// spy on audio
					const spyFn = jest.fn();

					keyNames.forEach(keyName => {
						const key = getElement(keyName + '-audio');
						key.play = spyFn;
					})  

					// click
					const key = getElement(`key-${targetKey}`); 
					act(() => Simulate.mouseOver(key))
					act(() => Simulate.mouseDown(key)) 
						
					// check 
					expect(spyFn).toHaveBeenCalledTimes(1)
					act(() => jest.advanceTimersByTime(3000)) 
					expect(spyFn).toHaveBeenCalledTimes(2)
				})
			})
		})
	})

	test.todo('on resize') 
	test.todo('accessibility')
})