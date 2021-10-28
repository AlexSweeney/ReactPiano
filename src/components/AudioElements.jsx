import React, {useEffect, useState} from 'react';

export default function AudioElements({audioObjects, handleLoad, handleLoadingError}) { 
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
		handleLoad(result)
	}

	function onErrorLoading(error) {
		handleLoadingError(error)
		console.error('ERROR <AudioELements> => loadAllAudio() => audio elements not loaded', error);
	}
	
	// ============================== Helper Fns ============================= //
	function loadAudio({fileName, fileType, id}) {
		return import('./../audio/' + fileName + fileType).then(result => {
			const audioObject = {fileName: fileName, src: result.default};
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
  			loadedAudio.map(({fileName, src}) => {  
  				const id = fileName + '-audio';
  				return <audio src={src} id={id} key={id} preload="auto"/>
  			}) 
  		}
  	</div>
  )
}