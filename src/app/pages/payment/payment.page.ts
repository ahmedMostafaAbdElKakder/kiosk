import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

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
  giftId
  constructor(private rest: RestService,
    public printer: Printer,
    private route: Router) { }

  ngOnInit() {
    this.langId = localStorage.getItem("lang")
    this.giftId = sessionStorage.getItem("idOfSerial")
    this.obj = JSON.parse(sessionStorage.getItem('finalObj'))
    console.log(this.obj)
    if (this.langId == '1') {
      this.Back = "رجوع"
      this.selectPayment = "من فضلك اختر طريقة الدفع"
      this.Counter = "كاشير"
      this.Here = "هنا"

    } else {
      this.Back = "Back"
      this.selectPayment = "Please select payment type"
      this.Counter = "At Counter"
      this.Here = "Here"
    }
  }

  pay() {
    this.rest.checkOut(this.obj).subscribe((res: any) => {
      console.log(res)
      sessionStorage.setItem("numberOfOrder", res)

      this.rest.activeSerial(this.giftId , res).subscribe(res => {
        console.log(res)
      })
      this.route.navigateByUrl('/order-number')
    })
  }

  goBack() {
    this.route.navigateByUrl('/review')
  }

  print() {
    this.printer.isAvailable().then((onSuccess: any) => {
      let content = document.getElementById('printer').innerHTML;
      let options: PrintOptions = {
        name: 'MyDocument',
        duplex: true,
        orientation: "portrait",
        monochrome: true,
      };
      this.printer.print(content, options).then((value: any) => {
        console.log('value:', value);
      }, (error) => {
        console.log('eror:', error);
      });
    }, (err) => {
      console.log('err:', err);
    });
  }


}
