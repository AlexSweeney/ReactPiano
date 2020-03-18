import React, {Component} from 'react';
import './piano.css';  
import ShowKey from './ShowKey.js';
/*import PianoJS from './Piano.js'; 

let {keys, mode, keyOver, keyOut} = PianoJS;  */ 

class Piano extends Component { 
	constructor(props) {
		super(props);

		this.state = {
			mode: 'showKey'
		} 
	
		this.allKeys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b']
	}
		
	render() {
		return (
			<div className="pianoContainer">
				<div className="piano">
					<div className="topPiano"> 
						<ModeSelect/>
						<Display/> 
					</div>
					 
					<Keys allKeys={this.allKeys} mode={this.state.mode}/>
				</div>
			</div>
		)
	}
}

class ModeSelect extends Component { 
	constructor(props) {
		super(props);  
	}

	clickModeChange(newMode) { 
		this.changeMode(newMode);
		this.selectRadio('modeSelectForm', newMode);
	}

	changeMode(newMode) {
		this.setState({mode: newMode});  
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
				defaultChecked/>
				<label htmlFor="showKey"  
						onClick={() => { this.clickModeChange("showKey") }} 
				>Show Key</label><br/> 

				<input type="radio"   
						name="mode"
						value="selectKey"
						onClick={() => { this.clickModeChange("selectKey") }}
				/>
				<label htmlFor="selectKey"  
						onClick={() => { this.clickModeChange("selectKey") }}
				>Select Key</label> 
			</form>
		)
	}
}

class Display extends Component {
	render() {
		return (
			<div className="pianoDisplay" id="pianoDisplay"></div>
		)
	}
}

class Keys extends Component {
	constructor(props) {
		super(props);  
	}

	render() {
		return (
			<div className="keys">
				<Octave octavenumber={0} allKeys={this.props.allKeys} mode={this.props.mode}/>
			</div>
		)
	}
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

		return keys.map(function(key) {  
			if(lastKey && lastKey[0] != key[0]) i ++; 
			lastKey = key;
 
			if(key.indexOf('#') == -1) {
				return <WhiteKey keyname={key} key={i} left={this.returnLeft(key, i)} mode={this.props.mode} />
			} else {
				return <BlackKey keyname={key} key={i+"#"} left={this.returnLeft(key, i)} mode={this.props.mode} />
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
				{ this.keys }  
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
}

class WhiteKey extends Key {	
	render() {
		return (
			<div className="key whiteKey" 
				style={{left: this.props.left }} 
				onMouseOver={() => this.keyOver(this.props.keyname)}
				onMouseOut={() => this.keyOut()}
			>
			</div> 
		)
	}
} 

class BlackKey extends Key {
	render() {
		return (
			<div className="key blackKey" 
				style={{left: this.props.left }}
				onMouseOver={() => this.keyOver(this.props.keyname)}
				onMouseOut={() => this.keyOut()} 
			>
			</div>
		)
	}
} 

export default Piano;