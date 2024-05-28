import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../auth/services/account.service";
import {AuthGoogleService} from "../../../core/shared/auth-google.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{
  form!: FormGroup;
  otpConfig = {
    length: 6,
    inputStyles: {
      'width': '60px',
      'height': '60px',
      'margin': '0 10px'
    },
    containerStyles: {
      'display': 'flex',
      'justify-content': 'center'
    }
  };

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private authGoogleService: AuthGoogleService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
      province: [''],
      district: [''],
      city: [''],
      ward: [''],
      extra: [''],
      phoneNumber: [''],
      otp:[''],

    });
  }

  get f() { return this.form.controls; }
  onRegister() {
    this.onOpenModal("otp");

  }
  callRegister() {
    if (this.form.invalid) {
      this.toastrService.error("Xem lại thông tin vừa nhập");
      return;
    }
    if (this.form.controls['password'].value !==this.form.controls['rePassword'].value) {
      this.toastrService.error("Mật khẩu nhập không khớp");
      return;
    }
    const user ={
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value , //this.form['']
      province: this.form.controls['province'].value,
      district: this.form.controls['district'].value,
      city: this.form.controls['city'].value,
      ward: this.form.controls['ward'].value,
      extra: this.form.controls['extra'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      otp:  this.form.controls['otp'].value,

    } ;
    this.accountService.register(user).subscribe((res) =>{
        this.toastrService.success("Đăng ký user thành công");
        const returnUrl = this.route.snapshot.queryParams['/home-page'] || '/home-page';
        this.router.navigateByUrl(returnUrl);
      },
      error => {
        this.toastrService.error("Đăng ký user thất bại");
      })
  }
  public onOpenModal( mode: string): void{
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'otp') {
      button.setAttribute('data-target', '#otpModal');
    }
    container.appendChild(button);
    button.click();
  }

}
