import React from 'react';
import Util from './Util.jsx';

function VolumeControl({audio, volume, changeVolume}) { 
	function volumeChange(newVolume) {   
		changeVolume(newVolume); 
	}  

	React.useEffect(() => { 
		let audioElements = Util.getElementsFromStorage('audioElements', Object.keys(audio), '_audio');
		Util.setVolume(audioElements, volume / 100); 
	}, [volume]);

	return( 
		<div className="volumeContainer">
			<div className="slidecontainer">
			  <input type="range" min="0" max="100" id="volumeSlider" value={volume} onChange={(e) => {volumeChange(e.target.value)}}/>
			</div>
			<p>Volume: {volume}</p> 
		</div>
	)
}

/*class VolumeControl extends React.Component {
	constructor(props) {
		super(props);
		this.volumeChange = this.volumeChange.bind(this);
	}
	
	volumeChange(newVolume) {  
		this.props.changeVolume(newVolume);
		Util.setVolume(this.props.audioElements, newVolume / 100);
	}  

	componentDidMount() { 
		this.volumeChange(this.props.volume);
	}

	render() {
		return( 
			<div className="volumeContainer">
				<div className="slidecontainer">
				  <input type="range" min="0" max="100" id="volumeSlider" value={this.props.volume} onChange={(e) => {this.volumeChange(e.target.value)}}/>
				</div>
				<p>Volume: {this.props.volume}</p> 
			</div>
		)
	}
}*/

export default VolumeControl;