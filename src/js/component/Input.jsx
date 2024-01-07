import React, { useState, useEffect } from "react";

function Input({ onValidate, validation, name, title, type = "text" }) {
  const [value, setValue] = useState("");

  function onChangeHandler(e) {
    setValue(e.target.value);
    if(name === "password") {
      onValidate(e.target.value);
    }
  }

  function onBlurHandler() {
    // Trigger validation when the input loses focus
    onValidate(value);
  }

  let validClass = "";
  let validElement = null;
  if (validation.isValid === true) {
    validClass = "is-valid";
  } else if (validation.isValid === false) {
    validClass = "is-invalid";
  }

  const inputClass = `form-control ${validClass}`;

  validElement = validation.isValid !== null && (
    <div className={validation.isValid ? "valid-feedback" : "invalid-feedback"}>
      {validation.messages}
    </div>
  );

  return (
    <div className="mb-3 row">
      <label className="col-sm-3 col-form-label" htmlFor={name}>
        {title}
      </label>
      <div className="col-sm-9">
        <input
          type={type}
          id={name}
          name={name}
          className={inputClass}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        {validElement}
      </div>
    </div>
  );
}

export default Input;
