// Colors
const correctColor = 'green';
const incorrectColor = 'red';

// Audio
const correctSound = './audio/correctSound.mp3';
const incorrectSound = './audio/incorrectSound.mp3';
 
// Generate key
function generateKey(keys, oldKey) { 
	let newKey = getRandomElement(keys);
	if(newKey === oldKey) {
		return generateKey(keys, newKey);
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

// Click key
function keyDown(key, targetKey, reset) {  
	console.log('keyDown');
	console.log(arguments);
	if(key === targetKey) {  
		correctClick(key, reset);
	} else {
		incorrectClick(key);
	}
	/*if(key === targetKey) {
		correctClick(key);
	} else {
		incorrectClick(key);
	}*/
}

function correctClick(key, reset) { 
	console.log('correctClick'); 
	flashColor(key, correctColor); 
	// playSound(correctSound) 

	setTimeout(() => { 
		console.log('correctClick'); 
		reset();
		// targetKey = generateKey(keys);
	}, 1000);
}

function incorrectClick(key) {
	console.log('incorrect');
	flashColor(key, incorrectColor);
	// playSound(incorrectSound);
}

function flashColor(element, color) { 
	let target = document.getElementById(element); 
	let origColor = target.style.backgroundColor;
	target.style.backgroundColor = color;
	
	setTimeout(() => {
		target.style.backgroundColor = origColor;
	}, 500);
}

function playSound(sound) {
	sound.play();
}

// export
let SelectKey = {	generateKey,
					keyDown};

export default SelectKey;