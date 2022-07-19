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

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched

    
    const valueChangeHandler = (event) => {
        dispatch({ type: 'CHANGE', value: event.target.value })
    }

    const inputBlurHandler = (event) => {
        dispatch({ type: 'BLUR' })
    }

    const reset = () => {
        dispatch({ type: 'RESET' })
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