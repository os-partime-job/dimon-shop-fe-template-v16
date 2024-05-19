import { Component, OnInit } from '@angular/core';
import {NumberService} from "../../../service/number.service";

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
  product:any;

  constructor(private numberFormat: NumberService) { }

  ngOnInit(): void {
    this.product = {  "id_jewelry": 3,
      "jewelry_title": "Nhẫn nữ đính kim cương sang trọng 18K",
      "jewelry_code": "NNKC03",
      "jewelry_type": "Nhẫn Kim Cương Nữ",
      "jewelry_type_id": 2,
      "quantity": 100,
      "price": 1234000.0,
      "created_at": null,
      "created_by": "Tran Khoa",
      "updated_at": null,
      "updated_by": "",
      "description": "Nhẫn kim cương nữ vàng trắng 18K CH 0163 cũng là một thiết kế đột phá của thương hiệu Cao Hùng. Dù không sử dụng viên kim cương chủ có kích thước lớn nhưng chiếc nhẫn vẫn tỏa sáng theo một cách rất riêng.",
      "image_id": null,
      "type_enum": null,
      "diamond_id": "36000000-0000-0000-0000-000000000000"};
  }
  convertNumber(number){
    return this.numberFormat.convertNumber(number);
  }

}
