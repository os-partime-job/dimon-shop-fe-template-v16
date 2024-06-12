import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {AccountService} from "../../auth/services/account.service";
import {CartService} from "../../service/cart.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-bill-result',
  templateUrl: './bill-result.component.html',
  styleUrls: ['./bill-result.component.css']
})
export class BillResultComponent {
  isSelectAll:boolean = false;
  orders : any[];
  totalProduct: any;
  totalPriceProduct: any;
  isLoginUser:boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private toastrService: ToastrService,
              private numberFormat: NumberService,
              private accountServie: AccountService,
              private cartService: CartService,
              private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("user") != null;
    this.getAllOrder();
  }
  getAllOrder() {
    const request = {
      customer_id : 1
    }
    this.orderService.getAllOrder(request).subscribe((res) =>{
      this.orders = res.data;
    }, error => {
      this.toastrService.error("Error get list order")

    })
  }
  callPayment(order: any) {
    const request = {
      orderId:order.uniqueOrderId,
      requestId:order.id,
      amount:order.totalPrice,
      orderInfo:order.createdAt,
      metaData:'',
      payType:'BANK'
    }
    this.orderService.getCallPaymentVnPay(request).subscribe((res) =>{
      window.open(res.data.paymentUrl);

    }, error => {
      this.toastrService.error("Error call to Check out VNPay");

    });
  }
  convertNumber(number){
    return this.numberFormat.convertNumber(number);
  }

}
