import React from 'react';
import VolumeControl from './VolumeControl.jsx';
import PlayButton from './parts/PlayButton.jsx';
import './PianoDisplay.css';

export default function PianoDisplay({
	displayString, 
	showPlayButton, 
	handlePlayButtonClick,
	playButtonDown, 
}) {
	/*
		* on render
			* if showPlayButton 
				* show PlayButton
			* if !showPlayButton
				* show displayString

		* on click
			* if click playbutton => handlePlayButtonClick
	*/
	const id = 'piano-display';
	let output;

	if(showPlayButton) {
		output =  <PlayButton handleClick={handlePlayButtonClick} playButtonDown={playButtonDown}/>
	}

	if(!showPlayButton) {
		output = displayString;
	}

	return (
		<div className="piano-display-container" id={id}>
			<div className="piano-display">
				{
					output
				}
			</div> 
		</div>
	) 
}	