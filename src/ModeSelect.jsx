import React from 'react';
import Util from './Util.jsx';
import ShowKey from './modes/ShowKey.jsx'; 
import SelectKey from './modes/SelectKey.jsx'; 
import SelectByEar from './modes/SelectByEar.jsx';

const ModeSelect = ({mode, changeMode, targetKey, newTargetKey}) => {   
	let modes = ['showKey', 'selectKey', 'selectByEar'];
	let modeElements = Util.makeRadioElements(modes, clickModeChange, 'showKey'); 

	function clickModeChange(newMode) {   
		console.log('newMode', newMode);
		if(newMode !== mode) {
			changeMode(newMode); 
			selectRadio(newMode, modes);
			// initMode(newMode);
		}  
	} 

	function selectRadio(targetRadio, allRadios) { 
		let radios = Util.getElement(allRadios, '_Radio'); 

		radios.forEach((radio) => {
			if(radio.value === targetRadio) {
				radio.checked = true;
			} else {
				radio.checked = false;
			}
		}); 
	}


 	/* 
	function initShowKey() {
		Util.setInnerHTML('', 'pianoDisplay');
	}

	function initSelectKey() { 
		Util.setInnerHTML(targetKey, 'pianoDisplay');
	}

	function initSelectByEar() {
		newTargetKey();
		Util.setInnerHTML('', 'pianoDisplay');
		Util.playAudio(targetKey);
	}

	function initMode(newMode) {
		if(newMode === 'showKey') {
			initShowKey();
		} else if (newMode === 'selectKey') {   
			initSelectKey();
		} else if (newMode === 'selectByEar') {
			initSelectByEar();
		}
	} 

	function selectRadio(newMode) { 
		if(!inputs) {
			inputs = modes.map((mode) => {
				return document.getElementById(mode+"Input");
			}); 
		}

		inputs.forEach((input) => {
			if(input.value === newMode) {
				input.checked = true;
			} else {
				input.checked = false;
			}
		}); 
	}
 	*/
	return (
		<form name="modeSelectForm">    
			{modeElements}
		</form>
	) 
};

export default ModeSelect;