import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    {path:"" , component:HomeComponent},
    {path:"shop",component:ShopComponent},
    {path:"login",component:LogInComponent},
    {path:"signin",component:SignInComponent}
];
