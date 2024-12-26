import React from 'react';

const CustomInput = (props) => {
    const {type, label, i_id, i_class, onChg, onBlur, values, placeholder} = props;
    return (
        <div className="form-floating mb-3">
            <input
                type = {type}
                class = {i_class}
                id = {i_id}
                placeholder = {placeholder}
            />
        </div>
    );
}

export default CustomInput;