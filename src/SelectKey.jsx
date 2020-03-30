import Util from './Util.jsx';

// Colors
const correctColor = 'green';
const incorrectColor = 'red';

// Click key
function keyDown(key, targetKey, reset) {   
	if(key === targetKey) {  
		correctClick(key, reset);
	} else {
		incorrectClick(key);
	} 
}

function correctClick(key, reset) {  
	flashColor(key, correctColor); 
	Util.playAudio('correctSound'); 

	setTimeout(() => {   
		reset(true);  
	}, 1000);
}

function incorrectClick(key) { 
	flashColor(key, incorrectColor); 
	Util.playAudio('incorrectSound');
}

function flashColor(element, color) { 
	let target = document.getElementById(element); 
	let origColor = target.style.backgroundColor;
	target.style.backgroundColor = color;
	
	setTimeout(() => {
		target.style.backgroundColor = origColor;
	}, 500);
}

function playSound(sound) { 
	sound.play();
}

// export
let SelectKey = {	
					keyDown
				};

export default SelectKey;