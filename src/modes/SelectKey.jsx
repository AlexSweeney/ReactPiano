import Util from '../Util.jsx';

// Colors 
const {correctColor, incorrectColor} = Util;

// init
function init(targetKey, setNewTargetKey) {  
	targetKey = setNewTargetKey();
	Util.displayKey(targetKey); 
	Util.deactivatePlayButton(); 
}

// Click key
function keyDown(/*key, targetKey, reset*/) {    
	/*if(key === targetKey) {  
		correctClick(key, reset);
	} else {
		incorrectClick(key);
	} */
}

// correct
/*function correctClick(key, reset) {  
	Util.flashColor(key, correctColor); 
	Util.playAudio('correctSound'); 

	setTimeout(() => {   
		reset(true);  
	}, 1000);
}
*/
// incorrect
/*function incorrectClick(key) { 
	Util.flashColor(key, incorrectColor); 
	Util.playAudio('incorrectSound');
}*/

// export
let SelectKey = {	
					init,
					keyDown
				};

export default SelectKey;