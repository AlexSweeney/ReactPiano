
/*const Key = ({mode, keyName, keyType, keyMap, left, targetKey, newTargetKey}) => {
	function keyOver(key) {   
		if(mode === 'showKey') { 
			ShowKey.keyOver(key);
		}
	}

	function keyOut(key) {
		if(mode === 'showKey') {
			ShowKey.keyOut(key);
		}
	}

	function keyDown(key) {
		if(mode === 'showKey') {
			ShowKey.keyDown(key);
		} else if(mode === 'selectKey') {    
			SelectKey.keyDown(key, targetKey, newTargetKey);
		} else if(mode === 'selectByEar') {
			SelectByEar.keyDown(key, targetKey);
		}
	}

	function keyUp(key) {
		if(mode === 'showKey') {
			ShowKey.keyUp(key);
		}
	} 

	function handleKeyDown(e) { 
		if(keyName === keyMap[e.key]) {
			keyDown(keyName);
		}
	}

	React.useEffect(() => { 
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}
	})

	return (  
		<div className={"key " + keyType}
			style={{left}} 
			onMouseOver={() => keyOver(keyName)}
			onMouseOut={() => keyOut()} 
			onMouseDown={() => keyDown(keyName)}
			onMouseUp={() => keyUp(keyName)}
			id={keyName}
		>
		</div> 
	)
}*/