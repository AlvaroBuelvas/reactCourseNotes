import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const getCartData = () => {
    return async (dispatch) => {
        const getData = async() => {
            const response = await fetch('https://react-httpreq-demo-default-rtdb.firebaseio.com/cart.json')

            if (!response.ok) {
                throw new Error ('Could not fetch data')
            }

            const data = await response.json()
            return data
        }

        try {
            const data = await getData() || {items: [], quantity: 0}
            dispatch(cartActions.createCart({
                items: data.items || [],
                quantity: data.quantity
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Failed to get cart data'
            }))
        }

        
    }
}

export const sendCartData =  (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: "pending",
              title: "Sending...",
              message: "Cart data is being sent...",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                "https://react-httpreq-demo-default-rtdb.firebaseio.com/cart.json",
                {
                  method: "PUT",
                  body: JSON.stringify({
                    items: cart.items,
                    quantity: cart.quantity
                  }),
                }
            );
        
            if (!response.ok) {
            throw new Error("Failed to send cart data");
            }  
        }  

        try {
            await sendRequest()
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success",
                    message: "Cart data was sent successfully!",
                })
                );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error",
                  message: "Sending cart data failed!",
                })
              );
        }
    }
}