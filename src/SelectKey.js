let SelectKey = {}

// Colors
const correctColor = 'green';
const incorrectColor = 'red';

// Audio
const correctSound = './audio/correctSound.mp3';
const incorrectSound = './audio/incorrectSound.mp3';

let targetKey = '';

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
function clickKey(key) {
	if(key === targetKey) {
		correctClick(key);
	} else {
		incorrectClick(key);
	}
}

function correctClick(key) {
	flashColor(key, correctColor);
	playSound(correctSound);
	setTimeout(() => { 
		console.log('correctClick');
		console.log('this');
		console.log(this);
		/*targetKey = generateKey(keys);*/
	}, 2000);
}

function incorrectClick(key) {
	flashColor(key, incorrectColor);
	playSound(incorrectSound);
}

function flashColor(target, color) {
	let element = document.getElementById(target);
	let origColor = element.style.backgroundColor;
	element.style.backgroundColor = color;
	
	setTimeout(() => {
		element.style.backgroundColor = origColor;
	}, 2000);
}

function playSound(sound) {
	sound.play();
}

// export
SelectKey.generateKey = generateKey;
SelectKey.clickKey = clickKey; 

export default SelectKey;