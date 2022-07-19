import { createSlice } from '@reduxjs/toolkit'

const showCartSlice = createSlice({
    name: 'show-cart',
    initialState: {display: false},
    reducers: {
        toggleCart(state) {
            state.display = !state.display
        }
    }
})

export const cartShowActions = showCartSlice.actions

export default showCartSlice.reducer;

