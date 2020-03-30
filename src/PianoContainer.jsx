/* add key sounds  (mf o:3)*/

import React, {Component, useState} from 'react';
import './piano.css';  
import ShowKey from './ShowKey.jsx'; 
import SelectKey from './SelectKey.jsx'; 

import correctSound from './audio/correctSound.mp3';
import incorrectSound from './audio/incorrectSound.mp3'; 

import C3 from './audio/piano/mf/3/C3.mp3';
// import C#3
/*D3
D#3
E3
F3
F#3 
G3 
G#3 
A3 
A#3 
B3 */

const Piano = () => {
	const allKeys = ['C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3']; 

	const [mode, changeMode] = useState('showKey');
	const [targetKey, changeTargetKey] = useState(randomArrayElement(allKeys));

	const audio = {correctSound, incorrectSound};
	const pianoNotes = [C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3];

	function makeAudioElements(audio) {
		return Object.keys(audio).map((name) => { 
			return (
				<audio id={name} key={name}>
					<source type="audio/mp3" src={audio[name]}/>
				</audio>
			)
		})
	}
		
	function randomArrayElement(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	function newTargetKey(show = false) { 
		let newKey = SelectKey.generateKey(allKeys); 
		changeTargetKey(newKey, targetKey);
		if(show) document.getElementById('pianoDisplay').innerHTML = newKey;
		return newKey;
	} 

	let props = {allKeys, mode, changeMode, targetKey, newTargetKey}; 

	return (
			<div className="pianoContainer"> 
				{makeAudioElements(audio)}

				<div className="piano"> 
					<div className="topPiano"> 
						<ModeSelect allKeys={allKeys} 
									mode={mode} 
									changeMode={changeMode} 
									targetKey={targetKey} 
									newTargetKey={newTargetKey}/>				
						<Display/> 
					</div>
					 
					<Keys {...props}/>
				</div>
			</div>
		)
};

const ModeSelect = ({mode, changeMode, targetKey, newTargetKey}) => {   
	let modes = ['showKey', 'selectKey', 'selectByEar'];
	let inputs = null;

	function displayKey(key) {
		document.getElementById('pianoDisplay').innerHTML = key;
	}

	function initShowKey() {
		displayKey('');
	}

	function initSelectKey() { 
		displayKey(targetKey);
	}

	function initSelectByEar() {
		newTargetKey();
		displayKey('');
	}

	function initMode(newMode) {
		if(newMode === 'showKey') {
			initShowKey();
		} else if (newMode === 'selectKey') {   
			initSelectKey();
		} else if (newMode === 'selectByEar') {
			initSelectByEar();
		}
	}

	function clickModeChange(newMode) {   
		if(newMode !== mode) {
			changeMode(newMode); 
			selectRadio(newMode);
			initMode(newMode);
		}  
	}

	function selectRadio(newMode) { 
		if(!inputs) {
			inputs = modes.map((mode) => {
				return document.getElementById(mode+"Input");
			}); 
		}

		inputs.forEach((input) => {
			if(input.value === newMode) {
				input.checked = true;
			} else {
				input.checked = false;
			}
		}); 
	}
 	
 	function returnInput(mode) { 
 		return (
 			<div key={mode}>
				<input type="radio" 
						name="mode"
						value={mode}
						id={mode+"Input"}
						onClick={() => { clickModeChange(mode) }}
						defaultChecked={mode === "showKey"}
				/>
				<label htmlFor={mode}  
						onClick={() => { clickModeChange(mode) }} 
				>{mode}</label>
				<br/> 
			</div>
 		)
 	} 
	
	return (
		<form name="modeSelectForm">    
			{modes.map((mode) => { 
				return returnInput(mode);
			})}
		</form>
	) 
};

const Display = () => {
	return (
		<div className="pianoDisplay" id="pianoDisplay"></div>
	)
};

const Keys = (props) => { 
	return(
		<div className="keys"> 
			<Octave octaveNumber={0} 
				{...props}/>	
		</div>
	)
};

const Octave = (props) => {
	const whiteKeyWidth = 3;
	const blackKeyOffset = 2;
	const whiteKeys = props.allKeys.filter((key) => { return key.indexOf('#') == -1});
	const keyArray = makeKeyArray(props.allKeys);
	const keyElements = makeKeyElements(keyArray);    

	function returnLeft(key, i) { 
		let whiteKey = key.replace('#', ''); 
		let offset = whiteKeys.indexOf(whiteKey) * whiteKeyWidth;

		if(key.indexOf('#') !== -1) {
			offset += blackKeyOffset;
		}
		
		return offset + 'em'; 
	}

	function makeKeyArray(keys) { 
		return keys.map((key) => { 
			return {
				id: key,
				key: key, 
				keyName: key,
				keyType: key.includes('#') ? 'blackKey' : 'whiteKey',
				left: returnLeft(key)				
			}
		})
	}

	function makeKeyElements(keys) {
		return keys.map((key) => { 
			return <Key keyType={key.keyType} 
				left={key.left} 
				keyName={key.keyName}
				key={key.id}
				{ ...props}
			/>
		});	
	}

	function getWidth() { 
		return (whiteKeys.length * whiteKeyWidth) + 'em';
	}
  
	return ( 
		<div className="octave" style={{width: getWidth()}}>  
			{keyElements}
		</div>
	)
};

const Key = ({mode, keyName, keyType, left, targetKey, newTargetKey}) => {
	function keyOver(key) {   
		if(mode === 'showKey') { 
			ShowKey.keyOver(key);
		}
	}

	function keyOut(key) {
		if(mode === 'showKey') {
			ShowKey.keyOut(key);
		}
	}

	function keyDown(key) {
		if(mode === 'selectKey') {    
			SelectKey.keyDown(key, targetKey, newTargetKey);
		}
	}

	return (  
		<div className={"key " + keyType}
			style={{left}} 
			onMouseOver={() => keyOver(keyName)}
			onMouseOut={() => keyOut()} 
			onMouseDown={() => keyDown(keyName)}
			id={keyName}
		>
		</div> 
	)
}

export default Piano;