// import { ResizeObserver as PolyfillResizeObserver } from '@juggle/resize-observer';
// import { MutationObserver } from 'mutation-observer';
// console.log('MO')
// console.log(MutationObserver)
// import { ResizeObserver } from 'resize-observer-polyfill';

// =================== Object
export function mapObject(object, fn) { 
	if(Array.isArray(object)) { 
		object = mergeObjects(object);
	}  
	return Object.keys(object).map((key) => fn(key, object[key]));  
}

function mergeObjects(objectsArray) {
	let o = {}; 
	
	objectsArray.forEach((object) => { 
		copyPropertiesAndValues(o, object);
	})	

	return o;
}

function copyPropertiesAndValues(targetObject, object) {
	Object.keys(object).forEach((name) => {
		targetObject[name] = object[name];
	});
}

// =================== Elements
export function getElements(ids) { 
	return ids.map(id => getElement(id))
}

export function getElement(id) { 
	return document.getElementById(id)
}

export function getParentId(id) {
	return document.getElementById(id).parentElement.id;
}

export function getNewRandomArrayElement(allElements, oldElement = null) {  
	return getRandomArrayElement(allElements)
	// let newElement = getRandomArrayElement(allElements);
	// if(newElement === oldElement) return getNewRandomArrayElement(allElements, oldElement);
	//(newElement !== oldElement) return newElement;
}

export function getRandomArrayElement(array) { 
	return array[getRandomNumber(array.length)];
}

export function getRandomNumber(range) {
	return Math.floor(Math.random() * range);
}

// =================== Element Size
export function pxToNumber(string) {
	return Number(string.replace('px', ''));
}

export function getElementHeight(id,  output = 'px') {
	let element;
	
	if(typeof(id) === 'string') {
		element = document.getElementById(id);
	} else {
		element = id;
	}
		
	const height = pxToNumber(window.getComputedStyle(element).height);

	if(output === 'px') return height + 'px';
	if(output === 'number') return height;
}

export function getElementWidth(id, output = 'px') {
	let element;
	
	if(typeof(id) === 'string') {
		element = document.getElementById(id);
	} else {
		element = id;
	} 

	const width = pxToNumber(window.getComputedStyle(element).width); 

	if(output === 'px') return width + 'px';
	if(output === 'number') return width; 
}

export function setElementHeight(id, height) { 
	const element = document.getElementById(id);
	element.style.height = height;
}

export	function setElementWidth(id, width) { 
	const element = document.getElementById(id);
	element.style.width = width;
}

// =================== Element change
// export function triggerOnSizeChange(id, fn) {
// 	const ResizeObserver = Window.ResizeObserver || PolyfillResizeObserver;
// 	// const MutationObserver = new MutationObserver;
// 	const element = document.getElementById(id); 
// 	const ro = new ResizeObserver(fn);
// 	console.log(ro)
// 	// ro.observe(element);
// }

export function triggerOnSizeChange(id, fn) {
	const element = document.getElementById(id); 
	new ResizeObserver(fn).observe(element);
}
 
// Options for the observer (which mutations to observe)
// const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
// const callback = function(mutationsList, observer) {
//     // Use traditional 'for loops' for IE 11
//     for(const mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//             console.log('A child node has been added or removed.');
//         }
//         else if (mutation.type === 'attributes') {
//             console.log('The ' + mutation.attributeName + ' attribute was modified.');
//         }
//     }
// };

// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(callback);

// // Start observing the target node for configured mutations
// observer.observe(targetNode, config);

// // Later, you can stop observing
// observer.disconnect();
// Copy to Clipboard
