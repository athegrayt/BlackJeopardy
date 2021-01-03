import React from 'react';
import classnames from 'classnames'

const Input = ({ input, label, value, type, onChange, error}) => {
	return (
		<div>
			<label className='white-text'>{label}</label>
			<input
				{...input}
				value={value}
				onChange={onChange}
				type={type}
				className={classnames('white-text', {
					invalid: error
				})}
				style={{ 
					borderBottomColor: 'white', 
			 }}
			/>
			<span className='red-text'>{error}</span>	
		</div>
	);
};
export default Input;
