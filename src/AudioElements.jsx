import React from 'react';
import Util from './Util.jsx';

const AudioElements = ({audio}) => { 
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