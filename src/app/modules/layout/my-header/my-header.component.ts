import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../auth/services/account.service";
import {CartService} from "../../service/cart.service";
import { Subscription } from 'rxjs';
import {NumberService} from "../../service/number.service";

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.css']
})
export class MyHeaderComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;

  isLoginUser: boolean = false
  totalProduct: any;
  totalPriceProduct: any;

  constructor(private accountService: AccountService,
              private cartService: CartService,
              private numberFormat: NumberService,) {
  }
  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("user") != null;
    this.subscription = this.cartService.totalProductInCart$.subscribe(data=>this.totalProduct = data);
    this.subscription2 = this.cartService.totalPrice$.subscribe(data => this.totalPriceProduct = data);
    this.subscription3 = this.accountService.userSubject.subscribe(data =>{if(data) this.isLoginUser = true;});
  }
  logOut() {
    this.accountService.logout();
  }
  convertNumber(number){
    return this.numberFormat.convertNumber(number);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
