import React, { useState } from 'react';

function Input({ onValidate, name, title, type = "text" }) {
  const [value, setValue] = useState("");
  const [validate, setValidate] = useState({ isValidate: true, messages: "" });

  function onChangeHandler(e) {
    setValidate({ isValidate: true, messages: "" });
    setValue(e.target.value);
  }

  function onBlurHandler(e) {
    setValidate(onValidate(e));
  }

  return (
    <div className={validate.isValidate ? "form-group" : "form-group"}>
      {!validate.isValidate && <div className="invalid-feedback">{validate.messages}</div>}
      <label htmlFor={name}>{title}</label>
      <input
        type={type}
        id={name}
        name={name}
        className={validate.isValidate ? "form-control is-valid" : "form-control is-invalid"}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
}

export default Input;
