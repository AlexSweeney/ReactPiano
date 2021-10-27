import React, {useEffect, useState} from 'react';

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