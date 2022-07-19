import { useSelector, useDispatch } from 'react-redux'

import { uiActions } from '../../store/ui-slice';

import classes from './CartButton.module.css';

const CartButton = (props) => {

  const itemsCount = useSelector(state => state.cart.quantity)  
  
  const dispatch = useDispatch();

  const onShowCartHandler = ()   => {
    dispatch(uiActions.toggleCart())
  }

  return (
    <button className={classes.button} onClick={onShowCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsCount}</span>
    </button >
  );
};

export default CartButton;
