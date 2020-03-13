import React, {Component} from 'react';
import './piano.css';

const keys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];

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
				<input type="radio" name="mode" value="showKey"/>
				<label htmlFor="showKey">Show Key</label>
			</form>
		)
	}
}

class Display extends Component {
	render() {
		return (
			<div className="pianoDisplay"></div>
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
	returnLeft(i, key) {
		if(key === 'white') {
			return (12.5 * i) + '%';
		} else if (key === 'black') {
			return (12.5 * i) + 9 + '%';
		}
	}
	
	render() {
		return (
			<div className="octave">
				{/*C*/}
				<WhiteKey keyname={"c"+this.props.octavenumber}/>
				{/*C#*/}
					<BlackKey keyname={"c#"+this.props.octavenumber} 
							left={this.returnLeft(0,'black')}/>
				{/*D*/}
				<WhiteKey keyname={"d"+this.props.octavenumber} 
						left={this.returnLeft(1,'white')}/>
				{/*D#*/}
					<BlackKey keyname={"d#"+this.props.octavenumber} 
						left={this.returnLeft(1,'black')}/>
				{/*E*/}
				<WhiteKey keyname={"e"+this.props.octavenumber} 
						left={this.returnLeft(2,'white')}/>
				{/*F*/}
				<WhiteKey keyname={"f"+this.props.octavenumber} 
						left={this.returnLeft(3,'white')}/>
				{/*F#*/}
					<BlackKey keyname={"f#"+this.props.octavenumber} 
						left={this.returnLeft(3,'black')}/>
				{/*G*/}
				<WhiteKey keyname={"g"+this.props.octavenumber} 
						left={this.returnLeft(4,'white')}/>
				{/*G#*/}
					<BlackKey keyname={"g#"+this.props.octavenumber} 
						left={this.returnLeft(4,'black')}/>
				{/*A*/}
				<WhiteKey keyname={"a"+this.props.octavenumber} 
						left={this.returnLeft(5,'white')}/>
				{/*A#*/}
					<BlackKey keyname={"a#"+this.props.octavenumber} 
						left={this.returnLeft(5,'black')}/>
				{/*B*/}
				<WhiteKey keyname={"b"+this.props.octavenumber} 
						left={this.returnLeft(6,'white')}/>
				{/*Blank*/}
				<BlankKey left={this.returnLeft(7,'white')}/>
			</div>
		)
	}
}

class Key extends Component {
	constructor(props) {
		super(props);
		this.keyClick = this.keyClick.bind(this);  
		this.keyOver = this.keyOver.bind(this);
	}

	keyOver(key) {
		console.log('over key', key);
	}

	keyClick(sum = 0) {    
		let i = this.props.keyNumber + sum;  
		console.log('click key:', keys[i]);
	}
}

class WhiteKey extends Key {	
	render() {
		return (
			<div className="whiteKey" 
				style={{left: this.props.left }} 
				onMouseOver={() => this.keyOver(this.props.keyname)}
				onClick={() => this.keyClick()}>
			</div> 
		)
	}
} 

class BlackKey extends Key {
	render() {
		return (
			<div className="blackKey" 
				onMouseOver={() => this.keyOver(this.props.keyname)}
				style={{left: this.props.left }}>
			</div>
		)
	}
}

class BlankKey extends Key {
	render() {
		return (
			<div className="blankKey" 
				style={{left: this.props.left}}>
			</div>
		)
	}
}

export default Piano;