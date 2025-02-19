
import { createAction, props } from "@ngrx/store";
import { CartItem } from "./cart.reducer";

export const ADD_ITEM = 'ADD_ITEM'


export const addItem = createAction(
    '[Cart] AddItem',
    props<{payload : {id:string,newItem:CartItem}}>()
)

export const deleteItem = createAction(
    "[Cart] DeleteItem",
    props<{payload:{id:string}}>()
)
export const deleteAll = createAction(
    "[Cart] DeleteItems",
   
)
export const createOrder = createAction(
    "[Cart] CreateOrder",
    props<{payload:{totalprice:number,items:CartItem[]}}>()
)
export const createOrderValid = createAction(
    "[Cart] CreateOrderValid",  
)
export const createOrderInvalid = createAction(
    "[Cart] CreateOrderInvalid",
    props<{payload:{error:string}}>()
)
export const removeSelectedItem = createAction(
    "[Cart] removeSelectedItem",
    props<{id:string}>()
)
export const cancelErrorState = createAction(
    "[Cart] cancelErrorState"
)
export const cancelMessageState = createAction(
    "[Cart] cancelMessageState"
)