import React from 'react';

export default function RadioSelector({value, defaultValue, handleClick}) {
	const id = `${value}_Radio`;
	const isDefault = value === defaultValue;

	function onClick() {
		handleClick(value)
	} 

	return (
		<div className="radio-selector" key={value}>
			<input type="radio" 
					name="mode"
					value={value} 
					id={id} 
					onClick={onClick}
					defaultChecked={isDefault}
			/>
			<label for={id} onClick={onClick}>{value.replaceAll('-', ' ')}</label>
			<br/> 
		</div> 
	)
}