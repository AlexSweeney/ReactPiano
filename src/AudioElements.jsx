import React from 'react';
import Util from './Util.jsx';

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

const AudioElements = ({audio, changeAudioElements}) => { 
	const pianoNotesAudio = {C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3};
	
	function makeAudioTag(key, value) {
		return (
			<audio id={key+"_audio"} key={key}>
				<source type="audio/mp3" src={value}/>
			</audio> 
		)
	}   

	function makeAudioElements(audioObjects) {  
		return Util.mapObject(audioObjects, makeAudioTag); 
	} 

	const audioElements = makeAudioElements(audio);  

	return (
		<div className="audioElementContainer">
			{audioElements}
		</div>
	)
}

export default AudioElements;