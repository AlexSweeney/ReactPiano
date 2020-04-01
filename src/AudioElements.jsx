import React from 'react';
import Util from './Util.jsx';

const AudioElements = ({audio}) => { 
	function makeAudioTag(name, src) {
		return (
			<audio id={name+"_audio"} key={name}>
				<source type="audio/mp3" src={src}/>
			</audio> 
		)
	}

	function makeAudioTags(audioObjects) {
		let audioTags = [];
		
		audioObjects.forEach((audioObject) => { 
			Object.keys(audioObject).forEach((name) => {
				audioTags.push(makeAudioTag(name, audio[name]));
			}) 
		}) 

		return audioTags;
	}

	function makeAudioElements(audioObjects) {  
		return makeAudioTags(audioObjects);
	} 

	const audioElements = makeAudioElements(audio); 

	return (
		<div className="audioElementContainer">
			{audioElements}
		</div>
	)
}

export default AudioElements;