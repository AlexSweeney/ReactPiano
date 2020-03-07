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
					<BlackKeyRight keyNumber={0}/>
					<BlackKeyBoth keyNumber={2}/>
					<BlackKeyLeft keyNumber={3}/>
					<BlackKeyRight keyNumber={4}/>
					<BlackKeyBoth keyNumber={6}/>
					<BlackKeyBoth keyNumber={8}/>
					<BlackKeyLeft keyNumber={10}/> 
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
	}

	keyClick(sum = 0) {   
		console.log(this.props);
		let i = this.props.keyNumber + sum;
		/*keyColor == 'white' ? i = this.props.keyNumber : i = this.props.keyNumber + 1;*/
		console.log(i);
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
		/*	<div className="key left" onClick={this.keyClick}></div>
			<div className="blackKey" onClick={this.blackKeyClick}></div>*/
			<div className="key left">
				<div className="blackKey"></div>
				<div className="halfWhiteKey"></div>
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
				<div className="halfWhiteKey" onClick={() => this.keyClick()} keyadd={0}></div>
				<div className="blackKey" onClick={() => this.keyClick(1)}></div>
			</div>
		)
	}
}

export default Piano;