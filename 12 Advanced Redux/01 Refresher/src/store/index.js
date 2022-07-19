import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cart'
import showCartReducer from './show-cart';


const store = configureStore({
    reducer: {
        cart: cartReducer,
        showCart: showCartReducer
    }
});

export default store;