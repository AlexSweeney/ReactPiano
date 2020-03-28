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
					<div className="topPiano"> 
						<ModeSelect {...props}/>
						{/*<ModeSelect allKeys={allKeys} changeMode={changeMode} mode={state.mode} newTargetKey={newTargetKey}/>*/}						
						<Display/> 
					</div>
					 
					{/*<Keys allKeys={allKeys} newTargetKey={newTargetKey} mode={state.mode} targetKey={this.state.targetKey}/>*/}
				</div>
			</div>
		)
}

/*class Piano extends Component { 
	constructor(props) {
		super(props);

		this.state = {
			mode: 'showKey',
			targetKey: '',
		} 
	
		this.allKeys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']; 
		this.changeMode = this.changeMode.bind(this);
		this.newTargetKey = this.newTargetKey.bind(this);
	}

	changeMode(newMode) { 
		this.setState({mode: newMode});  
	}

	newTargetKey() { 
		let newKey = SelectKey.generateKey(this.allKeys); 
		this.setState({targetKey: newKey});
		return newKey;
	}
	
	render() {
		return (
			<div className="pianoContainer"> 
				<audio  id="correctSound">
					<source type="audio/mp3" src={correctSound}/>
				</audio>

				<audio id="incorrectSound">
					<source type="audio/mp3" src={incorrectSound}/>
				</audio>

				<div className="piano">
					<div className="topPiano"> 
						<ModeSelect allKeys={this.allKeys} changeMode={this.changeMode} mode={this.state.mode} newTargetKey={this.newTargetKey}/>
						<Display/> 
					</div>
					 
					<Keys allKeys={this.allKeys} newTargetKey={this.newTargetKey} mode={this.state.mode} targetKey={this.state.targetKey}/>
				</div>
			</div>
		)
	}
}*/

const ModeSelect = ({mode, changeMode, targetKey, newTargetKey}) => {   
	let modes = ['showKey', 'selectKey', 'selectByEar'];

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

	function switchMode(newMode) {
		changeMode(newMode);
		selectRadio('modeSelectForm', newMode);
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
		changeMode(newMode);
		if(newMode !== mode) initMode();
	}

	function selectRadio(form, targetValue) {
		let formItems = Array.from(document[form].children); 

		formItems.forEach((item) => {
			if(item.type === 'radio') { 
				if(item.value === targetValue) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			}
		});
	}
 	
 	function returnInput(mode) {
 		return (
 			<div key={mode}>
				<input type="radio" 
						name="mode"
						value={mode} 
						onClick={() => { clickModeChange(mode) }}
						defaultChecked 
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

/*class ModeSelect extends Component { 
	constructor(props) {
		super(props);  
	}

	displayKey(key) {
		document.getElementById('pianoDisplay').innerHTML = key;
	}

	initShowKey() {
		document.getElementById('pianoDisplay').innerHTML = '';
	}

	initSelectKey() {
		let key = this.props.newTargetKey();
		this.displayKey(key);
	}

	initSelectByEar() {
		let key = this.props.newTargetKey();
		document.getElementById('pianoDisplay').innerHTML = '';
	}

	switchMode(newMode) {
		this.props.changeMode(newMode);
		this.selectRadio('modeSelectForm', newMode);
	}

	clickModeChange(newMode) {  
		let oldMode = this.props.mode; 
		this.switchMode(newMode);

		if(newMode === 'showKey') {
			this.initShowKey();
		} else if (newMode === 'selectKey' && oldMode !== 'selectKey') {   
			this.initSelectKey();
		} else if (newMode === 'selectByEar' && oldMode !== 'selectByEar') {
			this.initSelectByEar();
		}
	}

	selectRadio(form, targetValue) {
		let formItems = Array.from(document[form].children); 

		formItems.forEach((item) => {
			if(item.type === 'radio') { 
				if(item.value === targetValue) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			}
		});
	}

	render() {
		return (
			<form name="modeSelectForm">  
				
				<input type="radio" 
						name="mode"
						value="showKey" 
						onClick={() => { this.clickModeChange("showKey") }}
						defaultChecked 
				/>
				<label htmlFor="showKey"  
						onClick={() => { this.clickModeChange("showKey") }} 
				>Show Key</label>
				<br/> 
				
				<input type="radio"   
						name="mode"
						value="selectKey"
						onClick={() => { this.clickModeChange("selectKey") }}
				/>
				<label htmlFor="selectKey"  
						onClick={() => { this.clickModeChange("selectKey") }}
				>Select Key</label> 
				<br/>
 
				<input type="radio"
						name="mode"
						value="selectByEar"
						onClick={() => { this.clickModeChange("selectByEar")}}
				/>
				<label htmlFor="selectByEar"
						onClick={() => { this.clickModeChange("selectByEar")}}
				>Select Key by Ear</label>
			</form>
		)
	}
}*/

class Display extends Component {
	render() {
		return (
			<div className="pianoDisplay" id="pianoDisplay"></div>
		)
	}
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