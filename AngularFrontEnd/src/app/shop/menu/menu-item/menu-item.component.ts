import { Component, inject, Input } from '@angular/core';
import { Wine } from '../../../models/wine.model';
import { Store } from '@ngrx/store';
import { CartItem } from '../../../store/cart.reducer';
import { addItem } from '../../../store/cart.actions';

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
    @Input() wine !: Wine;

    store = inject(Store)

    Add(){
      const newItem :CartItem ={
        id:this.wine._id,
        quantity:1,
        price:this.wine.price,
        name : this.wine.name,
        wine:this.wine._id
      } 
     
      this.store.dispatch(addItem({payload:{id:this.wine._id,newItem:newItem}}))
    }
}
