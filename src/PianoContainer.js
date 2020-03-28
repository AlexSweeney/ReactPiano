import React, {Component, useState} from 'react';
import './piano.css';  
import ShowKey from './ShowKey.js'; 
import SelectKey from './SelectKey.js'; 

import correctSound from './audio/correctSound.mp3';
import incorrectSound from './audio/incorrectSound.mp3'; 

const Piano = () => {
	const [mode, changeMode] = useState('showKey');
	const [targetKey, changeTargetKey] = useState('');

	const allKeys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']; 
	
	function newTargetKey() { 
		let newKey = SelectKey.generateKey(allKeys); 
		changeTargetKey(newKey);
		return newKey;
	}

	let props = {allKeys, mode, changeMode, targetKey, newTargetKey}; 

	return (
			<div className="pianoContainer"> 
				<audio  id="correctSound">
					<source type="audio/mp3" src={correctSound}/>
				</audio>

				<audio id="incorrectSound">
					<source type="audio/mp3" src={incorrectSound}/>
				</audio>

				<div className="piano">
					<p>Mode: {mode}</p>
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
}

const ModeSelect = ({mode, changeMode, targetKey, newTargetKey}) => {   
	let modes = ['showKey', 'selectKey', 'selectByEar'];
	let inputs = null;

	function displayKey(key) {
		document.getElementById('pianoDisplay').innerHTML = key;
	}

	function initShowKey() {
		document.getElementById('pianoDisplay').innerHTML = '';
	}

	function initSelectKey() {
		newTargetKey();
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
}

const Display = () => {
	return (
		<div className="pianoDisplay" id="pianoDisplay"></div>
	)
}

const Keys = (props) => { 
	return(
		<div className="keys"> 
			<Octave octavenumber={0} 
				{...props}/>	
		</div>
	)
} 

class Octave extends Component { 
	constructor(props) {
		super(props); 
		this.allKeys = this.props.allKeys;
		this.returnLeft = this.returnLeft.bind(this);
		this.getWidth = this.getWidth.bind(this);
		this.makeKeys = this.makeKeys.bind(this);
		this.keys = this.makeKeys(this.allKeys);   
	}

	returnLeft(key, i) {
		let x = 3 * i;

		if (key.indexOf('#') != -1) {
			x += 2; 
		}

		return x + 'em';
	}

	makeKeys(keys) {  
		let lastKey;
		let i = 0; 
		let keyType;
		let id;

		let key; 

		return keys.map(function(key) {  
			if(lastKey && lastKey[0] != key[0]) i ++; 
			lastKey = key;
 
			if(key.indexOf('#') == -1) { 
				keyType = 'whiteKey';
				id = i + '#'; 
			} else {
				keyType = 'blackKey';
				id = i + ''; 
			}
 
			return {
				keyType: 	keyType,
				key: 		id,
				left: 		this.returnLeft(key, i), 
				keyName: 	key,
				id: 		id
			}
		}, this);  
	}

	getWidth() {
		let whiteKeys = this.allKeys.filter((key) => { return key.indexOf('#') == -1});
		return (whiteKeys.length * 3) + 'em';
	}

	render() {   
		return ( 
			<div className="octave" style={{width: this.getWidth()}}>
				{this.keys.map((key) => { 
					return <Key keyType={key.keyType} 
								left={key.left} 
								mode={this.props.mode} 
								keyName={key.keyName}
								key={key.id}
								targetKey={this.props.targetKey}
								newTargetKey={this.props.newTargetKey}
							/>
				})}
			</div>
		)
	}
}

class Key extends Component {
	constructor(props) {
		super(props); 
	}

	keyOver(key) {  
		if(this.props.mode === 'showKey') { 
			ShowKey.keyOver(key);
		}
	}

	keyOut(key) {
		if(this.props.mode === 'showKey') {
			ShowKey.keyOut(key);
		}
	}

	keyDown(key) {
		if(this.props.mode === 'selectKey') {    
			SelectKey.keyDown(this.props.keyName, this.props.targetKey, this.props.newTargetKey);
		}
	}

	render() {  
		return (  
			<div className={"key " + this.props.keyType}
				style={{left: this.props.left }} 
				onMouseOver={() => this.keyOver(this.props.keyName)}
				onMouseOut={() => this.keyOut()} 
				onMouseDown={() => this.keyDown(this.props.keyName)}
				id={this.props.keyName}
			>
			</div> 
		)
	}
}

export default Piano;