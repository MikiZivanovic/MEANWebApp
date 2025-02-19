import { Action, createReducer, on } from "@ngrx/store"

import * as CartActions from "./cart.actions"
import { state } from "@angular/animations"

export interface CartItem{
    id:string,
    name:string,
    quantity:number,
    price:number,
    wine:string
}
export interface cartState{
    cart:CartItem[],
    error:string | undefined,
    message:string | undefined,
    loading:boolean
    
    
}
const initialState :cartState ={
    cart : [],
    error : undefined,
    message:undefined,
    loading:false
}

export const cartReducer = createReducer(
    initialState,
    on(CartActions.addItem, (state,{payload})=>{
        let el = state.cart.find(el=>el.id===payload.id)
        console.log(payload.id)
        if(el===undefined){
           
           return {
            ...state,
            cart:[...state.cart,payload.newItem]
           }
        }else{
            const updatedEl : CartItem = {...el,quantity:el.quantity+1};
            
            return{
                ...state,
                cart:[...state.cart.filter(el=>el.id!==payload.id),updatedEl]
             }
        }
        
        
    }),
    on(CartActions.deleteItem,(state,{payload})=>{
        let el = state.cart.find(el=>el.id===payload.id)!
        if(el?.quantity===1){
            return{
                ...state,
                cart:state.cart.filter(el=>el.id !==payload.id)
            }
        }else{
            const updatedEl : CartItem = {...el,quantity:el?.quantity-1}
            return{
                ...state,
                cart:[...state.cart.filter(el=>el.id !==payload.id),updatedEl]
            }
        }
    }),
    on(CartActions.removeSelectedItem,(state,payload)=>{
        return{
            ...state,
            cart:state.cart.filter(item=>payload.id!==item.id)
        }
    }),
    on(CartActions.createOrder,(state,{payload})=>{
        return{
            ...state,
            loading:true,
        }
    }),
    on(CartActions.createOrderValid,(state)=>{
        return {
            ...state,
            loading:false,
            message:"Porudzbina je uspesno kreirana",
            error:undefined
        }
    }),
    on(CartActions.createOrderInvalid,(state,{payload})=>{
        console.log("Reducer ažurira error stanje:", payload.error);
        return {
            ...state,
            loading: false,
            error: payload.error,
            message: undefined
        };
    }),
    on(CartActions.cancelErrorState,(state)=>{
        return{
            ...state,
            error : undefined
        }
    }),
    on(CartActions.cancelMessageState,(state)=>{
        return{
            ...state,
            message:undefined
        }
    }),
    on(CartActions.deleteAll,(state)=>{
        return{
            ...state,
            cart:[]
        }
    })


)