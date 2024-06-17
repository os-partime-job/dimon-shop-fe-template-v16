import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {AccountService} from "../../auth/services/account.service";
import {CartService} from "../../service/cart.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  isSelectAll:boolean = false;
  orders : any[];
  totalProduct: any;
  totalPriceProduct: any;
  isLoginUser:boolean = false;
  selectedPayment:string = 'stripe';
  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [3, 6, 9];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private numberFormat: NumberService,
              private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("user") != null;
    this.getAllOrder();
  }
  getAllOrder() {
    const request = {
      customer_id : 1,
      limit:this.pageSize,
      offset:(this.page-1)*this.pageSize,
    }
    this.orderService.getAllOrder(request).subscribe((res) =>{
      this.orders = res.data;
      this.count = res?.meta?.total;
    }, error => {
      this.toastrService.error("Error get list order")

    })
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.getAllOrder();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllOrder();
  }
  // callPayment(order: any) {
  //   const request = {
  //     orderId:order.uniqueOrderId,//order.uniqueOrderId
  //     requestId:order.id, //order.id
  //     amount:order.totalPrice/100, // chia bớt đi để dk thanh toán <100 triệu vnd
  //     orderInfo:order.createdAt,
  //     metaData:'',
  //     payType:'BANK'
  //   }
  //   if(this.selectedPayment == 'vnpay'){
  //     this.orderService.getCallPaymentVnPay(request).subscribe((res) =>{
  //       window.open(res.data.paymentUrl,'_self');
  //
  //     }, error => {
  //       // window.open('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=2946288700&vnp_BankCode=VNBANK&vnp_Command=pay&vnp_CreateDate=20240610102656&vnp_CurrCode=VND&vnp_ExpireDate=20240610104156&vnp_IpAddr=172.17.0.4&vnp_Locale=vn&vnp_OrderInfo=2024-06-08&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2F178.128.111.191%3A8091%2Fcallback%3ForderId%3D00QZ7GtvzLmBEHuTkCsWsD&vnp_TmnCode=09P8ICVA&vnp_TxnRef=89111463929724280794464514758273983962725989032362&vnp_Version=2.1.0&vnp_SecureHash=0078ef8faf6d9598322c00e80309ac8f5d19f70c13c2d690776d58d51b11a1274c15d63a684422ae71e5b5e7fc171261e1c1bebe6efe877ff9efb3d11450c4d8','_self');
  //       this.toastrService.error("Error call to Check out VNPay");
  //
  //     });
  //   } else if(this.selectedPayment == 'stripe') {
  //     this.orderService.getCallPaymentStrip(request).subscribe((res) =>{
  //       window.open(res.data.paymentUrl,'_self');
  //
  //     }, error => {
  //       // window.open('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=2946288700&vnp_BankCode=VNBANK&vnp_Command=pay&vnp_CreateDate=20240610102656&vnp_CurrCode=VND&vnp_ExpireDate=20240610104156&vnp_IpAddr=172.17.0.4&vnp_Locale=vn&vnp_OrderInfo=2024-06-08&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2F178.128.111.191%3A8091%2Fcallback%3ForderId%3D00QZ7GtvzLmBEHuTkCsWsD&vnp_TmnCode=09P8ICVA&vnp_TxnRef=89111463929724280794464514758273983962725989032362&vnp_Version=2.1.0&vnp_SecureHash=0078ef8faf6d9598322c00e80309ac8f5d19f70c13c2d690776d58d51b11a1274c15d63a684422ae71e5b5e7fc171261e1c1bebe6efe877ff9efb3d11450c4d8','_self');
  //       this.toastrService.error("Error call to Check out Stripe");
  //     });
  //   }
  //
  // }
  convertNumber(number){
    return this.numberFormat.convertNumber(number);
  }

  callPayment(item: any) {
    const returnUrl = this.route.snapshot.queryParams[`/order-info?id=${item.id}`] || `/order-info?id=${item.id}`;
    this.router.navigateByUrl(returnUrl);
  }
}
