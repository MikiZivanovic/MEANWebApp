import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopServiceService } from '../../../services/shop-service.service';
import { Wine } from '../../models/wine.model';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [MenuItemComponent,NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  
  private shopService = inject(ShopServiceService)
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  page = signal(0);
  pageCount = 0;
  wines : Wine[]= [];
  filteredWines : Wine[]= [];
  
  ngOnInit(): void {
  


    this.route.queryParamMap.subscribe((params)=>{
      const newPage = Number(params.get('page')) || 1;
      if (newPage !== this.page()) {
        this.page.set(newPage);
      }

      this.loadWines();
    })
  }
  loadWines(){
    this.shopService.getWines(this.page()).subscribe((data)=>{
      this.wines = data.data;
      this.pageCount = Math.ceil(data.length/8);
      this.filteredWines = [...this.wines]
      this.filterItems();
    })
  }
  filterItems(){
    const params = this.route.snapshot.queryParamMap;
    const  stil  = params.get("stil")
      const sort  = params.get("sort")
      this.filteredWines = [...this.wines];
      if(stil ){
        const arrayStil  = stil.split("-");
        this.filteredWines = this.filteredWines.filter(el=>arrayStil.includes(el.styles[0].name))
      }
      if(sort){
        const arraySort  = sort.split("-");
        this.filteredWines = this.filteredWines.filter(el=>arraySort.includes(el.varieties.name))
      }
    
  }

  pageUp(){
    this.page.set(this.page()+1);
    this.router.navigate(["/shop"],{ queryParams:{page:this.page()},queryParamsHandling:"merge"})
  }

  pageDown(){
    this.page.set(this.page()-1);
    this.router.navigate(["/shop"],{ queryParams:{page:this.page()},queryParamsHandling:"merge"})
  }
}
