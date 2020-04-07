import Util from '../Util.jsx';

function init() {
	Util.setInnerHTML('', 'keyDisplay');
	Util.deactivatePlayButton(); 
}

function keyDown(key) {  
	Util.playAudio(key);
}

function keyUp(key) { 
	setTimeout(() => {
		Util.stopAudio(key);
	}, 1000); 
}

function keyOver(key) {
	Util.displayKey(key); 
}

function keyOut(key) {
	Util.displayKey(''); 
}

let ShowKey = {init, keyDown, keyUp, keyOver, keyOut};
export default ShowKey;