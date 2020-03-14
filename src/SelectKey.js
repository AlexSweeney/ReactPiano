let SelectKey = {}

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

	// correct

	// incorrect

// flash color

// play sound

SelectKey.generateKey = generateKey;

export default SelectKey;