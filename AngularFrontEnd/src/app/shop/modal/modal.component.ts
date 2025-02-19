import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { cancelErrorState, cancelMessageState } from '../../store/cart.actions';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
    
    @Input() message!:string | undefined ;
    @Input() type !: string | undefined;


    private store = inject(Store)

    closeModal(){
      if(this.type ==="error"){
        this.store.dispatch(cancelErrorState())
      } 
      if(this.type =="message"){
        this.store.dispatch(cancelMessageState())
      }

    }
}
