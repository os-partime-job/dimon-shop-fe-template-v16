import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isLoginUser:boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
        this.isLoginUser = localStorage.getItem("user") != null;
        console.log(localStorage.getItem("user"),this.isLoginUser);
    }

  redirectLogin() {
    const returnUrl = this.route.snapshot.queryParams['/login-v3'] || '/login-v3';
    this.router.navigateByUrl(returnUrl);

  }
  redirectProfile() {
    const returnUrl = this.route.snapshot.queryParams['/user-profile'] || '/user-profile';
    this.router.navigateByUrl(returnUrl);

  }
}
