import { Component, effect, inject, OnInit } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { FilterComponent } from './filter/filter.component';
import { UserComponent } from './user/user.component';
import { CartComponent } from './cart/cart.component';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectConfirmMessage, selectErrorMessage } from '../store/cart.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-shop',
  imports: [MenuComponent,FilterComponent,UserComponent,CartComponent,NgIf,ModalComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
    
  store = inject(Store)
  error :undefined| string = undefined;
  sub =this.store.select(selectErrorMessage).subscribe((val)=>this.error=val)
  confirmMessage = toSignal(this.store.select(selectConfirmMessage),{initialValue:undefined})



}
