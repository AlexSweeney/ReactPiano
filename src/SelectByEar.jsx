// Click key
function keyDown(clickedKey, targetKey) {
	console.log('targetKey', targetKey);
	if(clickedKey === targetKey) {
		console.log("correct");
	} else {
		console.log('incorrect');
	}
}

// Correct
function correctClick() {
	// flash color

	// play sound

	// reset
}

// Incorrect
function incorrectClick() {
	// flash color

	// play sound
}

let SelectByEar = {
	keyDown
}

export default SelectByEar;