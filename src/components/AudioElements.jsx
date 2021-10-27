import React, {useEffect, useState} from 'react';
import {mapObject} from './utils.js';

// Sounds
// import correctSound from './../audio/correctSound.mp3';
// import incorrectSound from './../audio/incorrectSound.mp3'; 

// Keys
// import C3 from './../audio/piano/mf/3/C3.mp3';
// import Db3 from './../audio/piano/mf/3/Db3.mp3';
// import D3 from './../audio/piano/mf/3/D3.mp3';
// import Eb3 from './../audio/piano/mf/3/Eb3.mp3';
// import E3 from './../audio/piano/mf/3/E3.mp3';
// import F3 from './../audio/piano/mf/3/F3.mp3';
// import Gb3 from './../audio/piano/mf/3/Gb3.mp3';
// import G3 from './../audio/piano/mf/3/G3.mp3';
// import Ab3 from './../audio/piano/mf/3/Ab3.mp3';
// import A3 from './../audio/piano/mf/3/A3.mp3';
// import Bb3 from './../audio/piano/mf/3/Bb3.mp3';
// import B3 from './../audio/piano/mf/3/B3.mp3';


/*import A3 from  './../audio/piano/A3.mp3';
import Ab3 from './../audio/piano/Ab3.mp3';
import B3 from  './../audio/piano/B3.mp3';
import Bb3 from './../audio/piano/Bb3.mp3';
import C3 from  './../audio/piano/C3.mp3';
import D3 from  './../audio/piano/D3.mp3';
import Db3 from './../audio/piano/Db3.mp3';
import E3 from  './../audio/piano/E3.mp3';
import Eb3 from './../audio/piano/Eb3.mp3';
import F3 from  './../audio/piano/F3.mp3';
import G3 from  './../audio/piano/G3.mp3';
import Gb3 from './../audio/piano/Gb3.mp3';
*/

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

export default function AudioElements({audioObjects, onLoad, handleLoadingError}) { 
	/*
		* on render
			* import audio file for each id

		* on load
			* create audio element for each id
			* preload audio element
			* call onLoad fn
	*/  
	// ============================== Constants ============================== //
	const containerId = 'audio-elements-container';
	const [loadedAudio, setLoadedAudio] = useState({});
	const [finishedLoading, setFinishedLoading] = useState(false);

	// ============================== Event Handlers ========================= //
	function onRender() {
		loadAllAudio(audioObjects)
	}

	function onAudioLoaded(result) {
		setLoadedAudio(result)
		setFinishedLoading(true) 
		onLoad()
	}

	function onErrorLoading(error) {
		handleLoadingError(error)
		console.error('ERROR <AudioELements> => loadAllAudio() => audio elements not loaded', error);
	}
	
	// ============================== Helper Fns ============================= //
	function loadAudio(object) {
		return import(object.path).then(result => {
			const audioObject = {id: object.id, src: result.default};
			return audioObject;
		}) 
	} 

	function loadAllAudio(audioObjects) {
		const promises = audioObjects.map(object => {
			return loadAudio(object)
		}) 

		Promise.all(promises)
			.then((result) => onAudioLoaded(result))
			.catch((error) => onErrorLoading(error))
	}

	// ============================== Listen / trigger ======================= //
	useEffect(() => {
		onRender()
	}, [])
 	
 	// ============================== Output ================================ //
  return (
  	<div className="audio-element-container" id={containerId}> 
  		{	
  			finishedLoading &&
  			loadedAudio.map(audioObject => { 
  				const {id, src} = audioObject;
  				return <audio src={src} id={id} key={id} preload="auto"/>
  			}) 
  		}
  	</div>
  )
}   

	/*return await import(object.path).then(result => {
			const audioObject = {id: object.id, src: result.default};
			return audioObject;
		})*/

		/*return new Promise(resolve => {
			import(object.path).then(result => {
				const audioObject = {id: object.id, src: result.default}
				resolve(audioObject)
			})
		})*/

		/*Promise.all(promises).then(() => {
			onLoad()
			console.log('fin')
		})*/

	/*	.then((result) => {
			setLoadedAudio(result)
			setFinishedLoading(true)
			console.log('fin ---')
			console.log(onLoad)
			onLoad()
		}).catch((error) => {
			console.log('ERROR <AudioELements> => loadAllAudio() :', error)
		})*/

		/*Promise.all(promises).then((result) => {
			setLoadedAudio(result)
			setFinishedLoading(true)
			console.log('fin ---')
			console.log(onLoad)
			onLoad()
		}).catch((error) => {
			console.log('ERROR <AudioELements> => loadAllAudio() :', error)
		})*/



		// const ids = audioObjects.map(object => object.id);


		/*const promises = ids.map(id => loadAudio(id).then((result) => {
			console.log(result)
		}))*/

		/*loadAudio(audioObjects[0]).then((result) => { 
			console.log('loaded in loadAll')
			console.log(result)
		})
*/
		/*

		const promises = ids.map(id => loadAudio(id));
		
		Promise.all(promises).then((result) => { 
			setLoadedAudio(result)
			setFinishedLoading(true)
			onLoad()
		}).catch((error) => {
			console.log('ERROR <AudioELements> => loadAllAudio() :', error)
		})*/