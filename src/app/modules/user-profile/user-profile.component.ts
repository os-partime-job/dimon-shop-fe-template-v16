import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../auth/services/account.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form!: FormGroup;
  urlImg : string = '';

  constructor(private accountService: AccountService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              ) {
    this.form = new FormGroup(
      {
        'email': new FormControl('', Validators.required),
        'full_name': new FormControl('',),
        'phone_number': new FormControl('',),
        'age': new FormControl('',),
        'date_of_birth': new FormControl('', ),
        'province': new FormControl('', ),
        'district': new FormControl('', ),
        'city': new FormControl('', ),
        'ward': new FormControl('', ),
        'extra': new FormControl('', ),
      }

    );
  }
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.callUserDetail();

  }

  onUpdate() {
    console.log(this.form);
    const user ={
      phoneNumber: this.form.controls['phone_number'].value,
      password: '123456' , //this.form['']
      fullName: this.form.controls['full_name'].value,
      isMale: false, //this.form['']
      dateOfBirth: this.form.controls['date_of_birth'].value,
      province: this.form.controls['province'].value,
      age: this.form.controls['age'].value,
      district: this.form.controls['district'].value,
      city: this.form.controls['city'].value,
      ward: this.form.controls['ward'].value,
      extra: this.form.controls['extra'].value,

  } ;
    console.log(user);
    this.accountService.updateUser(user).subscribe((res) =>{
        this.toastrService.success("Cập nhập thông tin userthành công");
        const returnUrl = this.route.snapshot.queryParams['/user-profile'] || '/user-profile';
        this.router.navigateByUrl(returnUrl);
    },
      error => {
        this.toastrService.error("Cập nhập thông tin user thất bại");
      })

  }

  callUserDetail() {
    this.accountService.getUser().subscribe((res) => {
        const data = res?.data;
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
        this.urlImg = (data?.avatar != null?data?.avatar :'');
      },
      error => {
        this.toastrService.error("lỗi lấy thông tin user");
        console.log(error);
      });

  }

}
