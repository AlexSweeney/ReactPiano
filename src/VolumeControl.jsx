import React from 'react';
import Util from './Util.jsx';

function VolumeControl({audio, volume, changeVolume}) { 
	function volumeChange(newVolume) {   
		changeVolume(newVolume); 
	}  

	React.useEffect(() => { 
		let audioElements = Util.getElementsFromStorage('audioElements', Object.keys(audio), '_audio');
		Util.setVolume(audioElements, volume / 100); 
	}, [volume]);

	return( 
		<div className="volumeContainer">
			<div className="slidecontainer">
			  <input type="range" min="0" max="100" id="volumeSlider" value={volume} onChange={(e) => {volumeChange(e.target.value)}}/>
			</div>
			<p>Volume: {volume}</p> 
		</div>
	)
}

export default VolumeControl;