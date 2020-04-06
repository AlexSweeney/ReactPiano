import Util from '../Util.jsx';

let {correctColor, incorrectColor} = Util;

function init(newTargetKey) { 
	let targetKey = newTargetKey();  
	Util.playAudio(targetKey);
}

// Click key
function keyDown(clickedKey, targetKey, newTargetKey) { 
	Util.playAudio(clickedKey); 
	if(clickedKey === targetKey) { 
		correctClick(clickedKey, newTargetKey);
	} else { 
		incorrectClick(clickedKey);
	}
}

// Correct
function correctClick(key, newTargetKey) {
	Util.flashColor(key, correctColor); 

	setTimeout(() => { 
		Util.playAudio('correctSound');  
	}, 1000); 

	setTimeout(() => {
		init(newTargetKey);
	}, 2000);
}

// Incorrect
function incorrectClick(key) { 
	Util.flashColor(key, incorrectColor); 

	setTimeout(() => { 
		Util.playAudio('incorrectSound');  
	}, 1000); 
}

const SelectByEar = {
	init,
	keyDown
}

export default SelectByEar;