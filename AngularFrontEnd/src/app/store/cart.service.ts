import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CartItem } from "./cart.reducer";

@Injectable({providedIn:"root"})
export class CartService{

    private http = inject(HttpClient)

    createOrder(newOrder:{totalprice:number,items:CartItem[]}){
        
        return this.http.post("http://localhost:5000/api/v1/orders",newOrder,{withCredentials:true})
    }
}