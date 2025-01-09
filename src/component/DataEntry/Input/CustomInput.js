import React from 'react';

const CustomInput = (props) => {
    const {type, onChg, onBlur,value, placeholder,name, readOnly, className} = props;
    return (
        <div className="form-floating mb-3">
            <input
                type = {type}
                name ={name}
                placeholder = {placeholder}
                onBlur = {onBlur}
                value = {value}
                onChange={onChg}
                className = {className}
                readOnly = {readOnly}
            />
        </div>
    );
}

export default CustomInput;