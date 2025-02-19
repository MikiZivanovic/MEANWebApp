import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { CartItem, cartState } from "./cart.reducer";



export const selectCart = createFeatureSelector<cartState>("cart")

export const selectCartItems = createSelector(selectCart,(state)=>state.cart)

export const selectCartTotalPrice = createSelector(selectCart,(state)=>state.cart.reduce((pre,curr)=>pre+curr.price*curr.quantity,0))
export const selectCartTotalCount = createSelector(selectCart,(state)=>state.cart.length)

export const selectConfirmMessage = createSelector(selectCart,(state)=>state.message);

export const selectErrorMessage = createSelector(selectCart,(state)=>state.error);
