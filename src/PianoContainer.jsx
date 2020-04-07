/* add click button to hear target key */

/* style */

/* trim audio in ableton, -> sync start */

/* midi keyboard */

/* show scales */

/* settings - number of ocataves */

/* interval mode */

import React, {Component, useState} from 'react';
import Util from './Util.jsx';

// styles
import './piano.css';  

// components
import AudioElements from './AudioElements.jsx';
import ModeSelect from './ModeSelect.jsx';
import VolumeControl from './VolumeControl.jsx';
import Keys from './Keys.jsx'; 

const Piano = () => {
	const allKeys = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 
	
	// Audio Elements
	let [audioIDs, changeAudioIDs] = React.useState([]);
	let audioProps = {changeAudioIDs}; 

	// Mode Select
	const [mode, changeMode] = useState('showKey'); 
	const [targetKey, changeTargetKey] = useState(Util.getNewRandomElement(allKeys));
	
	const newTargetKey = (show = false) => {    
		let newKey = Util.getNewRandomElement(allKeys, targetKey); 
		changeTargetKey(newKey); 
		if(show) Util.setInnerHTML(newKey, 'keyDisplay');
		return newKey;
	} 

	const modeProps = {mode, changeMode, targetKey, newTargetKey};
	
	// Volume Control
	const [volume, changeVolume] = useState(50);
	const volumeProps = {audioIDs, volume, changeVolume};  

	// Keys
	const keyProps = {allKeys, mode, targetKey, newTargetKey};

	return (
		<div className="pianoContainer" id="pianoContainer"> 
			<AudioElements {...audioProps}/>
			<div className="piano"> 
				<div className="topPiano"> 
					<ModeSelect {...modeProps}/>	
					<div className="pianoDisplay" id="pianoDisplay">
						<div className="keyDisplay" id="keyDisplay"></div>
						<div className="playButtonContainer">
							<div className="playButton" id="playButton"></div>
						</div>
					</div>		
					<VolumeControl {...volumeProps}/>
				</div>
				 
				<Keys {...keyProps}/>
			</div>
		</div>
	)
};  

export default Piano;