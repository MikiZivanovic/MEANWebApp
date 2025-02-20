import { Component, inject } from '@angular/core';
import { InfoComponent } from './info/info.component';

import { ActivatedRoute } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';


@Component({
  selector: 'app-details',
  imports: [InfoComponent,CarouselComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
 
   
}
