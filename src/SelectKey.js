// Colors
const correctColor = 'green';
const incorrectColor = 'red';

// Generate key
function generateKey(keys, oldKey) { 
	let newKey = getRandomElement(keys);
	if(newKey === oldKey) {
		return generateKey(keys, oldKey);
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
	if(key === targetKey) {  
		correctClick(key, reset);
	} else {
		incorrectClick(key);
	} 
}

function correctClick(key, reset) {  
	flashColor(key, correctColor); 
	playSound(document.getElementById('correctSound'));

	setTimeout(() => {  
		reset(); 
	}, 1000);
}

function incorrectClick(key) { 
	flashColor(key, incorrectColor); 
	playSound(document.getElementById('incorrectSound'));
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
					keyDown
				};

export default SelectKey;