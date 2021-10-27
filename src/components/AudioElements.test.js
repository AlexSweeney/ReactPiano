import React from 'react';
import { render } from 'react-dom';  
import { act, isElementOfType } from 'react-dom/test-utils';
import AudioElements from './AudioElements.jsx'; 
import { getElement } from './utils.js';

// ============================================ Vars and Consts ============================================ //
let container;  
const audioElementsId = 'audio-elements-container';
const ids = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3', 'correctSound', 'incorrectSound']; 
const errorIds = ['NoFile','WrongFile','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3', 'correctSound', 'incorrectSound']; 

// ================= Props
let handleLoad; 
let handleLoadingError;
let props; 
let errorProps;

// =================== Audio 
const fileType = '.mp3';
 
const audioObjects = ids.map((id) => { 
	return {
		fileName: id,
		fileType: fileType,
		id: `${id}-audio`,
	}
}); 

const errorAudioObjects = errorIds.map((id) => { 
	return {
		fileName: id,
		fileType: fileType,
		id: `${id}-audio`,
	}
});

// ============================================ Helper Fns ================================================ //
function getPath(id) {
	return `./../audio/piano/${id}.mp3`;
}

function getErrorPath(id) {
	return `./${id}.mp3`
}

// ============================================ Setup / Teardown ========================================== //
beforeEach(() => { 
	container = document.createElement('div');
	document.body.appendChild(container) 
	handleLoad = jest.fn();
	handleLoadingError = jest.fn();
	props = { audioObjects, handleLoad, handleLoadingError };
	errorProps = { audioObjects: errorAudioObjects, handleLoad, handleLoadingError};
})

afterEach(() => {
	document.body.removeChild(container)
	container = null; 
	handleLoad = null;
	handleLoadingError = null;
	props = null;
	errorProps = null;
})

// ============================================ Tests ===================================================== //
describe('<AudioElements/>', () => {
	describe('on render', () => {
		it('should render', async () => {
			await act(async () => { render(<AudioElements {...props}/>, container)})
			const audioElements = getElement(audioElementsId);

			expect(isElementOfType(audioElements, AudioElements))
		})
	})

	describe('on load audio', () => {
		it('should render an audio element for each id', async () => { 
			await act(async () => { render(<AudioElements {...props}/>, container)})  

			audioObjects.forEach(object => { 
				const audioElement = getElement(`${object.id}`);
				expect(isElementOfType(audioElement, Audio))
			})  
		})

		it('should call props.handleLoad fn', async () => {
		 	await act(async () => render(<AudioElements {...props}/>, container))

			expect(handleLoad).toHaveBeenCalledTimes(1)
		}) 
	}) 

 	describe('on loading error', () => {
 		it('should call props.handleLoadingError fn', async () => { 
 			// stop message showing in jest console
 			global.console = { error: () => { }}
 			await act(async () => render(<AudioElements {...errorProps}/>, container))
 			
 			expect(handleLoadingError).toHaveBeenCalledTimes(1)
 		})

 		it('should print a console.error message', async () => { 
 			global.console = { error: jest.fn() } 
			await act(async () => render(<AudioElements {...errorProps}/>, container))

			expect(console.error).toBeCalled()
 		})
 	})
})
