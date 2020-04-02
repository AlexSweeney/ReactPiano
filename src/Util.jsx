import React from 'react';

const correctColor = 'green';
const incorrectColor = 'red';

// General 

// Objects
function copyPropertiesAndValues(targetObject, object) {
	Object.keys(object).forEach((name) => {
		targetObject[name] = object[name];
	});
}

function mergeObjects(objectsArray) {
	let o = {}; 
	
	objectsArray.forEach((object) => { 
		copyPropertiesAndValues(o, object);
	})	

	return o;
}

function mapObject(object, fn) { 
	if(Array.isArray(object)) { 
		object = Util.mergeObjects(object);
	}  
	return Object.keys(object).map((key) => fn(key, object[key]));  
}

// Elements
function setInnerHTML(value, targetId) {
	document.getElementById(targetId).innerHTML = value;
}

function getElement(id, extra='') { 
	if(Array.isArray(id)) {
		return id.map(item => getElement(item + extra));
	}
	return document.getElementById(id+extra);
}

function getElementsFromStorage(id, elements, extra) {
	return localStorage.getItem(id) || Util.getElement(elements, extra);
}

// Radio Elements
function makeRadioElements(names, clickFunction, defaultChecked) {
		return names.map((name) => {
			return makeRadioElement(name, clickFunction, defaultChecked);
		});
	}

function makeRadioElement(value, clickFunction, defaultChecked) { 
	return (
			<div key={value}>
			<input type="radio" 
					name="mode"
					value={value}
					id={value+"_Radio"}
					onClick={() => { clickFunction(value) }}
					defaultChecked={value === defaultChecked}
			/>
			<label htmlFor={value}  
					onClick={() => { clickFunction(value) }} 
			>{value}</label>
			<br/> 
		</div>
	)
}

function selectRadio(targetRadio, allRadios) { 
	let radios = Util.getElement(allRadios, '_Radio'); 

	radios.forEach((radio) => {
		if(radio.value === targetRadio) {
			radio.checked = true;
		} else {
			radio.checked = false;
		}
	}); 
}

// Generate Random Element
function getNewRandomElement(allElements, oldElement = null) {  
	let newElement = getRandomElement(allElements);
	if(newElement === oldElement) {
		return getNewRandomElement(allElements, oldElement);
	} else {
		return newElement;
	}
}

function getRandomElement(array) { 
	return array[getRandomNumber(array.length)];
}

function getRandomNumber(range) {
	return Math.floor(Math.random() * range + 1);
}

// display key
function displayKey(key) {
	document.getElementById('pianoDisplay').innerHTML = key;
}

// Audio
function getAudio(key) {
	return document.getElementById(key+"_audio");
}

function setVolume(audioElements, newVolume) {
	audioElements.forEach(element => element.volume = newVolume);
}

function playAudio(key) {
	getAudio(key).play();
}

function stopAudio(key) { 
	let audio = getAudio(key); 
	audio.pause();
	audio.currentTime = 0;
}

let Util = {
	setInnerHTML,
	getElement,
	getElementsFromStorage,
	makeRadioElements,
	selectRadio,
	mergeObjects,
	mapObject,
	getNewRandomElement,
	displayKey, 
	setVolume,
	playAudio,
	stopAudio,
	correctColor,
	incorrectColor, 
}

export default Util;