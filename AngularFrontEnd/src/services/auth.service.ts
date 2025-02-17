import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

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

        this.http.post<{token:string,user:User}>("http://localhost:5000/api/v1/users/signup",{name,password,email}).subscribe((res)=>{
            this.user.set(res.user);
            this.cookieService.set("jwt",res.token,7);
            
        })
    }
    logIn(email:string,password:string){
        this.http.post<{token:string,user:User}>("http://localhost:5000/api/v1/users/login",{email,password}).subscribe((res)=>{
            this.user.set(res.user);
            this.cookieService.set("jwt",res.token,7);
            
        })
        
    }
    logOut(){
        this.user.set(null);
        this.cookieService.delete("jwt")
    }
}