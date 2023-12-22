import React, { useState } from 'react';

function Input({ onValidate, name, title, type = "text" }) {
  const [value, setValue] = useState("");
  const [validation, setValidation] = useState({ isValid: null, messages: "" });

  function onChangeHandler(e) {
    setValidation({ isValid: true, messages: "" });
    setValue(e.target.value);
  }

  function onBlurHandler(e) {
    setValidation(onValidate(e.target.value));
  }

  const inputClass = `form-control ${validation.isValid ? 'is-valid' : 'is-invalid'}`;

  return (
    <div className="mb-3 row">
      <label className="col-sm-3 col-form-label" htmlFor={name}>{title}</label>
      <div className="col-sm-9">
        {!validation.isValid && <div className="invalid-feedback">{validation.messages}</div>}
        <input
          type={type}
          id={name}
          name={name}
          className={inputClass}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
      </div>
    </div>
  );
}

export default Input;
