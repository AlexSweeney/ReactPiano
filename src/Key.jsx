import React from 'react';

import ShowKey from './modes/ShowKey.jsx';
import SelectKey from './modes/SelectKey.jsx';
import SelectByEar from './modes/SelectByEar.jsx';

const Key = ({keyColor, left, keyName, mode, targetKey, setNewTargetKey}) => { 
	const keyMap = {'a': 'C3', 
					'w': 'Db3', 
					's': 'D3',
					'e': 'Eb3', 
					'd': 'E3',
					'f': 'F3',
					't': 'Gb3',
					'g': 'G3',
					'y': 'Ab3',
					'h': 'A3',
					'u': 'Bb3',
					'j': 'B3'
					};

	function keyOver(key) {   
		if(mode === 'Show Key') { 
			ShowKey.keyOver(key);
		}
	}

	function keyOut(key) {
		if(mode === 'Show Key') {
			ShowKey.keyOut(key);
		}
	}

	function keyDown(key) {
		if(mode === 'Show Key') {
			ShowKey.keyDown(key);
		} else if(mode === 'Select Key') {    
			SelectKey.keyDown(key, targetKey, setNewTargetKey);
		} else if(mode === 'Select Key by Ear') {
			SelectByEar.keyDown(key, targetKey, setNewTargetKey);
		}
	}

	function keyUp(key) {
		if(mode === 'Show Key') {
			ShowKey.keyUp(key);
		}
	} 

	// Keyboard Listener
	function handleKeyBoardDown(e) { 
		if(keyName === keyMap[e.key]) {
			keyDown(keyName);
		}
	}
	
	React.useEffect(() => { 
		document.addEventListener('keydown', handleKeyBoardDown);

		return () => {
			document.removeEventListener('keydown', handleKeyBoardDown);
		}
	})

	return (  
		<div className={"key " + keyColor+"Key"}
			style={{left}} 
			onMouseOver={() => keyOver(keyName)}
			onMouseOut={() => keyOut()} 
			onMouseDown={() => keyDown(keyName)}
			onMouseUp={() => keyUp(keyName)}
			id={keyName}
		>
		</div> 
	)
}

export default Key;
