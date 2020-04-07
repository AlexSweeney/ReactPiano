/* Ears (this) --- eyes (sightreading) */

/* style  - basic
	un camel case modes for display
	
	top piano padding 
	
	move play button next to volume control

	play button - play style, off style

	key colors when press with keyboard
*/

/* trim audio in ableton, -> sync start */

/* midi keyboard */

/* show scales */

/* settings - number of ocataves 
			- custom number of keys
*/

/* skins - https://freefrontend.com/css-radio-buttons/ */

/* melody mode - listen and play 
	show sheet music

	bars: 1, 2, 3, 4, 8, 16, 32
*/

/* chord mode - listen and play, check sheet music */
	

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

	// Target Key 
	const [targetKey, changeTargetKey] = useState('not set');

	function setNewTargetKey() {
		let newKey = Util.getNewRandomElement(allKeys, targetKey); 
		changeTargetKey(newKey); 
		return newKey;  
	}
	
	// Audio Elements
	let [audioIDs, changeAudioIDs] = React.useState([]);
	let audioProps = {changeAudioIDs}; 

	// Mode Select
	const [mode, changeMode] = useState('showKey'); 
	
	const modeProps = {mode, changeMode, targetKey, setNewTargetKey};

	// Piano Display
	const pianoDisplayProps = {targetKey};
	
	// Volume Control
	const [volume, changeVolume] = useState(30);
	const volumeProps = {audioIDs, volume, changeVolume};  

	// Keys
	const keyProps = {allKeys, mode, targetKey, setNewTargetKey};

	return (
		<div className="pianoContainer" id="pianoContainer">  
			<AudioElements {...audioProps}/>
			<div className="piano"> 
				<div className="topPiano"> 
					<ModeSelect {...modeProps}/>
					<div className="topPianoRight">	
						<PianoDisplay {...pianoDisplayProps}/>
						<VolumeControl {...volumeProps}/>
					</div>
				</div>
				 
				<Keys {...keyProps}/>
			</div>
		</div>
	)
};  

const PianoDisplay = ({targetKey}) => {
	function handlePlayButtonClick(targetKey) { 
		Util.playAudio(targetKey);
	}

	return (
		<div className="pianoDisplay" id="pianoDisplay">
			<div className="keyDisplay" id="keyDisplay"></div>
			<div className="playButtonContainer">
				<div className="playButton" id="playButton" onClick={() => handlePlayButtonClick(targetKey)}></div>
			</div>
		</div>		
	)
}

export default Piano;