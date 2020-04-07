import Util from '../Util.jsx';

// Colors 
const {correctColor, incorrectColor} = Util;

// init
function init(targetKey, setNewTargetKey) {  
	nextTurn(targetKey, setNewTargetKey)
	Util.deactivatePlayButton(); 
}

function nextTurn(targetKey, setNewTargetKey) {
	targetKey = setNewTargetKey();
	Util.displayKey(targetKey);
}

// Click key
function keyDown(key, targetKey, setNewTargetKey) {    
	if(key === targetKey) {  
		correctClick(key, targetKey, setNewTargetKey);
	} else {
		incorrectClick(key);
	} 
}

// correct
function correctClick(key, targetKey, setNewTargetKey) {  
	Util.flashColor(key, correctColor); 
	Util.playAudio('correctSound'); 

	setTimeout(nextTurn(targetKey, setNewTargetKey), 1000);
}

// incorrect
function incorrectClick(key) { 
	Util.flashColor(key, incorrectColor); 
	Util.playAudio('incorrectSound');
}

// export
let SelectKey = {	
					init,
					keyDown
				};

export default SelectKey;