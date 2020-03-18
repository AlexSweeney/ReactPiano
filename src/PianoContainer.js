import React, {Component} from 'react';
import './piano.css';  
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
					 
					<Keys allKeys={this.allKeys}/>
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
				/>
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
		console.log(this);
	}

	render() {
		return (
			<div className="keys">
				<Octave octavenumber={0} allKeys={this.props.allKeys}/>
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
		let returnLeft = this.returnLeft;
		let lastKey;
		let i = 0;

		return keys.map(function(key) { 
			if(lastKey && lastKey[0] != key[0]) i ++; 
			lastKey = key;
 
			if(key.indexOf('#') == -1) {
				return <WhiteKey keyname={key} key={i} left={returnLeft(key, i)}/>
			} else {
				return <BlackKey keyname={key} key={i} left={returnLeft(key, i)}/>
			}
		});  
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
}

{/*onMouseOver={() => keyOver(this.props.keyname)}
				onMouseOut={() => keyOut()}*/}

class WhiteKey extends Key {	
	render() {
		return (
			<div className="key whiteKey" 
				style={{left: this.props.left }} 
			
			>
			</div> 
		)
	}
} 

/*onMouseOver={() => keyOver(this.props.keyname)}
				onMouseOut={() => keyOut()} */

class BlackKey extends Key {
	render() {
		return (
			<div className="key blackKey" 
				style={{left: this.props.left }}
			>
			</div>
		)
	}
} 

export default Piano;