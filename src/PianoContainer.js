import React, {Component} from 'react';
import './piano.css';

const keys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];

class Piano extends Component {
	render() {
		return (
			<div className="piano">
				<Display/>
				<Keys/> 
			</div>
		)
	}
}

class Display extends Component {
	render() {
		return (
			<div className="pianoDisplayContainer">
				<div className="pianoDisplay"></div>
			</div>
		)
	}
}

class Keys extends Component {
	render() {
		return (
			<div className="keys">
				<Octave/>
			</div>
		)
	}
}

class Octave extends Component { 
	returnLeft(i, key) {
		if(key == 'white') {
			return (12.5 * i) + '%';
		} else if (key == 'black') {
			return (12.5 * i) + 9 + '%';
		}
	}

	render() {
		return (
			<div className="octave">
				<WhiteKey/>{/*C*/}
					<BlackKey left={this.returnLeft(0,'black')}/>{/*C#*/}
				<WhiteKey left={this.returnLeft(1,'white')}/>{/*D*/}
					<BlackKey left={this.returnLeft(1,'black')}/>{/*D#*/}
				<WhiteKey left={this.returnLeft(2,'white')}/>{/*E*/}
				<WhiteKey left={this.returnLeft(3,'white')}/>{/*F*/}
					<BlackKey left={this.returnLeft(3,'black')}/>{/*F#*/}
				<WhiteKey left={this.returnLeft(4,'white')}/>{/*G*/}
					<BlackKey left={this.returnLeft(4,'black')}/>{/*G#*/}
				<WhiteKey left={this.returnLeft(5,'white')}/>{/*A*/}
					<BlackKey left={this.returnLeft(5,'black')}/>{/*A#*/}
				<WhiteKey left={this.returnLeft(6,'white')}/>{/*B*/}
				<BlankKey left={this.returnLeft(7,'white')}/>{/*Blank*/}
			</div>
		)
	}
}

class Key extends Component {
	constructor(props) {
		super(props);
		this.keyClick = this.keyClick.bind(this);  
	}

	keyClick(sum = 0) {    
		let i = this.props.keyNumber + sum;  
		console.log('click key:', keys[i]);
	}
}

class WhiteKey extends Key {	
	render() {
		return (
			<div className="whiteKey" style={{left: this.props.left }} onClick={() => this.keyClick()}></div> 
		)
	}
} 

class BlackKey extends Key {
	render() {
		return (
			<div className="blackKey" style={{left: this.props.left }}></div>
		)
	}
}

class BlankKey extends Key {
	render() {
		return (
			<div className="blankKey" style={{left: this.props.left}}></div>
		)
	}
}
export default Piano;