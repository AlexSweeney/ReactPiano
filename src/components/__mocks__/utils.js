/* import { 
	getElement,
	getElementHeight,
	getElementWidth,
	pxToNumber,
	triggerOnSizeChange,
} from './../utils.js';*/

let allUtils = jest.requireActual('./../utils.js');
// const getElement = allUtils.getElement; 
  
Object.keys(allUtils).map(key => { 
	window[key] = allUtils[key];
}) 

function updateKeyHeight(keyId) {     
	const keyColor = getKeyType(keyId); 
	const key = getElement(keyId);

	const containerId = getParentId(keyId);
	const container = getElement(containerId); 

	console.log('key.parentElement', key.parentElement)
	console.log('containerId', containerId)
	const containerHeight = getElementHeight(container, 'number'); 

	if(keyColor === 'white-key') {
		key.style.height = containerHeight + 'px';
	}

	if(keyColor === 'black-key') {
		key.style.height = containerHeight * 0.65 + 'px';
	}   
}

function mockTriggerOnSizeChange(id, fn) { 
	/*
		Real function 
			* listens for size change on id
			* calls fn() on size change

		Instance use
			* key height = 100% for white, 65% for black
			* key width = fn() call sets width based on height

		Mock function 
			* listens for setkeysize event
			* on resizekey event 
				* set height of key that triggered event  manually
				* call fn() => sets width based on height
	*/
	const element = getElement(id);
 
	element.addEventListener('setkeysize', (e) => {  
		updateKeyHeight(e.srcElement.id)
	
		// call fn to update width based on new height
		fn()
	})  
}
 
// let allUtils = {};
allUtils.triggerOnSizeChange = mockTriggerOnSizeChange;
 

Object.keys(allUtils).forEach(key => {
	exports[key] = allUtils[key];	
}) 
// allUtils.forEach(util => {
// 	exports[utile] = allUtils[util];
// })


/*
export default {
	...allUtils,
	getElementHeight: () => console.log('get height mock'),
	triggerOnSizeChange: mockTriggerOnSizeChange,
}
*/
/*jest.mock('./../utils.js', () => { 
	const allUtils = jest.requireActual('./../utils.js');

	return {
		...allUtils,
		triggerOnSizeChange: mockTriggerOnSizeChange,
	} 
})*/

 

// function mockTriggerOnSizeChange(id, fn) { 
// 	/*
// 		* actual function 
// 			* listen for element size change
// 			* call function on size change

// 		* mock function
// 			* listen for custom event 'resizetrigger'
// 			* call function on 'resizetrigger' event
// 	*/

// 	// listen for custom event, in code trigger on size change
// 	const element = document.getElementById(id);
// 	element.addEventListener('resizetrigger', () => {
// 		// set height manually, in code use css style
// 		updateKeyHeight(id, container)
	
// 		// call width calculate fn
// 		fn()
// 	})
// }

// jest.mock('./../utils.js', () => { 
// 	const allUtils = jest.requireActual('./../utils.js');

// 	return {
// 		...allUtils,
// 		triggerOnSizeChange: mockTriggerOnSizeChange,
// 	} 
// })
