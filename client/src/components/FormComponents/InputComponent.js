import { useState, useEffect } from 'react'

import './InputComponent.scss'

export default function InputComponent({ handleBlur, handleChange, value, errors, touched, name, title, type, ShouldValidate }) {
  const [focus_bg, setFocus_bg] = useState(<span className="focus-bg"></span>)
  const [errorMsg, setErrorMsg] = useState("")



  useEffect(() => {
    if (ShouldValidate) {
      if (errors[name] && touched[name]) {
        setErrorMsg(<div className="error-message">{errors[name]}</div>)
      }
      else {
        setErrorMsg("")
      }

      setFocus_bg(<span className={`focus-bg ${(errors[name] && touched[name] ? 'error ' : '')}`}></span>)
    }
    return;
  }, [errors, touched, ShouldValidate, name])

  return (

    <div className="input-wrapper">
      <div className="input-effect-container">
        <input
          id={name}
          name={name}
          type={type}
          placeholder=" "
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          className="input-effect"
        />
        <label htmlFor={name}>{title}</label>
        <span className="focus-border"></span>
        {focus_bg}
      </div>
      {errorMsg}
    </div>
  )
}