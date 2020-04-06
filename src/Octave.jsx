import React from 'react';
import Key from './Key.jsx';

const Octave = (props) => {
	const whiteKeyWidth = 3;
	const blackKeyWidth = 2;
	let whiteKeys = filterBlackKeys(props.allKeys); 
	const keyElements = makeKeyElements(props.allKeys);

	function filterBlackKeys(keys) {
		return keys.filter(key => getKeyColor(key) === 'white');
	}

	function getKeyColor(key) {
		return (key.indexOf('b') == - 1 ) ? 'white' : 'black';
	}

	function getWhiteLeft(key) {
		return whiteKeys.indexOf(key.replace('b', '')) * whiteKeyWidth; 
	}

	function getLeft(key, keys) { 
		let offset = getWhiteLeft(key);
		
		if(getKeyColor(key) === 'black') {
			offset -= blackKeyWidth / 2;
		}
		
		return offset + 'em'; 
	}

	function makeKeyElements(keys) {
		return keys.map((key) => {
			return (
				<Key keyColor={getKeyColor(key)}
					left={getLeft(key, props.allKeys)}	
					keyName={key}
					key={key}
					{...props}
				/>
			)
		})
	}

	function getOctaveWidth() { 
		return (whiteKeys.length * whiteKeyWidth) + 'em';
	} 
 
	return ( 
		<div className="octave" style={{width: getOctaveWidth()}}>  
			{keyElements}
		</div>
	)
}

export default Octave;
