import { useState } from "react";

import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const Checkout = (props) => {

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  })

  const {
    value: enteredName,
    isValid: nameIsValid,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    valueChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostal,
    isValid: postalIsValid,
    valueChangeHandler: postalInputChangeHandler,
    inputBlurHandler: postalInputBlurHandler,
    reset: resetPostalInput,
  } = useInput((value) => value.trim().length === 6 );

  const {
    value: enteredCity,
    isValid: cityIsValid,
    valueChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  const confirmHandler = (event) => {
    event.preventDefault();

    
    setFormInputsValidity({
        name: nameIsValid,
        street: streetIsValid,
        postal: postalIsValid,
        city: cityIsValid
    })

    const formIsValid = 
        nameIsValid &&
        streetIsValid &&
        postalIsValid &&
        cityIsValid

    if (!formIsValid) {
        return
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
      })

      resetNameInput()
      resetStreetInput()
      resetPostalInput()
      resetCityInput()


  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name? '' : classes.invalid}`}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {!formInputsValidity.name && <p className={classes['error-text']}>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {!formInputsValidity.street && <p className={classes['error-text']}>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postal? '' : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalInputChangeHandler}
          onBlur={postalInputBlurHandler}
        />
        {!formInputsValidity.postal && <p className={classes['error-text']}>Please enter a valid postal code (5 Characters minimum)</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {!formInputsValidity.city && <p className={classes['error-text']}>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
