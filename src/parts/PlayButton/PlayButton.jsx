import React, {useState, useEffect} from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import './PlayButton.scss';

export default function PlayButton({handleClick, playButtonDown}) { 
	/*
	 	* on render
	 		* show icon

	 	* on click 
	 		* trigger handle click
	*/
	const id = 'play-button';
	const buttonDownClass = playButtonDown ? 'play-button-down' : '';

	return (
		<FaPlayCircle onClick={handleClick} className={`play-button ${buttonDownClass}`} id={id}/>
	)
}