import React from 'react';
import {render} from 'react-dom';
import {act} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';

import Keys from './Keys.jsx';

import PlayButton from './parts/PlayButton.jsx';

describe('', () => {
	it('', () => {
		expect(true)
	})
	
})
// describe('<Keys keyNames={keyNames}>', () => {
// 	it('should render key element for each keyName passed', () => {
// 		const container = document.createElement('div');
// 		document.body.appendChild(container)
		
// 		jest.mock('./parts/PlayButton.jsx', () => {
// 			return {
// 		    __esModule: true,
// 		    A: true,
// 		    default: () => {
// 		      return <div className="mocked-button"></div>;
// 		    }, 
// 		  }
// 		})

// 		const keyNames = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3'];
		
// 		// act(() => { render(<PlayButton/>, container) })
// 		const testRenderer = TestRenderer.create(
// 		  <PlayButton/>
// 		);

// 		// const a = container.querySelector('.mocked-button');
// 		console.log(testRenderer.toJSON())
// 		// act(() => { render(<Keys keyNames={keyNames}/>, container) })
// 		// console.log(container)
// 	})
// })