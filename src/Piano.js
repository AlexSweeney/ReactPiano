import React, {Component} from 'react';
import './piano.css';

const keys = ['c','c#','d','e','f','f#','g','g#','a','a#','b'];

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
					<BlackKeyRight keyNumber={0} blackKeyName="c#3"/>
					<BlackKeyBoth keyNumber={2} blackKeyName="c#3"/>
					<BlackKeyLeft keyNumber={3} blackKeyName="c#3"/>
					<BlackKeyRight keyNumber={4} blackKeyName="c#3"/>
					<BlackKeyBoth keyNumber={6} blackKeyName="c#3"/>
					<BlackKeyBoth keyNumber={8} blackKeyName="c#3"/>
					<BlackKeyLeft keyNumber={10} blackKeyName="c#3"/> 
				</div>
				<div className="whiteKeyContainer">
					<WhiteKey keyNumber={0}/>
					<WhiteKey keyNumber={2}/>
					<WhiteKey keyNumber={3}/>
					<WhiteKey keyNumber={4}/>
					<WhiteKey keyNumber={6}/>
					<WhiteKey keyNumber={8}/>
					<WhiteKey keyNumber={10}/>
				</div> 
			</div>
		)
	}
}

class Key extends Component {
	constructor(props) {
		super(props);
		this.keyClick = this.keyClick.bind(this); 
		// this.blackKeyClick = this.blackKeyClick.bind(this);
	}

	keyClick(keyColor) {   
		let i;
		keyColor == 'white' ? i = this.props.keyNumber : i = this.props.keyNumber + 1;
		console.log(i);
		console.log('click key:', keys[i]);
	}
}

class WhiteKey extends Key {	
	render() {
		return (
			<div className="key" onClick={() => this.keyClick('white')}></div> 
		)
	}
}

class BlackKeyLeft extends Key {
	render() {
		return (
			<div className="key left" onClick={this.keyClick}>
				<div className="blackKey" onClick={this.blackKeyClick}></div>
			</div>
		)
	}
}

class BlackKeyBoth extends Key {
	render() {
		return (
			<div className="key ends">
				<div className="blackKey"></div>
				<div className="blackKey"></div>
			</div>
		)
	}
}

class BlackKeyRight extends Key {
	render() {
		return (
			<div className="key right">
				<div className="leftWhiteKey" onClick={() => this.keyClick('white')} keycolor="white"></div>
				<div className="blackKey" onClick={() => this.keyClick('black')} keycolor="black"></div>
			</div>
		)
	}
}

export default Piano;