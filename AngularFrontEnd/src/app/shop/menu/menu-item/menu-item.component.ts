import { Component, Input } from '@angular/core';
import { Wine } from '../../../models/wine.model';

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
    @Input() wine !: Wine;

    
}
