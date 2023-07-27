import React, { useState, useEffect, useReducer, useRef } from 'react';
import Card from "../UI/Card/Card";
import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
// import AuthContext from '../../context/auth-content';

// Reducer function defined outside of the component function;
// This is possible because the reducer function does not need 
// any data generated inside of the component function.


const emailReducer = (state, action) => {
  if (action.type==='USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type==='INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@')};
  }
  return { value: '', isValid: false};
}

const passwordReducer = (state, action) => {
  if (action.type==='USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type==='INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6};
  }
  return { value: '', isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });

  

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // Object decconstruction; we use an alias assignment, since we're only interested in 
  // cases where the isValid property changes. Without it, the useEffect just runs too often, with 
  // every key stroke on the form.

  const { isValid: emailIsValid } = emailState; 
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // useEffect only runs after a state change; hence it is safe to use here.
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {

    dispatchEmail({type: 'USER_INPUT', val: event.target.value });
    // setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value })
    //setEnteredPassword(event.target.value);
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailState.value, passwordState.value);
    } else if (!passwordIsValid){
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          label="E-Mail"
          onChange={emailChangeHandler}
          isValid={emailIsValid} 
          onBlur={validateEmailHandler} 
          value={emailState.value}
          />
       <Input
          ref={passwordInputRef}
          id="password"
          type="password"
          label="Password"
          onChange={passwordChangeHandler}
          isValid={passwordIsValid} 
          onBlur={validatePasswordHandler}
          value={passwordState.value}
          />

          <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>

      </form>
    </Card>
        
  );
};

export default Login;
