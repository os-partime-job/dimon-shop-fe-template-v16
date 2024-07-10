import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {NumberService} from "../../service/number.service";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{
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
  listDiamond : any[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private numberFormat: NumberService,
              private orderService: OrderService,
              private productService: ProductService,) {
  }
  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("user") != null;
    this.getDiamondList();
  }
  getAllOrder() {
    const request = {
      customer_id : 1,
      limit:this.pageSize,
      offset:(this.page-1)*this.pageSize,
      status:'waiting payment'
    }
    this.orderService.getAllOrder(request).subscribe((res) =>{
      this.orders = res.data;
      this.count = res?.meta?.total;
    }, error => {
      this.toastrService.error("Error get list order")
    });
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
  convertNumber(number){
    return this.numberFormat.convertNumber(number);
  }

  callPayment(item: any) {
    const returnUrl = this.route.snapshot.queryParams[`/order-info?id=${item.id}`] || `/order-info?id=${item.id}`;
    return this.router.navigateByUrl(returnUrl);
  }
  calculateToTalProduct(item : any) {
    let total = 0;
      item.orderDetails.map((a:any)=>{
      total += a.totalPrice;
      if(a.size) {
        const diamond = this.getDiamond(item.size);
        total += diamond.price*a.quantityNumber;
      }
    })
    return total;
  }
  getDiamondList() {
    this.productService.getDiamondList().subscribe((res) =>{
      this.listDiamond = res;
      this.getAllOrder();
    }, error => {
      this.toastrService.error("Get diamond list fail!!!");
    })
  }
  getDiamond(name){
    return  this.listDiamond.find(({name}) => name === name);
  }
}
