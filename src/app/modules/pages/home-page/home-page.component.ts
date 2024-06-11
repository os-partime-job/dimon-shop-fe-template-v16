import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {AccountService} from "../../auth/services/account.service";
import {AuthGoogleService} from "../../../core/shared/auth-google.service";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  isLoginUser:boolean = false;
  listProduct:any[]
  rings: any[]
  famousRing : any

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private toastrService: ToastrService,
              private numberFormat: NumberService,
              private accountServie: AccountService,
              private googleService :AuthGoogleService,
              private cartService: CartService) {
    if(googleService.getIdToken()){
      const body = {token:googleService.getIdToken()}
      accountServie.loginWithGoogle(body).subscribe((res) =>{
        console.log(res);
        localStorage.setItem("user",JSON.stringify(res))
      },error => {

      });
    }
  }

  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("user") != null;
    this.getProducts();
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
  convertNumber(number){
    return this.numberFormat.convertNumber(number);
  }
  goToProductDetail(id:number) {
    console.log(id);
    const returnUrl = this.route.snapshot.queryParams[`/ecommerce?id=${id}`] || `/ecommerce?id=${id}`;
    this.router.navigateByUrl(returnUrl);
  }

  getProducts() {
    let request = {
      jewelry_type_id:1,
      limit:4,
      offset:0,
      requestId:''
    }
    let requestOfRings = {
      jewelry_type_id:6,
      limit:2,
      offset:0,
      requestId:''
    }
    this.productService.getProducts(request).subscribe((res) => {
      this.listProduct = res.data;
    }, error => {
      this.toastrService.error("Error get famous products");
    });
    this.productService.getProducts(requestOfRings).subscribe((res) => {
      this.rings = res.data;
    }, error => {
      this.toastrService.error("Error get famous rings");
    });
    this.productService.getProductDetail(62).subscribe((res) => {
      this.famousRing = res.data;
    }, error => {
      this.toastrService.error("Error get famous ring");
    })

      }
  getProductCart() {
    const request = {
      customer_id : 1
    }
    this.cartService.getProductInCart(request).subscribe((res) =>{
      this.cartService.cartItems.next(res?.data);
      this.cartService.totalProductInCart.next(this.cartService.getTotalProduct(res?.data));
      this.cartService.totalPrice.next(this.cartService.getTotalPriceV2(res?.data));
    }, error => {

    })
  }
  addProductCart(product:any){
    if(!this.isLoginUser) {
      this.toastrService.error("Bạn phải đăng nhập trước");
      return;
    }
    const request = {
      jewelry_id : product?.id_jewelry,
      quantity : 1
    }
    this.cartService.addProductToCard(request).subscribe((res) =>{
      this.toastrService.success("Add sản phầm thành công");
      this.getProductCart();
    }, error => {
      this.toastrService.error("Add sản phầm thất bại");
    });
  }

}
