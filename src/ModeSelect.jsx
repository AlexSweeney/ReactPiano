import React from 'react';
import Util from './Util.jsx';
import ShowKey from './modes/ShowKey.jsx'; 
import SelectKey from './modes/SelectKey.jsx'; 
import SelectByEar from './modes/SelectByEar.jsx';

const ModeSelect = ({mode, changeMode, targetKey, setNewTargetKey}) => {   
	let modes = ['Show Key', 'Select Key', 'Select Key by Ear'];
	let modeRadios = Util.makeRadioElements(modes, clickModeChange, 'Show Key'); 

	function clickModeChange(newMode) {    
		if(newMode !== mode) {
			changeMode(newMode); 
			Util.selectRadio(newMode, modes);
			initMode(newMode);
		}  
	} 

	function initMode(newMode) {
		if(newMode === 'Show Key') {
			ShowKey.init();
		} else if (newMode === 'Select Key') {   
			SelectKey.init(targetKey, setNewTargetKey);
		} else if (newMode === 'Select Key by Ear') {
			SelectByEar.init(targetKey, setNewTargetKey);
		}
	} 

	return (
		<form name="modeSelectForm" className="modeSelectForm" id="modeSelectForm">  
			<h2>Mode</h2>  
			{modeRadios}
		</form>
	) 
};

export default ModeSelect;