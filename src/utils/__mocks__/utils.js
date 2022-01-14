let allUtils = jest.requireActual('./../utils.js');  
Object.keys(allUtils).map(key => { 
	window[key] = allUtils[key];
}) 

function updateKeyHeight(keyId) {     
	const keyColor = getKeyType(keyId); 
	const key = getElement(keyId);

	const containerId = getParentId(keyId);
	const container = getElement(containerId); 
 
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

		On Real Trigger
			* key height = 100% for white, 65% for black
			* key width = fn() call sets width based on height

		Mock function 
			* listens for resizekeys event
			* on resizekey event  
				* call fn() => sets width based on height
	*/

	document.addEventListener('resizekeys', () => {
		fn()
	})
	// element.addEventListener('resizekeys', (e) => {
	// 	console.log('resizekeys triggered')
	// 	// call fn to update width based on new height
	// })
  
	// element.addEventListener('setkeysize', (e) => {  
	// 	// updateKeyHeight(e.srcElement.id)
	
	// 	// call fn to update width based on new height
	// 	fn()
	// })  
}
  
allUtils.triggerOnSizeChange = mockTriggerOnSizeChange;

Object.keys(allUtils).forEach(key => {
	exports[key] = allUtils[key];	
})