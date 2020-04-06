import React from 'react';
import Util from './Util.jsx';

function VolumeControl({audioIDs, volume, changeVolume}) { 
	console.log('volume control: audioIDs', audioIDs);
	/*function getTagIDs(tagsArray) {
		return tagsArray.map(tag => tag.props.id);
	}*/

	/*function handleSliderChange(newVolume) {   
		changeVolume(newVolume); 
		let tagIDs = getTagIDs(audioTags)
		Util.setVolume(audioTags, volume / 100); 
	}  */

/*	React.useEffect(() => { 
		let audioElements = Util.getElementsFromStorage('audioElements', audioRefs, '_audio');
		console.log('audioElements', audioElements);
		Util.setVolume(audioElements, volume / 100); 
	}, [volume]);
*/
	return( 
		<div className="volumeContainer">
			{/*<div className="slidecontainer">
				<input type="range" min="0" max="100" value={volume} onChange={(e) => handleSliderChange(e.target.value)}/>
			</div>*/}
			{/*<div className="slidecontainer">
			  <input type="range" min="0" max="100" id="volumeSlider" value={volume} onChange={(e) => {volumeChange(e.target.value)}}/>
			</div>*/}
			<p>Volume: {volume}</p> 
		</div>
	)
}

export default VolumeControl;