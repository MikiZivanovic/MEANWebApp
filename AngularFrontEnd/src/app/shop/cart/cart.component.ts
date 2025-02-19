import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotalCount, selectCartTotalPrice } from '../../store/cart.selectors';
import { Observable, Subscription } from 'rxjs';
import { CartItem } from '../../store/cart.reducer';
import { CartItemComponent } from './cart-item/cart-item.component';
import { NgFor, NgIf } from '@angular/common';
import { createOrder, deleteAll } from '../../store/cart.actions';
import {toSignal} from "@angular/core/rxjs-interop"

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent,NgFor,NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  store = inject(Store)

  items = toSignal(this.store.select(selectCartItems),{initialValue:[]})
  totalprice  = toSignal(this.store.select(selectCartTotalPrice),{initialValue:0});
  totalcount =  toSignal(this.store.select(selectCartTotalCount),{initialValue:0});
  
  createOrder(){

    const newOrder = {totalprice:this.totalprice(),items:this.items()}
    console.log(newOrder)
    this.store.dispatch(createOrder({payload:newOrder}))
  }
  deleteCart(){
    this.store.dispatch(deleteAll());
  }
}
