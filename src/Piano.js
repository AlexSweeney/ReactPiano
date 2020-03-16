import ShowKey from './ShowKey.js';

let keys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
let mode = 'showKey';

// Key functions
function keyOver(key) {
	if(mode === 'showKey') {
		ShowKey.keyOver(key);
	}
}

function keyOut(key) {
	if(mode === 'showKey') {
		ShowKey.keyOut(key);
	}
}

let Piano = {keys, mode, keyOver, keyOut};
export default Piano; 