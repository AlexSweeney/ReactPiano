 // =================== Key Type
export function getKeyType(keyName) { 
	if(keyName.indexOf('b') === -1 && keyName.indexOf('#') === -1) return 'white';
	if(keyName.indexOf('b') !== -1 || keyName.indexOf('#') !== -1) return 'black';
} 

// =================== Object
export function mapObject(object, fn) { 
	if(Array.isArray(object)) { 
		object = mergeObjects(object);
	}  
	return Object.keys(object).map((key) => fn(key, object[key]));  
}

export function mergeObjects(objectsArray) {
	let o = {}; 
	
	objectsArray.forEach((object) => { 
		Object.keys(object).forEach((name) => {
			o[name] = object[name];
		})
	})	

	return o;
} 

// =================== Elements
export function getElements(ids) { 
	return ids.map(id => getElement(id))
}

export function getElement(id) { 
	const element = document.getElementById(id);
	if(!element) throw new Error('getElement(id) -> element not found')
	return element;
}

export function getParentId(id) {
	const parentId = document.getElementById(id).parentElement.id;
	if(parentId) return parentId;
	if(!parentId) throw new Error(`getParentId(${id}) - parent element doesn\'t have an id`)
}

export function getNewRandomArrayElement(allElements, oldElement = null) {  
	const newElement = getRandomArrayElement(allElements);
	if(newElement === oldElement) return getNewRandomArrayElement(allElements, oldElement);
	if(newElement !== oldElement) return newElement;
}

export function getRandomArrayElement(array) { 
	return array[getRandomNumber(array.length)];
}

export function getRandomNumber(range) {
	return Math.floor(Math.random() * (range + 1));
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

	if(!element) throw new Error('getElementHeight() element not found')
		
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

	if(!element) throw new Error('getElementWidth() element not found')

	const width = pxToNumber(window.getComputedStyle(element).width); 

	if(output === 'px') return width + 'px';
	if(output === 'number') return width; 
}

export function setElementHeight(id, height) { 
	const element = document.getElementById(id);
	if(!element) throw new Error('setElementHeight() element not found')

	element.style.height = height;
}

export	function setElementWidth(id, width) { 
	const element = document.getElementById(id);
	if(!element) throw new Error('setElementWidth() element not found')

	element.style.width = width;
}

// =================== Element change 
export function triggerOnSizeChange(id, fn) {
	const element = document.getElementById(id); 
	if(!element) throw new Error('triggerOnSizeChange() element not found')
		
	new ResizeObserver(fn).observe(element);
}