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

}

// Incorrect
function incorrectClick() {
	
}

let SelectByEar = {
	keyDown
}

export default SelectByEar;