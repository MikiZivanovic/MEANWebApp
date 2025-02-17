import { Component, inject, OnInit } from '@angular/core';
import { ShopServiceService } from '../shop-service.service';
import { Style } from '../../models/style.model';
import { NgFor } from '@angular/common';
import { FilterItemComponent } from './filter-item/filter-item.component';
import { Variety } from '../../models/variety.model';


@Component({
  selector: 'app-filter',
  imports: [NgFor,FilterItemComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {

  private shopService = inject(ShopServiceService)
  styles : Style[] = [];
  varieties : Variety[] = [];
  
  ngOnInit(): void {
    this.shopService.getStyles().subscribe((res)=>this.styles = res.styles);    
    this.shopService.getVarieties().subscribe((res)=>this.varieties = res.varities);
  }

}
