import { Component, inject, Input } from '@angular/core';
import { Wine } from '../../models/wine.model';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-info',
  imports: [NgIf],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  private route = inject(ActivatedRoute)
  location = inject(Location)
  wine?: Wine;
  styles: string = '';

  constructor() {
    this.route.data.subscribe(data => {

      this.wine = data["wine"].wine;
      if (this.wine?.styles) {
        this.styles= this.wine.styles.map(style => style.name).join(', ');
      }
    });
  }
  
}
