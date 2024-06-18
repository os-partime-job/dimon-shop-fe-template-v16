import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {AccountService} from "../../auth/services/account.service";
import {CartService} from "../../service/cart.service";
import {OrderService} from "../../service/order.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit{
  isSelectAll:boolean = false;
  lisProductsCart : any[];
  subscription: Subscription;
  subscription2: Subscription;
  subscription1: Subscription;
  totalProduct: any;
  totalPriceProduct: any;
  isLoginUser:boolean = false;
  order: any;
  selectedPayment:string = 'stripe';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private toastrService: ToastrService,
              private numberFormat: NumberService,
              private accountServie: AccountService,
              private cartService: CartService,
              private orderService: OrderService,
              ) {
  }
  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("user") != null;
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      let request = {
        'order_id' : id,
        'customer_id':null
      }
      this.orderService.getDetailOrder(request).subscribe((data) => {
          this.order = data?.data;
        },
        (error) => {
          console.log(error)
        });
    });
    this.getProductCart();
  }
  getProductCart() {
    const request = {
      customer_id : 1
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
  addProductCart(product:any, quantity:number){
    if(!this.isLoginUser) {
      this.toastrService.error("Bạn phải đăng nhập trước");
      return;
    }
    const request = {
      jewelry_id : product?.id_jewelry,
      quantity : quantity
    }
    this.cartService.updateProductToCard(request).subscribe((res) =>{
      this.getProductCart();
    }, error => {
      this.toastrService.error("Update sản phầm thất bại");
    });
  }
  convertNumber(number){
    return this.numberFormat.convertNumber(number);
  }
  callPayment(order: any) {
    const request = {
      orderId:order.uniqueOrderId,//order.uniqueOrderId
      requestId:order.id, //order.id
      amount:order.totalPrice/100, // chia bớt đi để dk thanh toán <100 triệu vnd
      orderInfo:order.createdAt,
      metaData:'',
      payType:'BANK'
    }
    if(this.selectedPayment == 'vnpay'){
      this.orderService.getCallPaymentVnPay(request).subscribe((res) =>{
        window.open(res.data.paymentUrl,'_self');

      }, error => {
        // window.open('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=2946288700&vnp_BankCode=VNBANK&vnp_Command=pay&vnp_CreateDate=20240610102656&vnp_CurrCode=VND&vnp_ExpireDate=20240610104156&vnp_IpAddr=172.17.0.4&vnp_Locale=vn&vnp_OrderInfo=2024-06-08&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2F178.128.111.191%3A8091%2Fcallback%3ForderId%3D00QZ7GtvzLmBEHuTkCsWsD&vnp_TmnCode=09P8ICVA&vnp_TxnRef=89111463929724280794464514758273983962725989032362&vnp_Version=2.1.0&vnp_SecureHash=0078ef8faf6d9598322c00e80309ac8f5d19f70c13c2d690776d58d51b11a1274c15d63a684422ae71e5b5e7fc171261e1c1bebe6efe877ff9efb3d11450c4d8','_self');
        this.toastrService.error("Error call to Check out VNPay");

      });
    } else if(this.selectedPayment == 'stripe') {
      this.orderService.getCallPaymentStrip(request).subscribe((res) =>{
        window.open(res.data.paymentUrl,'_self');

      }, error => {
        // window.open('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=2946288700&vnp_BankCode=VNBANK&vnp_Command=pay&vnp_CreateDate=20240610102656&vnp_CurrCode=VND&vnp_ExpireDate=20240610104156&vnp_IpAddr=172.17.0.4&vnp_Locale=vn&vnp_OrderInfo=2024-06-08&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2F178.128.111.191%3A8091%2Fcallback%3ForderId%3D00QZ7GtvzLmBEHuTkCsWsD&vnp_TmnCode=09P8ICVA&vnp_TxnRef=89111463929724280794464514758273983962725989032362&vnp_Version=2.1.0&vnp_SecureHash=0078ef8faf6d9598322c00e80309ac8f5d19f70c13c2d690776d58d51b11a1274c15d63a684422ae71e5b5e7fc171261e1c1bebe6efe877ff9efb3d11450c4d8','_self');
        this.toastrService.error("Error call to Check out Stripe");
      });
    }

  }

  onAddProduct(addForm: NgForm) {

  }
  public onOpenModal(mode: string): void{
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'voucher') {
      button.setAttribute('data-target', '#addVoucherModal');
    }
    container.appendChild(button);
    button.click();
  }
}
