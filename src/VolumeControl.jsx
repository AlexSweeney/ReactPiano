import React from 'react';
import Util from './Util.jsx';

function VolumeControl({audioIDs, volume, changeVolume}) { 
	function handleSliderChange(newVolume) {   
		changeVolume(newVolume);  
		Util.setVolume(audioIDs, volume / 100); 
	}   

	return( 
		<div className="volumeContainer">
			<div className="slidecontainer">
				<input type="range" min="0" max="100" value={volume} onChange={(e) => handleSliderChange(e.target.value)}/>
			</div>   
		</div>
	)
}

export default VolumeControl;