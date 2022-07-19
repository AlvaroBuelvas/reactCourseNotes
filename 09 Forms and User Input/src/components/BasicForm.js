import useInput from "../hooks/use-input";

const BasicForm = (props) => {

  const {
    value: enteredFirstname,
    isValid: firstnameIsValid,
    hasError: firstnameInputHasError,
    valueChangeHandler: firstnameInputChangeHandler,
    inputBlurHandler: firstnameInputBlurHandler,
    reset: resetFirstnameInput
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredLastname,
    isValid: lastnameIsValid,
    hasError: lastnameInputHasError,
    valueChangeHandler: lastnameInputChangeHandler,
    inputBlurHandler: lastnameInputBlurHandler,
    reset: resetLastnameInput
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => value.trim().includes('@'))

  let formIsValid = false

  if (firstnameIsValid && lastnameIsValid && emailIsValid) {
    formIsValid = true
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()

    if (!firstnameIsValid || !lastnameIsValid || !emailIsValid) {
      return
    }
    console.log(enteredFirstname, enteredLastname, enteredEmail)
      resetFirstnameInput()
      resetLastnameInput()
      resetEmailInput()
  }

  const firstnameClasses = firstnameInputHasError ? 'form-control invalid' : 'form-control'

  const lastnameClasses = lastnameInputHasError ? 'form-control invalid' : 'form-control'

  const emailClasses = emailInputHasError ? 'form-control invalid' : 'form-control'


  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstnameClasses}>
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='name' 
            value={enteredFirstname}
            onChange={firstnameInputChangeHandler}
            onBlur={firstnameInputBlurHandler}
          />
          {firstnameInputHasError && <p className="error-text">Name cannot be blank!</p>}
        </div>
        <div className={lastnameClasses}>
          <label htmlFor='lastname'>Last Name</label>
          <input 
            type='text' 
            id='lastname'
            value={enteredLastname}
            onChange={lastnameInputChangeHandler}
            onBlur={lastnameInputBlurHandler}
          />
          {lastnameInputHasError && <p className="error-text">Lastname cannot be blank!</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input 
          type='text' 
          id='email'
          value= {enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && <p className="error-text">Email is invalid!</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
