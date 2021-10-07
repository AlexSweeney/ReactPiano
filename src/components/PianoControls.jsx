import React from 'react';
import ModeSelect from './ModeSelect.jsx';
import PianoDisplay from './PianoDisplay.jsx';

import './PianoControls.css';

export default function PianoControls({
	mode, 
	setMode, 
	displayString, 
	volume, 
	setVolume, 
	audioIDs, 
	showPlayButton, 
	handlePlayButtonClick,
	playButtonDown}) {

	return( 
		<div className="piano-controls"> 
			<ModeSelect
				mode={mode}
				setMode={setMode} 
			/>
			<PianoDisplay 
				displayString={displayString} 
				showPlayButton={showPlayButton} 
				handlePlayButtonClick={handlePlayButtonClick}
				playButtonDown={playButtonDown}
				audioIDs={audioIDs}
				volume={volume}
				setVolume={setVolume} 
			/>	 
		</div> 
	)
}