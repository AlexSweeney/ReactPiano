import Util from '../Util.jsx';

// Colors 
const {correctColor, incorrectColor} = Util;

// init
function init() {
	console.log('selectKey init');
	Util.setInnerHTML('', 'pianoDisplay');
}

// Click key
function keyDown(key, targetKey, reset) {   
	if(key === targetKey) {  
		correctClick(key, reset);
	} else {
		incorrectClick(key);
	} 
}

// correct
function correctClick(key, reset) {  
	flashColor(key, correctColor); 
	Util.playAudio('correctSound'); 

	setTimeout(() => {   
		reset(true);  
	}, 1000);
}

// incorrect
function incorrectClick(key) { 
	flashColor(key, incorrectColor); 
	Util.playAudio('incorrectSound');
}

// 
function flashColor(element, color) { 
	let target = document.getElementById(element); 
	let origColor = target.style.backgroundColor;
	target.style.backgroundColor = color;
	
	setTimeout(() => {
		target.style.backgroundColor = origColor;
	}, 500);
}

// export
let SelectKey = {	
					init,
					keyDown
				};

export default SelectKey;