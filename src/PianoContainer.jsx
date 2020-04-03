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
import ModeSelect from './ModeSelect.jsx';
import VolumeControl from './VolumeControl.jsx';
import Keys from './Keys.jsx';
import Octave from './Octave.jsx'; 

// Sounds
import correctSound from './audio/correctSound.mp3';
import incorrectSound from './audio/incorrectSound.mp3'; 

// Keys
import C3 from './audio/piano/mf/3/C3.mp3';
import Db3 from './audio/piano/mf/3/Db3.mp3';
import D3 from './audio/piano/mf/3/D3.mp3';
import Eb3 from './audio/piano/mf/3/Eb3.mp3';
import E3 from './audio/piano/mf/3/E3.mp3';
import F3 from './audio/piano/mf/3/F3.mp3';
import Gb3 from './audio/piano/mf/3/Gb3.mp3';
import G3 from './audio/piano/mf/3/G3.mp3';
import Ab3 from './audio/piano/mf/3/Ab3.mp3';
import A3 from './audio/piano/mf/3/A3.mp3';
import Bb3 from './audio/piano/mf/3/Bb3.mp3';
import B3 from './audio/piano/mf/3/B3.mp3';

const Piano = () => {
	const allKeys = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 
	const keyMap = {'a': 'C3', 
					'w': 'Db3', 
					's': 'D3',
					'e': 'Eb3', 
					'd': 'E3',
					'f': 'F3',
					't': 'Gb3',
					'g': 'G3',
					'y': 'Ab3',
					'h': 'A3',
					'u': 'Bb3',
					'j': 'B3'
					};
	 
	// Props 
	const pianoNotesAudio = {C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3};
	const audio = {correctSound, incorrectSound, ...pianoNotesAudio};
	const audioProps = {audio};

	const [mode, changeMode] = useState('showKey');
	const [targetKey, changeTargetKey] = useState(Util.getNewRandomElement(allKeys));
	const newTargetKey = (show = false) => {   
		let newKey = Util.getNewRandomElement(allKeys, targetKey);
		changeTargetKey(newKey);
		if(show) Util.setInnerHTML(newKey);
		return newKey;
	} 

	const modeProps = {mode, changeMode, targetKey, newTargetKey};

	const [volume, changeVolume] = useState(50);
	const volumeProps = {audio, volume, changeVolume};  

	const keyProps = {allKeys};

	return (
			<div className="pianoContainer" id="pianoContainer"> 
				<AudioElements {...audioProps}/>
				<div className="piano"> 
					<div className="topPiano"> 
						<ModeSelect {...modeProps}/>	
						<div className="pianoDisplay" id="pianoDisplay"></div>		
						<VolumeControl {...volumeProps}/>
					</div>
					 
					<Keys {...keyProps}/>
				</div>
			</div>
		)
};  

export default Piano;