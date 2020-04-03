import React from 'react';
import Key from './Key.jsx';

const Octave = (props) => {
	const whiteKeyWidth = 3;
	const blackKeyWidth = 2;
	let whiteKeys = filterBlackKeys(props.allKeys); 
	const keyElements = makeKeyElements(props.allKeys);

	function filterBlackKeys(keys) {
		return keys.filter(key => getKeyType(key) === 'white');
	}

	function getKeyType(key) {
		return (key.indexOf('b') == - 1 ) ? 'white' : 'black';
	}

	function getWhiteLeft(key) {
		return whiteKeys.indexOf(key.replace('b', '')) * whiteKeyWidth; 
	}

	function getLeft(key, keys) { 
		let offset = getWhiteLeft(key);
		
		if(getKeyType(key) === 'black') {
			offset -= blackKeyWidth / 2;
		}
		
		return offset + 'em'; 
	}

	function makeKeyElements(keys) {
		return keys.map((key) => {
			return (
				<Key keyType={getKeyType(key)}
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

/*const Octave = (props) => {
	const whiteKeyWidth = 3;
	const blackKeyWidth = 2;
	const whiteKeys = props.allKeys.filter((key) => { return key.indexOf('b') == -1});
	const keyArray = makeKeyArray(props.allKeys);
	const keyElements = makeKeyElements(keyArray);    

	function returnLeft(key) { 
		let whiteKey = key.replace('b', ''); 
		let offset = whiteKeys.indexOf(whiteKey) * whiteKeyWidth;

		if(key.indexOf('b') !== -1) {
			offset -= blackKeyWidth / 2;
		}
		
		return offset + 'em'; 
	}

	function makeKeyArray(keys) { 
		return keys.map((key) => { 
			return {
				id: key,
				key: key, 
				keyName: key,
				keyType: key.includes('b') ? 'blackKey' : 'whiteKey',
				left: returnLeft(key)				
			}
		})
	}

	function makeKeyElements(keys) {
		return keys.map((key) => { 
			return <Key keyType={key.keyType} 
				left={key.left} 
				keyName={key.keyName}
				key={key.id}
				{ ...props}
			/>
		});	
	}

	function getWidth() { 
		return (whiteKeys.length * whiteKeyWidth) + 'em';
	} 
 
	return ( 
		<div className="octave" style={{width: getWidth()}}>  
			{keyElements}
		</div>
	)
};*/