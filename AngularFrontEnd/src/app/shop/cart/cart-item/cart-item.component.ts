import { Component, inject, Input } from '@angular/core';
import { CartItem } from '../../../store/cart.reducer';
import { Store } from '@ngrx/store';
import { addItem, deleteItem, removeSelectedItem } from '../../../store/cart.actions';
import { Observable } from 'rxjs';
import { selectCartTotalCount, selectCartTotalPrice } from '../../../store/cart.selectors';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item !:CartItem;
   store = inject(Store)
   
   deleteItem(){
    this.store.dispatch(deleteItem({payload:{id:this.item.id}}))
   }
   removeSelectedItem(){
    this.store.dispatch(removeSelectedItem({id:this.item.id}))
   }
   addItem(){
    this.store.dispatch(addItem({payload:{id:this.item.id,newItem:this.item}}))
   }
}
