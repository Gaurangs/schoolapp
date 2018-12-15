import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private user: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
      this.user = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });      
  }

  ngOnInit() {
  }
  AuthenticateUser() {
    let username = '';
    let password = '';
    username = this.user.value['username'];
    password = this.user.value['password'];
    this.authService.login(username, password)
                     .then((state)=>{
                        if (state) {
                            //console.log(state);                        
                            this.router.navigate(['dashboard']);
                        } else {                          
                          this.router.navigate(['login']);
                        }        
                     })
    
    // .subscribe(state => {      
    //    if (state) {
    //        this.router.navigate(['tab2']);
    //    } else {
    //      this.router.navigate(['login']);
    //    }
    //  });
  }
}
