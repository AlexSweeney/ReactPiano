import React from 'react';

export default function RadioSelector({value, defaultValue, handleClick}) {
	/*
		* on render
			* if value === default value => selected
		
		* on click
			* trigger handleClick(value)
	*/ 
	/* ============================= Constants =========================== */
	const radioId = `${value}-radio`;
	const labelId = `${value}-label`;
	
	const isDefault = value === defaultValue;
	const labelValue = value.replace(/-/g, ' ')

	/* ============================= Event Hanlders ====================== */
	function onClick() {
		handleClick(value)
		// console.log('clicked radio', radioId)
	} 

	/* ============================= Output ============================== */
	return (
		<div className="radio-selector" key={radioId}>
			<input type="radio" 
				name="mode"
				value={value} 
				id={radioId} 
				onClick={onClick}
				defaultChecked={isDefault}
			/>
			<label id={labelId} htmlFor={radioId} onClick={onClick}>{labelValue}</label> 
			<br/> 
		</div> 
	)
}