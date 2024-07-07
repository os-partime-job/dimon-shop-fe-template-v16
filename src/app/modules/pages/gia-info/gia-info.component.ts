import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-gia-info',
  templateUrl: './gia-info.component.html',
  styleUrls: ['./gia-info.component.css']
})
export class GiaInfoComponent implements OnInit{
  giaInfo:any;

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
      this.orderService.getGIAInfo(request).subscribe((res) => {
          // this.invoiceInfo = res.data;
          // this.customer_name = this.invoiceInfo?.customer_name;
          // this.phone_number = this.invoiceInfo?.phone_number;
          // this.order_id = this.invoiceInfo?.order_id;
          // this.customer_name = this.invoiceInfo?.customer_name;
          // this.order_date = this.invoiceInfo?.order_date;
          // this.listProduct = this.invoiceInfo?.list_of_product;
        this.giaInfo = res.data;
        },
        (error) => {
          this.toastrService.error("Get Invoice Detail Fail!!!");
        });
    }, error => {
    });
  }
  formatDateString(dateString:any) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Define an array of month names
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Get the day, month, and year from the Date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Return the formatted date string
    return `${month} ${day}, ${year}`;
  }

}
