import Util from '../Util.jsx';

let {correctColor, incorrectColor} = Util;

function init(targetKey, newTargetKey) { 
	newTargetKey();
	Util.setInnerHTML('', 'pianoDisplay');
	Util.playAudio(targetKey);
}

// Click key
function keyDown(clickedKey, targetKey) {
	console.log('targetKey', targetKey);
	if(clickedKey === targetKey) {
		console.log("correct");
	} else {
		incorrectClick();
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

const SelectByEar = {
	init,
	keyDown
}

export default SelectByEar;