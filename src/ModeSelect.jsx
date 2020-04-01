import React from 'react';
import Util from './Util.jsx';
import ShowKey from './modes/ShowKey.jsx'; 
import SelectKey from './modes/SelectKey.jsx'; 
import SelectByEar from './modes/SelectByEar.jsx';

const ModeSelect = ({mode, changeMode, targetKey, newTargetKey}) => {   
	let modes = ['showKey', 'selectKey', 'selectByEar'];
	let modeRadios = Util.makeRadioElements(modes, clickModeChange, 'showKey'); 

	function clickModeChange(newMode) {    
		if(newMode !== mode) {
			changeMode(newMode); 
			Util.selectRadio(newMode, modes);
			initMode(newMode);
		}  
	} 

	function initMode(newMode) {
		if(newMode === 'showKey') {
			ShowKey.init();
		} else if (newMode === 'selectKey') {   
			SelectKey.init();
		} else if (newMode === 'selectByEar') {
			SelectByEar.init(targetKey, newTargetKey);
		}
	} 

	return (
		<form name="modeSelectForm">    
			{modeRadios}
		</form>
	) 
};

export default ModeSelect;