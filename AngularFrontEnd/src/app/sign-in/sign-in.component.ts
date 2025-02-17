import { Location } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private authService = inject(AuthService)
  location = inject(Location)


 onSubmit(form:NgForm){
    this.authService.signIn(form.value.name,form.value.password,form.value.email);
    form.reset();
  }
}
