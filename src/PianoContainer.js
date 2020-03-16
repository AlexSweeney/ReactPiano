import React, {Component} from 'react';
import './piano.css';  
import PianoJS from './Piano.js';
/*import ShowKey from './ShowKey.js'; 
import SelectKey from './SelectKey.js';  
*/
let {keys, mode, keyOver} = PianoJS; 
console.log('keys', keys);

class Piano extends Component { 
	render() {
		return (
			<div className="pianoContainer">
				<div className="piano">
					<div className="topPiano">
						<ModeSelect/>
						<Display/>
					</div>
					 
					<Keys/>
				</div>
			</div>
		)
	}
}

class ModeSelect extends Component { 
	render() {
		return (
			<form>
				<input type="radio" name="mode" value="showKey" checked/>
				<label htmlFor="showKey">Show Key</label><br/> 

				<input type="radio" name="mode" value="selectKey"/>
				<label htmlFor="selectKey">Select Key</label> 
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
	render() {
		return (
			<div className="keys">
				<Octave octavenumber={0}/>
			</div>
		)
	}
}

class Octave extends Component { 
	constructor(props) {
		super(props);
		this.returnLeft = this.returnLeft.bind(this);
		this.getWidth = this.getWidth.bind(this);
		this.makeKeys = this.makeKeys.bind(this);
		this.keys = this.makeKeys(keys);   
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
		let whiteKeys = keys.filter((key) => { return key.indexOf('#') == -1});
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

class WhiteKey extends Key {	
	render() {
		return (
			<div className="key whiteKey" 
				style={{left: this.props.left }} 
				onMouseOver={() => keyOver(this.props.keyname)}
				
			>
			</div> 
		)
	}
} 
{/*onMouseOut={() => this.keyOut()}
				onClick={() => this.keyClick()} */}

class BlackKey extends Key {
	render() {
		return (
			<div className="key blackKey" 
				style={{left: this.props.left }}
				onMouseOver={() => keyOver(this.props.keyname)}
				
			>
			</div>
		)
	}
} 
{/*onMouseOut={() => this.keyOut()} 
				onClick={() => this.keyClick()} */}

export default Piano;