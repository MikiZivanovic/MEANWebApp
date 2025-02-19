import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [RouterLink,NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

   authService = inject(AuthService)
  
}
