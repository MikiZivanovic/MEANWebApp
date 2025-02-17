import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { FilterComponent } from './filter/filter.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-shop',
  imports: [MenuComponent,FilterComponent,UserComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

}
