import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.page.html',
  styleUrls: ['./phone-number.page.scss'],
})
export class PhoneNumberPage implements OnInit {
  langId
  CustomerMobile
  CustomerMobileplace
  Continue
  register: FormGroup;
  constructor(private router : Router , public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.langId = localStorage.getItem("lang")

    this.register = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.maxLength(11),Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]],
   })

    if (this.langId == '1'){
      this.Continue = "متابعة"
      this.CustomerMobile = "رقم العميل"
      this.CustomerMobileplace = "ادخل رقم هاتف العميل"
    }else {
      this.Continue = "Continue"
      this.CustomerMobile = "Customer Mobile"
      this.CustomerMobileplace = "Enter Customer Mobile Number"
    }
  }
  

  next(){
    console.log(this.register.value)
    if(this.register.valid){
      this.router.navigateByUrl('/home')
      sessionStorage.setItem("mobileNumber", this.register.value.mobileNumber)
    }
  }

}
