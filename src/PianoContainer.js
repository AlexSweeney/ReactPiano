import React, {Component} from 'react';
import './piano.css';

const keys = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];

class Piano extends Component {
	render() {
		return (
			<div className="piano">
				<Octave/> 
			</div>
		)
	}
}

class Octave extends Component { 
	render() {
		return (
			<div className="octave">
				<WhiteKey/>
				<WhiteKey/>
				<WhiteKey/>
				<WhiteKey/>
				<WhiteKey/>
				<WhiteKey/>
				<WhiteKey/>
				<WhiteKey/>
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
			<div className="key" onClick={() => this.keyClick()}></div> 
		)
	}
}

class BlackKeyLeft extends Key {
	render() {
		return (
			<div className="key left">
				<div className="blackKey" onClick={() => this.keyClick(-1)}></div>
				<div className="halfWhiteKey" onClick={() => this.keyClick()}></div>
			</div>
		)
	}
}

class BlackKeyBoth extends Key {
	render() {
		return (
			<div className="key ends">
				<div className="blackKey" onClick={() => this.keyClick(-1)}></div>
				<div className="thirdWhiteKey" onClick={() => this.keyClick()}></div>
				<div className="blackKey" onClick={() => this.keyClick(1)}></div>
			</div>
		)
	}
}

class BlackKeyRight extends Key {
	render() {
		return (
			<div className="key right">
				<div className="halfWhiteKey" onClick={() => this.keyClick()} keyadd={0}></div>
				<div className="blackKey" onClick={() => this.keyClick(1)}></div>
			</div>
		)
	}
}

export default Piano;