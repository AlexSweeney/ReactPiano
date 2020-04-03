/* refactor - split into seperate components */

/* add listen and click mode */

/* style */

/* trim audio in ableton, -> sync start */

/* midi keyboard */

/* show scales */

/* settings - number of ocataves */

import React, {Component, useState} from 'react';
import Util from './Util.jsx';

// styles
import './piano.css';  

// components
import AudioElements from './AudioElements.jsx';
/*import ModeSelect from './ModeSelect.jsx';
import VolumeControl from './VolumeControl.jsx';
import Keys from './Keys.jsx'; */

const Piano = () => {
	const allKeys = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 
	 
	// Props 
	/*const audio = {correctSound, incorrectSound, ...pianoNotesAudio};
	const audioProps = {audio};*/

	// const [mode, changeMode] = useState('showKey');
	// const [targetKey, changeTargetKey] = useState(Util.getNewRandomElement(allKeys));
	// const newTargetKey = (show = false) => {   
	// 	let newKey = Util.getNewRandomElement(allKeys, targetKey);
	// 	changeTargetKey(newKey);
	// 	if(show) Util.setInnerHTML(newKey);
	// 	return newKey;
	// } 

	// const modeProps = {mode, changeMode, targetKey, newTargetKey};
	
	// const [volume, changeVolume] = useState(50);
	// const volumeProps = {audio, volume, changeVolume};  

	// const keyProps = {allKeys, mode, targetKey, newTargetKey};

	return (
			<div className="pianoContainer" id="pianoContainer"> 
				<AudioElements/>
				{/*<div className="piano"> 
					<div className="topPiano"> 
						<ModeSelect {...modeProps}/>	
						<div className="pianoDisplay" id="pianoDisplay"></div>		
						<VolumeControl {...volumeProps}/>
					</div>
					 
					<Keys {...keyProps}/>
				</div>*/}
			</div>
		)
};  

export default Piano;