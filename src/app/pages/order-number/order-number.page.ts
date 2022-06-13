import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.page.html',
  styleUrls: ['./order-number.page.scss'],
})
export class OrderNumberPage implements OnInit {
  orderNumber 
  OrderDone
  langId
  title
  constructor(private navCtr: NavController ,
    private route : Router,
     private rest : RestService) { }

  ngOnInit() {
    this.langId =  sessionStorage.getItem("lang")
    this.orderNumber = sessionStorage.getItem('numberOfOrder')
    if(this.langId == '1'){
      this.OrderDone = "الرئيسية"
      this.title = "رقم الطلب"
    }else {
      this.title = "Your Order Number is"
      this.OrderDone = "Go Home"
    }
  }

  Done(){
    this.route.navigateByUrl('/')
    sessionStorage.clear()
    sessionStorage.setItem('status','false')
    this.rest.sendObsData("false")
  }

}
