import Util from '../Util.jsx';

let {correctColor, incorrectColor} = Util;
const feedbackSoundDelay = 100;

function init(targetKey, newTargetKey) { 
	Util.setInnerHTML('', 'keyDisplay');
	newTargetKey();  
	Util.playAudio(targetKey);
	Util.activatePlayButton(targetKey);
}

// Click key
function keyDown(clickedKey, targetKey, newTargetKey) { 
	console.log('clickedKey', clickedKey);
	console.log('targetKey', targetKey);
	Util.playAudio(clickedKey); 
	if(clickedKey === targetKey) {  
		correctClick(clickedKey, newTargetKey);
	} else {  
		incorrectClick(clickedKey);
	}
}

// Correct
function correctClick(key, newTargetKey) {
	console.log('correctClick: newTargetKey', newTargetKey)
	Util.flashColor(key, correctColor); 

	setTimeout(() => { 
		Util.playAudio('correctSound');  
	}, feedbackSoundDelay); 

	setTimeout(() => {
		console.log('timeout: newTargetKey', newTargetKey);
		init(newTargetKey);
	}, 2000);
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