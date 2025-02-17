import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-item',
  imports: [],
  templateUrl: './filter-item.component.html',
  styleUrl: './filter-item.component.css'
})
export class FilterItemComponent {
  @Input() name !:string;
  @Input() type !: string;
  isClicked = false;
  
  constructor(private route:ActivatedRoute,private router:Router){}

  
  filterItem(){
    this.isClicked = !this.isClicked;
    const currentType = this.route.snapshot.queryParamMap.get(this.type);
    const typeArray = currentType ? currentType.split("-") : [];
    if(typeArray.includes(this.name)){
      const updatedArray = typeArray.filter((el)=>el!==this.name);
      const newParams : any = {[this.type]: updatedArray.length>0 ? updatedArray.join("-") : null }
      this.router.navigate([],{queryParams:newParams,queryParamsHandling:"merge"});
    }else{
      typeArray.push(this.name);
      const newParams : any = {[this.type]: typeArray.join("-")}
      this.router.navigate([],{queryParams:newParams,queryParamsHandling:"merge"});
    }
  }

}
