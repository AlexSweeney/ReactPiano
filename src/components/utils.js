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

function getElement(id) {
	return document.getElementById(id)
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