import { NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [NgFor,NgClass],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{
 
  private route = inject(ActivatedRoute)

  images :string[]=[] ;
  activeIndex = 0;

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      this.images = data["wine"].wine.images;
    
    })
  }
  handlePrev() {
    this.activeIndex =this.activeIndex === 0 ? this.images.length - 1 : this.activeIndex - 1;
  }

  handleNext() {
    this.activeIndex =this.activeIndex === this.images.length - 1 ? 0 : this.activeIndex + 1;
  }

  setActive(index: number) {
    this.activeIndex = index;
  }
}
