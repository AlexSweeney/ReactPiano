let ShowKey = {};

function keyOver(key) {
	document.getElementById('pianoDisplay').innerHTML = key;
}
		
ShowKey.keyOver = keyOver; 

export default ShowKey;