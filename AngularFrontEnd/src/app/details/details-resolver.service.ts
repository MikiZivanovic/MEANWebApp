import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { Wine } from "../models/wine.model";
import { inject, Injectable } from "@angular/core";
import { DetailsService } from "../../services/detaiils.service";
import { firstValueFrom } from "rxjs";

@Injectable({providedIn:"root"})
export class DetailsResolver implements Resolve<Wine>{
    private detailsService = inject(DetailsService)
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Wine> {
      return await firstValueFrom(this.detailsService.getWine(route.paramMap.get("id")!))  ;
    }
    
}