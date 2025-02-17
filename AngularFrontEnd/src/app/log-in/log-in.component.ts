import { Location } from '@angular/common';
import { Component, inject,  } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-log-in',
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  private authService = inject(AuthService)
  location = inject(Location)
  
  onSubmit(form:NgForm){
    this.authService.logIn(form.value.email,form.value.password)
    form.reset();
  }
}
