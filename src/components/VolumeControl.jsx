import React from 'react';
import {getElements} from './utils.js';
import './VolumeControl.css';

export default function VolumeControl({audioIDs, volume, setVolume}) { 
	function onSliderChange(e) {  
		setVolume(e.target.value);  
		changeAudioElementVolumes(audioIDs, volume / 100); 
	}   
 
	function changeAudioElementVolumes(audioIDs, newVolume) {
		let audioElements = getElements(audioIDs);
		audioElements.forEach(element => element.volume = newVolume);
	}

	return( 
		<div className="volume-control-container">
			<input type="range" min="0" max="100" value={volume} onChange={onSliderChange}/>
		</div>
	)
}