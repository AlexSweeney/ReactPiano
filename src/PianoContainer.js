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
	}

	changeMode = (newMode) => {
		console.log('changeMode()');  
		console.log('newMode', newMode);
		this.setState({mode: newMode});
		console.log(this.state.mode);
	}

	render() {
		return (
			<div className="pianoContainer">
				<div className="piano">
					<div className="topPiano">
						{/*<ModeSelect clickFunction={this.changeMode}/>*/}
						{/*<Display/>*/}
							{/*name="mode" 
									value={this.state.mode} */}
						{/* MODE SELECT */}
						<form>
							<input type="radio"  
									name="mode"
									value={this.state.mode}
									onClick={() => { this.changeMode("showKey") } 
							} defaultChecked/>
							<label htmlFor="showKey"  
									onClick={() => { this.changeMode("showKey") } 
							}>Show Key</label><br/> 

							<input type="radio"  
									name="mode"
									value={this.state.mode}
									onClick={() => { this.changeMode("selectKey") } 
							}/>
							<label htmlFor="selectKey"  
									onClick={() => { this.changeMode("selectKey") } 
							}>Select Key</label> 
						</form>
					</div>
					 
					{/*<Keys/>*/}
				</div>
			</div>
		)
	}
}

/*class ModeSelect extends Component { 
	render() {
		return (
			
		)
	}
}*/
/*
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
				onMouseOut={() => keyOut()}
			>
			</div> 
		)
	}
} 
{

class BlackKey extends Key {
	render() {
		return (
			<div className="key blackKey" 
				style={{left: this.props.left }}
				onMouseOver={() => keyOver(this.props.keyname)}
				onMouseOut={() => keyOut()} 
			>
			</div>
		)
	}
} */

export default Piano;