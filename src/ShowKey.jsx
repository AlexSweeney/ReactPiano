import Util from './Util.jsx';

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

let ShowKey = {keyDown, keyUp, keyOver, keyOut};
export default ShowKey;