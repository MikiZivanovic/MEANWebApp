import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { error } from "console";
import { CookieService } from "ngx-cookie-service";
import { catchError, of, tap, throwError } from "rxjs";

interface User{
    id:string,
    name:string
}

@Injectable({providedIn:"root"})
export class AuthService{
    
    private http = inject(HttpClient)
    private cookieService = inject(CookieService)
    user = signal<User | null>(null);

    
    signIn(name:string,password:string,email:string){

        return this.http.post<{token:string,user:User}>("http://localhost:5000/api/v1/users/signup",{name,password,email}).pipe(
            tap(res=>{
                this.user.set(res.user);
                 this.cookieService.set("jwt",res.token,7);
            }),
            catchError(
                (err)=>{ return  throwError(()=>err); })
        )
    }
    logIn(email:string,password:string){
        return this.http.post<{token:string,user:User}>("http://localhost:5000/api/v1/users/login",{email,password}).pipe(
            tap(res=>{
                this.user.set(res.user);
                 this.cookieService.set("jwt",res.token,7);
            }),
            catchError(
                (err)=>{ return  throwError(()=>err); })
        )
        
    }
    logOut(){
        this.user.set(null);
        this.cookieService.delete("jwt")
    }
}