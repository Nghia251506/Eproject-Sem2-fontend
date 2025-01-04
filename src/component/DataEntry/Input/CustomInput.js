import React from 'react';

const CustomInput = (props) => {
    const {type, i_id, onChg, onBlur,values, placeholder} = props;
    return (
        <div className="form-floating mb-3">
            <input
                type = {type}
                id = {i_id}
                placeholder = {placeholder}
                onBlur = {onBlur}
                value = {values}
                onChange={onChg}
            />
        </div>
    );
}

export default CustomInput;