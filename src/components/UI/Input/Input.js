import React, { useRef, useImperativeHandle } from "react";
import classes from './Input.module.css';


const Input = React.forwardRef((props, ref) => {
  // we can provide the second paramter ref if a ref is defined somewhere outside, where this component is used.
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    }
  })

    return (
  
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            isValid={props.isValid}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
          >
            </input>
        </div>
    )
});

export default Input;