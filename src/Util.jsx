import React from 'react';

const correctColor = 'green';
const incorrectColor = 'red';

// General 
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

function setInnerHTML(value, targetId) {
	document.getElementById(targetId).innerHTML = value;
}

function makeRadioElement(value, clickFunction, defaultChecked) { 
	return (
			<div key={value}>
			<input type="radio" 
					name="mode"
					value={value}
					id={value+"_Input"}
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

// Generate key
function generateKey(keys, oldKey = null) {  
	let newKey = getRandomElement(keys);
	if(newKey === oldKey) {
		return generateKey(keys, oldKey);
	} else {
		return newKey;
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
	audioElements.forEach((element) => { 
		let id = element.props.id; 
		let audio = document.getElementById(id); 
		audio.volume = newVolume;
	}) 
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
	makeRadioElement,
	mergeObjects,
	mapObject,
	generateKey,
	displayKey, 
	setVolume,
	playAudio,
	stopAudio,
	correctColor,
	incorrectColor, 
}

export default Util;