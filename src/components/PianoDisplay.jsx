import React from 'react';
import VolumeControl from './VolumeControl.jsx';
import PlayButton from './parts/PlayButton.jsx';
import './PianoDisplay.css';

export default function PianoDisplay({
	displayString, 
	showPlayButton, 
	handlePlayButtonClick,
	playButtonDown,
	audioIDs,
	volume,
	setVolume,
}) {
	const output = showPlayButton ? <PlayButton handleClick={handlePlayButtonClick} playButtonDown={playButtonDown}/> : displayString;

	return (
		<div className="piano-display-container">
			<div className="piano-display">
				{
					output
				}
			</div>
			<VolumeControl
				audioIDs={audioIDs}
				volume={volume}
				setVolume={setVolume}
			/> 
		</div>
	) 
}	