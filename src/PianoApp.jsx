import React, {useState, useEffect} from 'react';
import {getNewRandomArrayElement} from './components/utils.js';
import AudioElements from './components/AudioElements.jsx'; 
import ModeSelect from './components/ModeSelect.jsx';
import PianoDisplay from './components/PianoDisplay.jsx';
import VolumeControl from './components/VolumeControl.jsx';
import Keys from './components/Keys.jsx';
import {getElement} from './components/utils.js';

// import Key from './components/parts/Key.jsx';

import './PianoApp.css';  
 
export default function Piano() {
	/*
		- on render
			- show mode selector
			- show feedback window
			- show volume slider
			- show piano keys
		
		- on load audio error
			- show overlay with error infomation

		- on show key mode 
			- on key hover
				- show key name in display
			- on key press 
				- play note

		- on select key mode
			- on turn start
				- show targe key in display
			- on key press
				- on wrong answer
					- play incorrect sound
					- flash key red
				- on correct answer 
					- play correct sound
					- flash key green
					- start new turn
				
		- on select key by ear mode
			- on turn start
				- play key sound
				- show play button in display
			- on play button click
				- play target sound
			- on key press
				- on wrong answer
					- play incorrect sound
					- flash key red

				- on correct answer 
					- play correct sound
					- flash key green
					- start new turn

		- on resize
			- keep proportions
	*/

	/*	
		load audio 
			audio element object => use to play = don't have to search everytime play
			to do -> give root directory -> auto load all audio from folder?
	*/

	// ================================== Constants =========================== //
	const id = 'piano-app';

	// =================== Keys
	const allKeys = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 
	const [targetKey, setTargetKey] = useState('');
	
	// =================== Mode Select
	const modes = ['show-key', 'select-key', 'select-key-by-ear'];
	const defaultMode = modes[0];
	const [mode, setMode] = useState(defaultMode); 

	// =================== Display
	const [displayString, setDisplayString] = useState('');

	// =================== Audio 
	const fileType = '.mp3';

	const audioIds = [ ...allKeys, 'correctSound', 'incorrectSound'];

	const audioObjects = audioIds.map((id) => { 
		return {
			fileName: id,
			fileType: fileType,
			id: `${id}-audio`,
		}
	})

	const [audioElements, setAudioElements] = useState({}); 
 
	console.log('audioElements on rend ------------')
	console.log(audioElements)
	
	const correctSound = document.getElementById('correctSound-audio');
	const incorrectSound = document.getElementById('incorrectSound-audio');
 
	// =================== Play Button
	const [showPlayButton, setShowPlayButton] = useState(false); 
	const [playButtonIsDown, setPlayButtonIsDown] = useState(false);

	// =================== Delays
	const feedbackSoundDelay = 750;	
	const colorHightLightTime = 1000;

	// ===================  Volume Control
	const [volume, setVolume] = useState(30); 

	// ================================== Event Handlers =========================== //
	// ======================== Audio
	function onLoadAudio(audio) {
		console.log('onLoadAudio --------------')
		getAudioElements(audio) 
	} 

	function onLoadAudioError() {

	}

	// ======================== Keys
	// ============= key over
	function onKeyOver(keyName) {  
		if(mode === 'show-key') {
			setDisplayString(keyName)
		} 
	}

	// ============= key out 
	function onKeyOut(keyName) {
		if(mode === 'show-key') {
			setDisplayString('')
		}
	}

	// ============= key down
	function onKeyDown(keyName) {
		if(mode === 'show-key') {
			playSound(keyName)
		}

		if(mode === 'select-key') {
			selectKey(keyName)
		}

		if(mode === 'select-key-by-ear') {
			selectKeyByEar(keyName)
		}
	}

	// ============= press correct
	function onPressCorrect(keyName) { 
		playSound(keyName)
		flashKeyColor(keyName, 'correct')
		
		setTimeout(() => {
			playSound(correctSound)
		}, feedbackSoundDelay) 
	}

	// ============= press incorrect
	function onPressIncorrect(keyName) { 
		playSound(keyName)
		flashKeyColor(keyName, 'incorrect')

		setTimeout(() => {
			playSound(incorrectSound)
		}, feedbackSoundDelay) 
	} 

	// ======================== Play Button
	// ============= play button
	function onPlayButtonClick() {
		playSound(targetKey)
	}

	// ======================== Mode
	// ============= mode radio 
	function onClickRadio(value) {
		setMode(value)
	} 

	// ============= mode change
	function onChangeMode() {
		setDisplayString('')

		if(mode === 'select-key') {
			startSelectKeyMode()
		}

		if(mode === 'select-key-by-ear') {
			startSelectByEar()
		}

		if(mode === 'select-key-by-ear') {
			setShowPlayButton(true)
		} else {
			setShowPlayButton(false)
		}
	}

	// ================================== Helper fns =========================== //
	function playSound(id) { 
		let sound = audioElements[id];

		if(sound.currentTime !== 0) {
			sound.pause();
			sound.currentTime = 0;
		}
		
		sound.play()
	}
/*	function playSound(sound) {
		sound.pause();
		sound.currentTime = 0;
		sound.play()
	}
*/
	/*function playKeySound(name) { 
		const id = `${name}-audio`;
		const audioElement = getElement(id);
		playSound(audioElement)
	}*/

	function getAudioElements(audio) {
		let obj = {};

		audio.forEach(({id}) => {
			obj[id] = getElement(id)
		})

		setAudioElements(obj)
	}

	function generateTargetKey() {
		return getNewRandomArrayElement(allKeys, targetKey);   
	}

	function flashKeyColor(keyName, className) {
		const id = `key-${keyName}`;
		flashColor(id, className)
	}

	function flashColor(id, className) {
		const element = document.getElementById(id); 
		element.classList.add(className)

		setTimeout(() => {
			element.classList.remove(className)
		}, colorHightLightTime) 
	}

	function flashPlayButtonColor() {
		setPlayButtonIsDown(true)

		setTimeout(() => {
			setPlayButtonIsDown(false)
		}, 1000)
	}

	// ================================== Mode fns =========================== //
	// ====================== Select Key Mode
	function startSelectKeyMode() {
		const newTargetKey = generateTargetKey();
		setTargetKey(newTargetKey) 
		setDisplayString(newTargetKey)
	}

	function selectKey(keyName) {
		const correct = keyName === targetKey;

		if(correct) {
			onPressCorrect(keyName)

			setTimeout(() => {
				startSelectKeyMode()
			}, 2000) 
		}
		if(!correct) onPressIncorrect(keyName)
	} 

	// ====================== Select By Ear Mode
	function startSelectByEar() {
		const newTargetKey = generateTargetKey();
		
		setTargetKey(newTargetKey) 
		playSound(newTargetKey) 
		flashPlayButtonColor()

		setDisplayString('')
	}

	function selectKeyByEar(keyName) {
		const correct = keyName === targetKey;

		if(correct) {
			setShowPlayButton(false)
			onPressCorrect(keyName)
			setDisplayString(keyName)
			
			setTimeout(() => {
				startSelectByEar()
				setShowPlayButton(true)
			}, 3000)
		}
		if(!correct) onPressIncorrect(keyName)
	}
 
	// ================================== Listen / Trigger =========================== //
	useEffect(() => {
		onChangeMode()
	}, [mode])  

	// ================================== Output =========================== //
	return (
		<div className="piano" id={id}> 
			<AudioElements 
				audioObjects={audioObjects}
				handleLoad={onLoadAudio}
				handleLoadingError={onLoadAudioError}/>

			<div className="piano-controls">
				<div className="left-piano-controls">
					<ModeSelect modes={modes} defaultMode={defaultMode} handleClick={onClickRadio}/>
				</div>
				<div className="right-piano-controls">
					<PianoDisplay
						displayString={displayString}
						showPlayButton={showPlayButton} 
						handlePlayButtonClick={onPlayButtonClick}
						playButtonDown={playButtonIsDown}
					/>
					<VolumeControl
						audioIDs={audioIds}
						volume={volume}
						setVolume={setVolume}
					/> 
				</div>
			</div>

			<Keys 
				keyNames={allKeys} 
				handleOver={onKeyOver}
				handleOut={onKeyOut}
				handleDown={onKeyDown}
				/>
		</div>
	)
};

{/*
	{/*<PianoControls
					mode={mode}
					setMode={setMode}
					displayString={displayString}
					volume={volume}
					setVolume={setVolume}
					audioIDs={audioIDs}
					showPlayButton={showPlayButton}
					handlePlayButtonClick={onPlayButtonClick}
					playButtonDown={playButtonIsDown}
				/> 

					<div style={{width: '100px', height: '100px', 'min-height': '125px', border: '2px solid blue', resize: 'both', overflow: 'auto'}} id="box"> 
				<Keys keyNames={allKeys}/>
		</div>

			<Keys keyNames={allKeys}/>
			{/*<AudioElements setAudioIDs={setAudioIDs}/>
			
			<div className="piano">  
				

				<Keys
					handleOver={onKeyOver}
					handleOut={onKeyOut}
					handleDown={onKeyDown}
				/>
			</div>
		</div>*/}