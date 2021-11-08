import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, isElementOfType, Simulate } from 'react-dom/test-utils';
import VolumeControl from './VolumeControl.jsx';
import { getElement } from './utils.js';

// ============================================= Consts & Vars============================================= //
let container;

const volumeControlId = 'volume-control';
let volumeControl;

const volume = 50;
let handleVolumeChange = null;
let volumeSlider = null;

// ============================================= Set up / Teardown ======================================== //
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container)

	handleVolumeChange = jest.fn();

	const props = { volume, handleVolumeChange };
	act(() => { render(<VolumeControl {...props}/>, container) })

	volumeControl = getElement(volumeControlId);
	volumeSlider = volumeControl.querySelector('input');
})

afterEach(() => {
	unmountComponentAtNode(container)
})

// ============================================= Tests ============================================= //
describe('<VolumeControl/>', () => {
	describe('on render', () => {
		it('should render', () => {
			expect(isElementOfType(volumeControl, VolumeControl))
		})	
	})

	describe('on slide volume', () => {
		it('should call handleVolumeChange with e.target.value = new volume', () => {
			act(() => Simulate.change(volumeSlider, {target: {value: 100}}))
			expect(handleVolumeChange).toHaveBeenCalledWith(100)
		})
	})
})