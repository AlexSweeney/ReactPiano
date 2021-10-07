import React from 'react';
import Key from './parts/Key.jsx';
import './Octave.css';

export default function Octave({octaveNum = 3, handleOver, handleOut, handleDown}) {
	// ================ constants ===================== //
	const allKeys = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
	const octaveKeys = allKeys.map(key => `${key}${octaveNum}`);

	// ================ Output ==================== //
	return (
		<div className="octave">
			{octaveKeys.map((key, i) => { 
				return <Key 
									keyName={key} 
									i={i}
									handleOver={handleOver}
									handleOut={handleOut}
									handleDown={handleDown}/>
			})} 
		</div>
	)
}