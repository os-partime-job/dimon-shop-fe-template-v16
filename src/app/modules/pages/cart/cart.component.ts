import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {AccountService} from "../../auth/services/account.service";
import {CartService} from "../../service/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  isSelectAll:boolean = false;
  lisProductsCart : any[];
  subscription: Subscription;
  subscription2: Subscription;
  subscription1: Subscription;
  totalProduct: any;
  totalPriceProduct: any;
  isLoginUser:boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private toastrService: ToastrService,
              private numberFormat: NumberService,
              private accountServie: AccountService,
              private cartService: CartService) {
  }
  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("user") != null;
    this.getProductCart();
  }
  getProductCart() {
    const request = {
      customer_id : localStorage.getItem("user")
    }
    this.cartService.getProductInCart(request).subscribe((res) =>{
      // this.lisProductsCart = res?.data;
      this.cartService.cartItems.next(res?.data);
      this.cartService.totalProductInCart.next(this.cartService.getTotalProduct(res?.data));
      this.cartService.totalPrice.next(this.cartService.getTotalPriceV2(res?.data));
      this.subscription = this.cartService.totalProductInCart$.subscribe(data=>this.totalProduct = data);
      this.subscription2 = this.cartService.totalPrice$.subscribe(data => this.totalPriceProduct = data);
      this.subscription1 = this.cartService.cartItems$.subscribe(data => this.lisProductsCart = data.map(value => {
        value.isChecked = false;
        return value;
      }));
      console.log(this.lisProductsCart);
    }, error => {

    })
  }
  clickSelectAll() {
    console.log(this.isSelectAll);
    const listCopy = this.lisProductsCart.map( value => {
      if(!this.isSelectAll){
        value.isChecked = true;
      } else {
        value.isChecked = false;
      }
      return value;
    });
    this.lisProductsCart = [...listCopy];
    console.log(this.lisProductsCart);
  }

}
