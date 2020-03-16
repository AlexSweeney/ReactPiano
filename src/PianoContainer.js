import React, {Component} from 'react';
import './piano.css'; 
import { Keys, Octave, Key, WhiteKey, BlackKey } from './Keys.js';

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
				<label htmlFor="showKey">Show Key</label>
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

export default Piano;