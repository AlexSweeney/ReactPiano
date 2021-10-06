import React, {useState, useEffect} from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import './PlayButton.css';

export default function PlayButton({handleClick, playButtonDown}) { 
	const buttonDownClass = playButtonDown ? 'play-button-down' : '';

	return (
		<FaPlayCircle onClick={handleClick} className={`play-button ${buttonDownClass}`} id="play-button"/>
	)
}