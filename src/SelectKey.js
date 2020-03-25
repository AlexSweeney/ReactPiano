// Colors
const correctColor = 'green';
const incorrectColor = 'red';

// Audio
const correctSound = './audio/correctSound.mp3';
const incorrectSound = './audio/incorrectSound.mp3';
 
// Generate key
function generateKey(keys) { 
	return getRandomElement(keys);
}

function getRandomElement(array) { 
	return array[getRandomNumber(array.length)];
}

function getRandomNumber(range) {
	return Math.floor(Math.random() * range + 1);
}

// Click key
function keyDown(key, targetKey) {  
	console.log('keyDown');
	console.log(key);
	if(key.props.keyName===targetKey) {  
		correctClick(key);
	} else {
		console.log('incorrect');
	}
	/*if(key === targetKey) {
		correctClick(key);
	} else {
		incorrectClick(key);
	}*/
}

function correctClick(key) {
	// console.log('correctClick');
	// console.log(this);
	console.log('correctClick');
	console.log('key', key);
	flashColor(key, correctColor);
	/*
	playSound(correctSound) 
	setTimeout(() => { 
		console.log('correctClick');
		console.log('this');
		console.log(this);
		/*targetKey = generateKey(keys);
	}, 2000);
	*/
}

function incorrectClick(key) {
	flashColor(key, incorrectColor);
	playSound(incorrectSound);
}

function flashColor(element, color) {
	console.log('flashColor');
	console.log('element', element);

	let target = document.getElementById(element);
	console.log('target', target);
	/*let origColor = target.style.backgroundColor;
	target.style.backgroundColor = color;
	
	setTimeout(() => {
		target.style.backgroundColor = origColor;
	}, 2000);*/
}

function playSound(sound) {
	sound.play();
}

// export
let SelectKey = {	generateKey,
					keyDown};

export default SelectKey;