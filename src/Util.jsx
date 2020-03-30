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

function displayKey(key) {
	document.getElementById('pianoDisplay').innerHTML = key;
}