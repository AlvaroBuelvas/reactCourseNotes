import { useReducer } from "react";

const initialState = {
    value: '',
    isTouched: false
}

const inputDispatchReducer = (state, action) => {
    if (action.type === 'CHANGE') {
        return { value: action.value, isTouched: state.isTouched}
    }
    if (action.type === 'BLUR') {
        return { value: state.value, isTouched: true}
    }
    if (action.type === 'RESET') {
        return { value: '', isTouched: false}
    }
    return initialState
}

const useInput = (validateValue) => {

    const [ inputState, dispatch] = useReducer(inputDispatchReducer, initialState)

    // const [enteredValue, setEnteredValue] = useState('')
    // const [isTouched, setIsTouched] = useState(false)

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched

    
    const valueChangeHandler = (event) => {
        // setEnteredValue(event.target.value)
        dispatch({ type: 'CHANGE', value: event.target.value })
    }

    const inputBlurHandler = (event) => {
        // setIsTouched(true)
        dispatch({ type: 'BLUR' })
    }

    const reset = () => {
        dispatch({ type: 'RESET' })
        // setEnteredValue('')
        // setIsTouched(false)
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }

};

export default useInput;