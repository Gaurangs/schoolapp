import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private navCtrl: NavController, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['login']);
  }
}
