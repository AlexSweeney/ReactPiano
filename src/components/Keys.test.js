import React from 'react';
import {render} from 'react-dom';
import {act} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer'; 
import Keys from './Keys.jsx';

let container;
const KEY_NAMES = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 

jest.mock('./parts/Key.jsx', () => {
	return ({keyName}) => {
		const keyType = getKeyType(keyName);

		function getKeyType(key) {
			if (key.indexOf('b') === -1 && key.indexOf('#') === -1) return 'white-key';
			if (key.indexOf('b') !== -1 || key.indexOf('#') != -1) return 'black-key';
		}

		return (<div className={`key`}>{keyName}</div>)
	}
});  

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container)
})

afterEach(() => {
	document.body.removeChild(container)
	container = null;
}) 

describe('<Keys/>', () => {
	describe('on render', () => {
		it('should render key for every keyName passed', () => {   
			const testRenderer = TestRenderer.create(<Keys keyNames={KEY_NAMES}/>);
			console.log(testRenderer)
			const keys = testRenderer.toJSON().children.filter(child => {
				return child.props.className.includes('key');
			}) 

			expect(keys.length).toEqual(KEY_NAMES.length)
		})

		it('should expand to width of white keys', () => {

		})
	}) 

	describe('on change size', () => {
		describe('on shrink', () => {

		})

		describe('on expand', () => {

		})
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