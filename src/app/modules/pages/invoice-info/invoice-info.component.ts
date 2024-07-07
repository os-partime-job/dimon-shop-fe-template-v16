import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {AccountService} from "../../auth/services/account.service";
import {CartService} from "../../service/cart.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-invoice-info',
  templateUrl: './invoice-info.component.html',
  styleUrls: ['./invoice-info.component.css']
})
export class InvoiceInfoComponent implements OnInit{
  customer_name: string = '';
  address: string = '';
  phone_number: string = '';
  order_id: string = '';
  order_date:string = '';
  jewery_name: string = '';
  jewery_code: string = '';
  quantity :string = '';
  listProduct:any[] = [];
  invoiceInfo:any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private toastrService: ToastrService,
              private numberFormat: NumberService,
              private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let orderId = params['orderId'];
      let request = {
        order_id:orderId,
      } as any;
      this.orderService.getInvoiceDetail(request).subscribe((res) => {
          this.invoiceInfo = res.data;
          this.customer_name = this.invoiceInfo?.customer_name;
          this.phone_number = this.invoiceInfo?.phone_number;
          this.order_id = this.invoiceInfo?.order_id;
          this.customer_name = this.invoiceInfo?.customer_name;
          this.order_date = this.invoiceInfo?.order_date;
          this.listProduct = this.invoiceInfo?.list_of_product;
        },
        (error) => {
          this.toastrService.error("Get Invoice Detail Fail!!!");
        });
    }, error => {
    });
  }

}
