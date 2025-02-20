import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Wine } from "../app/models/wine.model";


@Injectable({providedIn:"root"})
export class DetailsService{

    private http = inject(HttpClient)

    getWine(id:string){
        return this.http.get<Wine>(`http://localhost:5000/api/v1/wines/${id}`);
    }
}