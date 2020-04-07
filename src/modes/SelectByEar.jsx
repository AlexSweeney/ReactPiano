import Util from '../Util.jsx';

let {correctColor, incorrectColor} = Util;
const feedbackSoundDelay = 200;

function init(targetKey, setNewTargetKey) {  
	Util.setInnerHTML('', 'keyDisplay');
	nextTurn(targetKey, setNewTargetKey);
	Util.activatePlayButton(targetKey);
}

function nextTurn(targetKey, setNewTargetKey) { 
	console.log('nextTurn');
	targetKey = setNewTargetKey();  
	Util.playAudio(targetKey); 
}

// Click key
function keyDown(clickedKey, targetKey, setNewTargetKey) { 
	Util.playAudio(clickedKey); 
	if(clickedKey === targetKey) {  
		correctClick(clickedKey, targetKey, setNewTargetKey);
	} else {  
		incorrectClick(clickedKey);
	}
}

// Correct
function correctClick(key, targetKey, setNewTargetKey) { 
	Util.flashColor(key, correctColor); 

	setTimeout(() => { 
		Util.playAudio('correctSound');  
	}, feedbackSoundDelay); 
	
	setTimeout(() => {nextTurn(targetKey, setNewTargetKey)}, 2500);
}

// Incorrect
function incorrectClick(key) {  
	Util.flashColor(key, incorrectColor); 

	setTimeout(() => {   
		Util.playAudio('incorrectSound');  
	}, feedbackSoundDelay);
}

const SelectByEar = {
	init,
	keyDown
}

export default SelectByEar;