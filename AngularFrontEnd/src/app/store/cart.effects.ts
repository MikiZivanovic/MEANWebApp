import { inject } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import { createOrder, createOrderInvalid, createOrderValid } from "./cart.actions";
import { catchError, map, mergeMap ,of, tap} from "rxjs";
import { CartService } from "./cart.service";

export class CartEffects {

    private actions = inject(Actions)
    private  cartService  =inject(CartService)
    action = createEffect(()=>
        this.actions.pipe(
            ofType(createOrder),
            mergeMap(({ payload }) =>
                this.cartService.createOrder({ totalprice: payload.totalprice, items: payload.items }).pipe(
                    map(() => createOrderValid()),
                    catchError((error) => {
                        console.error("Greška u kreiranju porudžbine:", error.error.message);
                        return of(createOrderInvalid({ payload: { error: error.error.message || "Došlo je do greške pri kreiranju porudžbine" } }));
                    })
                )
            )
        )

        ,{dispatch:true})
    
}