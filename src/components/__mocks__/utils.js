import React from 'react';

function mockTriggerOnSizeChange(id, fn) { 
	/*
		* actual function 
			* listen for element size change
			* call function on size change

		* mock function
			* listen for custom event 'resizetrigger'
			* call function on 'resizetrigger' event
	*/

	// listen for custom event, in code trigger on size change
	const element = document.getElementById(id);
	element.addEventListener('resizetrigger', () => {
		// set height manually, in code use css style
		updateKeyHeight(id, container)
	
		// call width calculate fn
		fn()
	})
}

jest.mock('./../utils.js', () => { 
	const allUtils = jest.requireActual('./../utils.js');

	return {
		...allUtils,
		triggerOnSizeChange: mockTriggerOnSizeChange,
	} 
})