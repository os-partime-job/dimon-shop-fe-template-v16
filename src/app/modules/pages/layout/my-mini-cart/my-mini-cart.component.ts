import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../../service/number.service";
import {AccountService} from "../../../auth/services/account.service";
import {AuthGoogleService} from "../../../../core/shared/auth-google.service";
import {CartService} from "../../../service/cart.service";

@Component({
  selector: 'app-my-mini-cart',
  templateUrl: './my-mini-cart.component.html',
  styleUrls: ['./my-mini-cart.component.css']
})
export class MyMiniCartComponent implements OnInit{
  lisProductsCart : any[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private toastrService: ToastrService,
              private numberFormat: NumberService,
              private accountServie: AccountService,
              private cartService: CartService
              ) {
  }
  ngOnInit(): void {

  }
  getProductCart() {
    const request = {
      customer_id : localStorage.getItem("user")
    }
    this.cartService.getProductInCart(request).subscribe((res) =>{
      this.lisProductsCart = res?.data;
    }, error => {

    })
  }

}
