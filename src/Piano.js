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
			<div className="octave" onClick={this.click}>
				<div className="blackKeyContainer"> 
					<BlackKeyRight keyNumber={0}/>
					<BlackKeyBoth keyNumber={2}/>
					<BlackKeyLeft keyNumber={4}/>
					<BlackKeyRight keyNumber={5}/>
					<BlackKeyBoth keyNumber={7}/>
					<BlackKeyBoth keyNumber={9}/>
					<BlackKeyLeft keyNumber={11}/> 
				</div>
				<div className="whiteKeyContainer">
					<WhiteKey keyNumber={0}/>
					<WhiteKey keyNumber={2}/>
					<WhiteKey keyNumber={4}/>
					<WhiteKey keyNumber={5}/>
					<WhiteKey keyNumber={7}/>
					<WhiteKey keyNumber={9}/>
					<WhiteKey keyNumber={11}/>
				</div> 
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