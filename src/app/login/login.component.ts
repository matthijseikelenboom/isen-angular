import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoggin() {
    this.auth.emailSignin(this.email, this.password)
      .then(result => this.router.navigate(['/devices']))
      .catch(result => console.log('Failed'));
  }

}
