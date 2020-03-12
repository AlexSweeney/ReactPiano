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
				<WhiteKey/>{/*C*/}
					<BlackKey left={9+"%"}/>{/*C#*/}
				<WhiteKey left={12.5+"%"}/>{/*D*/}
					<BlackKey left={(12.5 + 9)+"%"}/>{/*D#*/}
				<WhiteKey left={(12.5 * 2)+"%"}/>{/*E*/}
				<WhiteKey left={(12.5 * 3)+"%"}/>{/*F*/}
					<BlackKey left={(12.5 * 3)+ 9 +"%"}/>{/*F#*/}
				<WhiteKey left={(12.5 * 4)+"%"}/>{/*G*/}
					<BlackKey left={(12.5 * 4)+ 9 +"%"}/>{/*G#*/}
				<WhiteKey left={(12.5 * 5)+"%"}/>{/*A*/}
					<BlackKey left={(12.5 * 5) + 9 +"%"}/>{/*A#*/}
				<WhiteKey left={(12.5 * 6)+"%"}/>{/*B*/}
				<BlankKey left={(12.5 * 7)+"%"}/>{/*C*/}
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