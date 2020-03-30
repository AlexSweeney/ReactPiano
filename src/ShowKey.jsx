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

function keyDown(key) {  
	playAudio(key);
}

function keyUp(key) { 
	stopAudio(key);
}

function keyOver(key) {
	displayKey(key); 
}

function keyOut(key) {
	displayKey(''); 
}

let ShowKey = {keyDown, keyUp, keyOver, keyOut};
export default ShowKey;