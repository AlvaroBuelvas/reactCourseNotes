import { useSelector, useDispatch } from 'react-redux'

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const { counter, display } = useSelector(state => state);

  const incrementHandler = () => {
    dispatch({type: 'increment'})
  }

  const decrementHandler = () => {
    dispatch({type: 'decrement'})
  }

  const increaseHandler = () => {
    dispatch({type: 'increase', amount: 10})
  }

  const toggleCounterHandler = () => {
    dispatch({type: 'toggle'})
  };

  // const counterClasses = display ? classes.value : `${classes.value} ${classes.hide}`

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      { display && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
