import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'page-sign-in-1',
  templateUrl: './sign-in-1.component.html',
  styleUrls: ['./sign-in-1.component.scss']
})
export class PageSignIn1Component implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
   }


  onSubmit() {
     console.log(this.model);
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(result => {
            if (result === true) {
              this.router.navigate(['']);
            } else {
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
}

}
