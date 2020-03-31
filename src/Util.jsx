import React from 'react';

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

// Make audio
function makeAudioElements(audio) { 
	return Object.keys(audio).map((name) => { 
		return (
			<audio id={name+"_audio"} key={name}>
				<source type="audio/mp3" src={audio[name]}/>
			</audio> 
		)
	})
} 

// Audio
function getAudio(key) {
	return document.getElementById(key+"_audio");
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
	makeAudioElements,
	playAudio,
	stopAudio
}

export default Util;