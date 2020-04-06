import React from 'react';
import Octave from './Octave.jsx';

const Keys = (props) => { 
	return(
		<div className="keys"> 
			<Octave octaveNumber={0} 
				{...props}/>	
		</div>
	)
};

export default Keys;