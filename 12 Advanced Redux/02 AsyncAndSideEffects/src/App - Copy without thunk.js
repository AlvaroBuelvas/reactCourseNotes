import { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { uiActions } from "./store/ui-slice";
import { cartActions } from "./store/cart-slice";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.displayCart);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    
    const sendCartData = async () => {

      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Cart data is being sent...",
        })
      );

      const response = await fetch(
        "https://react-httpreq-demo-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send cart data");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Cart data was sent successfully!",
        })
      );
    };

    const getCartData = async() => {
      const response = await fetch('https://react-httpreq-demo-default-rtdb.firebaseio.com/cart.json')
      const data = await response.json()
      return data
    }

    if (isInitial) {
      isInitial = false;
      getCartData().then((newCart) => {
        dispatch(cartActions.createCart(newCart))
      })      
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
