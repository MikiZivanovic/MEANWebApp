import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Wine } from '../models/wine.model';
import { Style } from '../models/style.model';
import { Variety } from '../models/variety.model';
@Injectable({
  providedIn: 'root'
})

export class ShopServiceService {

  wines: Wine[] = [];
  
  constructor(private http : HttpClient) { }

  getWines(page:number){
      return this.http.get<{count:number,data:Wine[]}>(`http://localhost:5000/api/v1/wines?page=${page}&limit=8`).pipe(
      map(
        (res)=>({
          length:res.count,
          data:res.data
        })
      ),
      tap(
        (res)=>{this.wines = res.data}
      ))
  }

  getStyles(){
    return this.http.get<{styles:Style[]}>("http://localhost:5000/api/v1/styles")
  }
  
  getVarieties(){
    return this.http.get<{varities:Variety[]}>("http://localhost:5000/api/v1/varieties")
  }
  
}
