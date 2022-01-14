import React from 'react';
import {getElements} from '../../utils/utils.js';
import './VolumeControl.scss';

export default function VolumeControl({volume, handleVolumeChange}) { 
	/* 
		* on render:
			* show volume slider

		* on slide
			* call handleVolumeChange with new volume
	*/

	const id = 'volume-control';

	function onSliderChange(e) {  
		handleVolumeChange(e.target.value);  
	}   
 
	return( 
		<div className="volume-control-container" id={id}>
			<input type="range" min="0" max="100" value={volume} onChange={onSliderChange}/>
		</div>
	)
}