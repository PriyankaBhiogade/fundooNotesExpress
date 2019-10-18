import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  getErrorMessage = '';
  user: UserModel = new UserModel();
  password = new FormControl(this.user.password, [Validators.required, Validators.minLength(6)])
  confirmPassword = new FormControl(this.user.confirmPassword, [Validators.required, Validators.minLength(6)])
  data: any;
 

  constructor(public formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private activtedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }
   access_token = this.activtedRoute.snapshot.paramMap.get('token')
    
  ngOnInit() {
      localStorage.setItem('access_token', this.access_token);
  }
  
  passwordError() {
    return this.password.hasError('required') ? 'Passowrd is require' :
      this.password.hasError('minlength') ? 'Minimum length must be 6' : '';
  }
  confirmPasswordError() {
    return this.confirmPassword.hasError('required') ? 'Confirm Passowrd is require' :
      this.confirmPassword.hasError('minlength') ? 'Minimum length must be 6' : '';
  }
  next(user) {
    user = {
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }
    if (this.password.value != this.confirmPassword.value) {
      this.getErrorMessage = "Password and Confirm Password not Matching";
      return;
    }
    console.log("pass", user.password)
    console.log("datata", this.access_token);
    this.userService.reset(this.access_token, user.password).subscribe(
      response => {
        console.log("response", response)
        this.snackBar.open(
          'reset Successful',
          'End now',
          { duration: 1000 });
        this.router.navigateByUrl('/login');
      },
      error => {
        this.snackBar.open(
          "reset Failed",
          "undo",
          { duration: 2500 })
      }
    )
  }

}
