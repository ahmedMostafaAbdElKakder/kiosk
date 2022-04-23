import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
 obj
 langId
 Back
 selectPayment
 Counter
 Here
  constructor(private rest : RestService , private route : Router) { }

  ngOnInit() {
    this.langId =  sessionStorage.getItem("lang")
     this.obj = JSON.parse(sessionStorage.getItem('finalObj'))
    console.log(this.obj)
    if(this.langId == '1'){
      this.Back = "رجوع"
      this.selectPayment = "من فضلك اختر طريقة الدفع"
      this.Counter = "كاشير"
      this.Here = "هنا"

    }else {
      this.Back = "Back"
      this.selectPayment = "please select payment type"
      this.Counter = "At Counter"
      this.Here = "Here"
    }
  }

  pay(){
    this.rest.checkOut(this.obj).subscribe((res : any) => {
      console.log(res)
      sessionStorage.setItem("numberOfOrder",res)
      this.route.navigateByUrl('/order-number')
    })
  }

  goBack(){
    this.route.navigateByUrl('/review')
  }

}
