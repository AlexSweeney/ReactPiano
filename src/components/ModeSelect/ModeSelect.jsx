import React, {useEffect} from 'react';
import RadioSelector from '../../parts/RadioSelector/RadioSelector.jsx';
import './ModeSelect.scss';

export default function ModeSelect({modes, defaultMode, handleClick}) {
	/*
		* on render
			* show radio selector for each mode

		* on click
			* set Mode to value clicked
	*/

	// ========================== Constants  ========================= // 
	const id = 'mode-select';   

	// ========================== Output  =========================== // 
	return (
		<form className="mode-select" id={id}>  
			<h2>Mode</h2>  
			
			{modes.map((thisMode, i) => {
				return <RadioSelector key={`radio-selector-${i}`} value={thisMode} defaultValue={modes[0]} handleClick={handleClick}/>
			})}
		</form>
	) 
}