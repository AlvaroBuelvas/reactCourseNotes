import { createStore } from 'redux'

const initialState = {counter: 0, display: true}

const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
            display: state.display
        }
    }
    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            display: state.display
        }
    }
    if (action.type === 'increase') {
        return {
            counter: state.counter + action.amount,
            display: state.display
        }
    }
    if (action.type === 'toggle') {
        return {
            counter: state.counter,
            display: !state.display
        }
    }
    return state
}

const store = createStore(counterReducer);

export default store;