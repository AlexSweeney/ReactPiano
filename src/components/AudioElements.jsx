import React, {useEffect, useState} from 'react';
import {mapObject} from './utils.js';

// Sounds
import correctSound from './../audio/correctSound.mp3';
import incorrectSound from './../audio/incorrectSound.mp3'; 

// Keys
import C3 from './../audio/piano/mf/3/C3.mp3';
import Db3 from './../audio/piano/mf/3/Db3.mp3';
import D3 from './../audio/piano/mf/3/D3.mp3';
import Eb3 from './../audio/piano/mf/3/Eb3.mp3';
import E3 from './../audio/piano/mf/3/E3.mp3';
import F3 from './../audio/piano/mf/3/F3.mp3';
import Gb3 from './../audio/piano/mf/3/Gb3.mp3';
import G3 from './../audio/piano/mf/3/G3.mp3';
import Ab3 from './../audio/piano/mf/3/Ab3.mp3';
import A3 from './../audio/piano/mf/3/A3.mp3';
import Bb3 from './../audio/piano/mf/3/Bb3.mp3';
import B3 from './../audio/piano/mf/3/B3.mp3';

// export default function AudioElements({setAudioIDs}) {  
// 	/* 
// 		* render audio elements for piano notes and feedback sounds
	
// 		* set audio ids on render
// 	*/

// 	// ============================ Constants ============================ //
// 	const pianoNotesAudio = {C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3};
// 	const audio = {correctSound, incorrectSound, ...pianoNotesAudio};
// 	const audioElements = makeAudioElements(audio);
	
// 	// ============================ Functions ============================ //
// 	function makeAudioTag(key, value) { 
// 		return (
// 			<audio id={`${key}_audio`} key={key}>
// 				<source type="audio/mp3" src={value}/>
// 			</audio> 
// 		)
// 	}   

// 	function makeAudioElements(audioObjects) {   
// 		return mapObject(audioObjects, makeAudioTag); 
// 	} 

// 	function getIDsFromElements(elements) {
// 		return elements.map(element => element.props.id);
// 	}

// 	useEffect(() => {
// 		setAudioIDs(getIDsFromElements(audioElements));
// 	}, []); 

// 	// ============================ Output ============================ //
// 	return (
// 		<div className="audioElementContainer">
// 			{audioElements}
// 		</div>
// 	)
// }

export default function AudioElements({ids, onLoad}) { 
	/*
		* import audio file for each id
		* create audio element for each id
	*/ 

	// ============================== Constants ============================== //
	const [loadedAudio, setLoadedAudio] = useState({});
	const [finishedLoading, setFinishedLoading] = useState(false);

	// ============================== Helper Fns ============================= //
	async function loadAudio(id) {
		return await import(`./../audio/${id}.mp3`).then(result => {
			return {id: id, src: result.default};
		})
	} 

	function loadAudioFromIds(ids) {
		const promises = ids.map(id => loadAudio(id));
		Promise.all(promises).then((result) => { 
			setLoadedAudio(result)
			setFinishedLoading(true)
			onLoad()
		})
	}

	// ============================== Listen / trigger ======================= //
	useEffect(() => {
		loadAudioFromIds(ids)
	}, [])
 	
 	// ============================== Output ================================ //
  return (
  	<div className="audio-element-container"> 
  		{	
  			finishedLoading &&
  			loadedAudio.map(audioObject => { 
  				const {id, src} = audioObject;
  				return <audio src={src} id={id} key={id} preload="true"/>
  			}) 
  		}
  	</div>
  )
}   