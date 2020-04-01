import React from 'react';

const correctColor = 'green';
const incorrectColor = 'red';

// General 
function copyPropertiesAndValues(targetObject, object) {
	Object.keys(object).forEach((name) => {
		targetObject[name] = object[name];
	});
}

/*function mergeObjects() {
	let objectsArray = Array.from(arguments[0]);
	let o = {}; 
	
	objectsArray.map((object) => { 
		copyPropertiesAndValues(o, object);
	})	

	return o;
}
*/
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
	generateKey,
	displayKey, 
	setVolume,
	playAudio,
	stopAudio,
	correctColor,
	incorrectColor, 
}

export default Util;