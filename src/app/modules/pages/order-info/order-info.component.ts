import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {AccountService} from "../../auth/services/account.service";
import {CartService} from "../../service/cart.service";
import {OrderService} from "../../service/order.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

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
  voucher: any;
  selectedPayment:string = 'stripe';
  totalItem:number;
  totalResultPrice:number;
  totalDiscount:number;
  totalFinally:number;
  form :FormGroup;
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
    this.form = new FormGroup(
      {
        'email': new FormControl({value:'',  disabled: true}, Validators.required),
        'full_name': new FormControl('',Validators.required),
        'phone_number': new FormControl('',Validators.required),
        'age': new FormControl('',),
        'date_of_birth': new FormControl('', ),
        'province': new FormControl('', ),
        'district': new FormControl('', ),
        'city': new FormControl('', ),
        'ward': new FormControl('', ),
        'extra': new FormControl('', Validators.required),
      }
    );
    this.isLoginUser = localStorage.getItem("user") != null;
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      let request = {
        'order_id' : id,
        'customer_id':null
      }
      this.orderService.getDetailOrder(request).subscribe((data) => {
          this.order = data?.data[0];
          this.totalItem = this.getTotalItem(this.order.orderDetails);
          this.totalResultPrice = this.getTotalPriceOrder(this.order.orderDetails);
          this.totalFinally = this.getTotalPriceOrder(this.order.orderDetails);
        },
        (error) => {
        });
    });
    this.getInfoPostOrder();
  }
  getTotalPriceOrder( products:any[]) {
    let grandTotal = 0;
    products.map((a:any)=>{
      grandTotal += a.totalPrice;
    })
    return grandTotal;

  }
  getTotalItem(products:any[]) {
    let grandTotal = 0;
    products.map((a:any)=>{
      grandTotal += a.quantityNumber;
    })
    console.log(grandTotal);
    return grandTotal;
  }
  // getProductCart() {
  //   const request = {
  //     customer_id : 1
  //   }
  //   this.cartService.getProductInCart(request).subscribe((res) =>{
  //     // this.lisProductsCart = res?.data;
  //     this.cartService.cartItems.next(res?.data);
  //     this.cartService.totalProductInCart.next(this.cartService.getTotalProduct(res?.data));
  //     // this.cartService.totalPrice.next(this.cartService.getTotalPriceV2(res?.data));
  //     this.subscription = this.cartService.totalProductInCart$.subscribe(data=>this.totalProduct = data);
  //     // this.subscription2 = this.cartService.totalPrice$.subscribe(data => this.totalPriceProduct = data);
  //     this.subscription1 = this.cartService.cartItems$.subscribe(data => this.lisProductsCart = data.map(value => {
  //       value.isChecked = false;
  //       return value;
  //     }));
  //     console.log(this.lisProductsCart);
  //   }, error => {
  //
  //   })
  // }
  convertNumber(number){
    return this.numberFormat.convertNumber(number);
  }
  callPayment(order: any) {
    if(this.validateInformationUser()) {
      const request = {
        orderId:order.uniqueOrderId,//order.uniqueOrderId
        requestId:order.id, //order.id
        amount:this.totalFinally/100, // chia bớt đi để dk thanh toán <100 triệu vnd
        orderInfo:order.createdAt,
        metaData:'',
        payType:'BANK'
      }
      this.onUpdateUser();
      if(this.selectedPayment == 'vnpay'){
        if(this.voucher) {
          this.useVoucher();
        }
        this.orderService.getCallPaymentVnPay(request).subscribe((res) =>{
          window.open(res.data.paymentUrl,'_self');

        }, error => {
          // window.open('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=2946288700&vnp_BankCode=VNBANK&vnp_Command=pay&vnp_CreateDate=20240610102656&vnp_CurrCode=VND&vnp_ExpireDate=20240610104156&vnp_IpAddr=172.17.0.4&vnp_Locale=vn&vnp_OrderInfo=2024-06-08&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2F178.128.111.191%3A8091%2Fcallback%3ForderId%3D00QZ7GtvzLmBEHuTkCsWsD&vnp_TmnCode=09P8ICVA&vnp_TxnRef=89111463929724280794464514758273983962725989032362&vnp_Version=2.1.0&vnp_SecureHash=0078ef8faf6d9598322c00e80309ac8f5d19f70c13c2d690776d58d51b11a1274c15d63a684422ae71e5b5e7fc171261e1c1bebe6efe877ff9efb3d11450c4d8','_self');
          this.toastrService.error("Error call to Check out VNPay");

        });
      } else if(this.selectedPayment == 'stripe') {
        if(this.voucher) {
          this.useVoucher();
        }
        this.orderService.getCallPaymentStrip(request).subscribe((res) =>{
          window.open(res.data.paymentUrl,'_self');

        }, error => {
          // window.open('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=2946288700&vnp_BankCode=VNBANK&vnp_Command=pay&vnp_CreateDate=20240610102656&vnp_CurrCode=VND&vnp_ExpireDate=20240610104156&vnp_IpAddr=172.17.0.4&vnp_Locale=vn&vnp_OrderInfo=2024-06-08&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2F178.128.111.191%3A8091%2Fcallback%3ForderId%3D00QZ7GtvzLmBEHuTkCsWsD&vnp_TmnCode=09P8ICVA&vnp_TxnRef=89111463929724280794464514758273983962725989032362&vnp_Version=2.1.0&vnp_SecureHash=0078ef8faf6d9598322c00e80309ac8f5d19f70c13c2d690776d58d51b11a1274c15d63a684422ae71e5b5e7fc171261e1c1bebe6efe877ff9efb3d11450c4d8','_self');
          this.toastrService.error("Error call to Check out Stripe");
        });
      }
    } else {
      this.toastrService.error("View information user!!!");
    }
  }

  onAddVoucher(addForm: NgForm) {

  }
  public onOpenModal(mode: string): void{
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'voucher') {
      button.setAttribute('data-target', '#addVoucherModal');
    } else if (mode ==='informationCustomerModal') {
      button.setAttribute('data-target', '#informationCustomerModal');
    }
    container.appendChild(button);
    button.click();
  }
  public useVoucher(){
    const request = {
      couponCode:this.voucher.couponsCode,
      orderId:this.order?.uniqueOrderId,
    };
    this.orderService.useVoucher(request).subscribe((res) =>{
      this.toastrService.success("Add voucher success");
    }, error => {
      this.toastrService.error("Add voucher error!!!");
    })
  }

  checkVoucher(addForm: NgForm) {
    console.log(addForm.value.code);
    const request = {
      id: addForm.value.code
    }
      this.orderService.checkVoucher(request).subscribe((res) => {
        this.voucher = res.data;
        this.totalDiscount = this.voucher.discountPercent*this.totalResultPrice/100;
        this.totalFinally = this.totalResultPrice - this.totalDiscount;
        console.log(res)
        this.toastrService.success("Check voucher success!!!");
      }, error => {
        if (error.error.data) {
          this.toastrService.error(error.error.data);
        } else {
          this.toastrService.error("Check voucher error!!!");
        }

      });
  }
  getInfoPostOrder() {
    this.orderService.getInfoPostOrder().subscribe((res) => {
      const data = res?.data.userProfile;
      //set data
      this.form.controls['email'].setValue(data?.email);
      this.form.controls['full_name'].setValue(data?.full_name);
      this.form.controls['phone_number'].setValue(data?.phone_number);
      this.form.controls['age'].setValue(data?.age);
      this.form.controls['date_of_birth'].setValue(data?.date_of_birth);
      this.form.controls['province'].setValue(data?.address?.province);
      this.form.controls['district'].setValue(data?.address?.district);
      this.form.controls['city'].setValue(data?.address?.city);
      this.form.controls['ward'].setValue(data?.address?.ward);
      this.form.controls['extra'].setValue(data?.address?.extra);
    }, error => {
      this.toastrService.error("Get information Customer Error!!");
    })
  }
  onUpdateUser() {
    const user ={
      phoneNumber: this.form.controls['phone_number'].value,
      // password: '123456' , //this.form['']
      fullName: this.form.controls['full_name'].value,
      // isMale: false, //this.form['']
      dateOfBirth: this.form.controls['date_of_birth'].value,
      province: this.form.controls['province'].value,
      age: this.form.controls['age'].value,
      district: this.form.controls['district'].value,
      city: this.form.controls['city'].value,
      ward: this.form.controls['ward'].value,
      extra: this.form.controls['extra'].value,

    } ;
    this.accountServie.updateUser(user).subscribe((res) =>{
      },
      error => {
        this.toastrService.error("Update user fail!!!");
      })

  }
  get formInfo(){
    return this.form.controls;
  }
  validateInformationUser(){
    if(this.formInfo.full_name.errors){
        this.toastrService.error("full name not is empty!!!");
        return false;
    }else if(this.formInfo.phone_number.errors){
      this.toastrService.error("Phone number not is empty!!!");
      return false;
    }else if(this.formInfo.extra.errors){
      this.toastrService.error("extra not is empty!!!");
      return false;
    } else {
      return true;
    }
  }
}
