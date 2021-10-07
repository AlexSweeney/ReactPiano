import React, {useEffect} from 'react';
import RadioSelector from './parts/RadioSelector.jsx';
import './ModeSelect.css';

export default function ModeSelect({mode, setMode}) {
	/*
		* Show modes
		* change mode on click
	*/

	// ========================== Constants  ========================= // 
	const modes = ['show-key', 'select-key', 'select-key-by-ear'];
	const defaultValue = modes[0]; 

	// ========================== Event Handlers  ==================== // 
	function onClickRadio(value) {
		setMode(value)
	} 

	// ========================== Output  =========================== // 
	return (
		<form className="mode-select">  
			<h2>Mode</h2>  
			
			{modes.map(thisMode => {
				return <RadioSelector value={thisMode} defaultValue={defaultValue} handleClick={onClickRadio}/>
			})}
		</form>
	) 
}