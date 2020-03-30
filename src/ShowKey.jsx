function keyOver(key) {
	document.getElementById('pianoDisplay').innerHTML = key;
}

function keyOut(key) {
	document.getElementById('pianoDisplay').innerHTML = '';
}

let ShowKey = {keyOver, keyOut};
export default ShowKey;