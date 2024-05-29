import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../auth/services/account.service";

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.css']
})
export class MyHeaderComponent implements OnInit{
  isLoginUser: boolean = false
  constructor(private accountService: AccountService) {
  }
  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("user") != null;
  }
  logOut() {
    this.accountService.logout();
  }

}
