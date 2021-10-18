import React, {useState, useEffect} from 'react';
import {getNewRandomArrayElement} from './components/utils.js';
import AudioElements from './components/AudioElements.jsx';
import PianoControls from './components/PianoControls.jsx';
import Keys from './components/Keys.jsx';

import Key from './components/parts/Key.jsx';

import './PianoApp.css';  
 
export default function Piano() {
	/*
		* show controls with mode selector
		* show feedback window
		* show piano keys
		
		* handle key events based on mode
	*/

	// ================================== Constants =========================== //
	// =================== Keys
	const allKeys = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 
	const [targetKey, setTargetKey] = useState('');
	
	// =================== Mode Select
	const [mode, setMode] = useState('show-key'); 

	// =================== Display
	const [displayString, setDisplayString] = useState('');

	// =================== Audio
	const [audioIDs, setAudioIDs] = useState([

	]);
	const correctSound = document.getElementById('correctSound_audio');
	const incorrectSound = document.getElementById('incorrectSound_audio');

	// =================== Play Button
	const [showPlayButton, setShowPlayButton] = useState(false); 
	const [playButtonIsDown, setPlayButtonIsDown] = useState(false);

	// =================== Delays
	const feedbackSoundDelay = 750;	
	const colorHightLightTime = 1000;

	// ===================  Volume Control
	const [volume, setVolume] = useState(30); 

	// ================================== Event Handlers =========================== //
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
			playKeySound(keyName)
		}

		if(mode === 'select-key') {
			selectKey(keyName)
		}

		if(mode === 'select-key-by-ear') {
			selectKeyByEar(keyName)
		}
	}

	// ============= play button
	function onPlayButtonClick() {
		playKeySound(targetKey)
	}

	// ============= press correct
	function onPressCorrect(keyName) { 
		playKeySound(keyName)
		flashKeyColor(keyName, 'correct')
		
		setTimeout(() => {
			playSound(correctSound)
		}, feedbackSoundDelay) 
	}

	function onPressIncorrect(keyName) { 
		playKeySound(keyName)
		flashKeyColor(keyName, 'incorrect')

		setTimeout(() => {
			playSound(incorrectSound)
		}, feedbackSoundDelay) 
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
	function playSound(sound) {
		sound.pause();
		sound.currentTime = 0;
		sound.play()
	}

	function playKeySound(name) { 
		const id = `${name}_audio`;
		const audioElement = document.getElementById(id);
		playSound(audioElement)
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
		playKeySound(newTargetKey) 
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
		<div style={{width: '500px', height: '500px', 'min-height': '125px', border: '2px solid blue', resize: 'both', overflow: 'auto'}} id="box">
			<Key keyName="C3"/>
			{/*<AudioElements setAudioIDs={setAudioIDs}/>
			
			<div className="piano">  
				<PianoControls
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

				<Keys
					handleOver={onKeyOver}
					handleOut={onKeyOut}
					handleDown={onKeyDown}
				/>
			</div>*/}
		</div>
	)
};