import React from 'react';
import {getElements} from './utils.js';
import './VolumeControl.css';

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
 

	// function onSliderChange(e) {  
	// 	// setVolume(e.target.value);  
	// 	changeAudioElementVolumes(audioIDs, volume / 100); 
	// }   
 
	// function changeAudioElementVolumes(audioIDs, newVolume) {
	// 	let audioElements = getElements(audioIDs);
	// 	audioElements.forEach(element => element.volume = newVolume);
	// }

	return( 
		<div className="volume-control-container" id={id}>
			<input type="range" min="0" max="100" value={volume} onChange={onSliderChange}/>
		</div>
	)
}