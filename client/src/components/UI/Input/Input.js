import React from 'react';
import classnames from 'classnames'

const Input = ({ input, label, value, type, onChange, name,register, error}) => {
	return (
		<div>
			<label className='white-text'>{label}</label>
			<input
				{...input}
				id={label}
				value={value}
				onChange={onChange}
				name={name}
				type={type}
				ref={register}
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
