import ShowKey from './ShowKey.js';

let keys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
/*let mode = 'showKey';*/

/*function changeMode(newMode) { 
	console.log('changeMode()');
	console.log(this);
	/*mode = newMode;
}*/

// Key functions
function keyOver(key) {
/*	if(mode === 'showKey') {
		ShowKey.keyOver(key);
	}*/
}

function keyOut(key) {
/*	if(mode === 'showKey') {
		ShowKey.keyOut(key);
	}*/
}

let Piano = {keys, changeMode, keyOver, keyOut};
export default Piano; 