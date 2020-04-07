import Util from '../Util.jsx';

let {correctColor, incorrectColor} = Util;
const feedbackSoundDelay = 100;

/*const newTargetKey = (show = false) => {    
		let newKey = Util.getNewRandomElement(allKeys, targetKey); 
		changeTargetKey(newKey); 
		if(show) Util.setInnerHTML(newKey, 'keyDisplay');
		return newKey;
	} 
*/
function init(targetKey, newTargetKey) {  
	Util.setInnerHTML('', 'keyDisplay');
	nextTurn(targetKey, newTargetKey);
	Util.activatePlayButton(targetKey);
}

function nextTurn(targetKey, newTargetKey) {
	console.log('nextTurn ------------------------');
	console.log('targetKey pre', targetKey);
	newTargetKey();  
	console.log('targetKey post', targetKey);
	// Util.playAudio(targetKey);
}

// Click key
function keyDown(clickedKey, targetKey, newTargetKey) {  
	console.log('xxxx keyDown', arguments);
	Util.playAudio(clickedKey); 
	if(clickedKey === targetKey) {  
		correctClick(clickedKey, targetKey, newTargetKey);
	} else {  
		incorrectClick(clickedKey);
	}
}

// Correct
function correctClick(key, targetKey, newTargetKey) { 
	Util.flashColor(key, correctColor); 

	setTimeout(() => { 
		Util.playAudio('correctSound');  
	}, feedbackSoundDelay); 
	
	setTimeout(nextTurn(targetKey, newTargetKey), 2000);
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