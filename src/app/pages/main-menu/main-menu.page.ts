import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  categoris = []
  showCover: boolean = false
  arrOfModLength;
  disalbedButton = true
  langId
  subscription: Subscription;
  Menu
  Back
  Cancel
  OrderDone
  MyOrder
  dir
  constructor(private rest: RestService,
    private route :Router,
     private navCtr: NavController) { }

  ngOnInit() {
    this.langId = sessionStorage.getItem('lang')
    if(this.langId == '1'){
      this.dir = "rtl"
      this.Menu = "قائمة الطلبات"
      this.Back = "رجوع"
      this.Cancel = "إلغاء الطلب"
      this.OrderDone = "دفع"
      this.MyOrder = "طلباتي - في المتجر"
    }else {
      this.dir = "ltr"
      this.Menu = "Main Menu"
      this.Back = "Back"
      this.Cancel = "Cancel Order"
      this.OrderDone = "Done"
      this.MyOrder = "My Order - In Shop"
    }
    this.getCategoris()
    this.ifArrOfModfier()

    this.subscription = this.rest.getObsData().subscribe(res => {
      if(res == 'true'){
        console.log("true")
        this.getCategoris()
        this.ifArrOfModfier()
      }else{
        console.log("false")
        this.getCategoris()
        this.ifArrOfModfier()
      }
    })
  }

  getCategoris() {
    this.rest.getCategoriWithProduct().subscribe((res: any) => {
      console.log(res)
      this.categoris = res
      for (let i = 0; i < this.categoris.length; i++) {
        if (i == 1 || i == 4 || i == 7 || i == 10) {
          this.categoris[i].status = true
        } else {
          this.categoris[i].status = false
        }
      }
    })
  }

  gotToSugg(){
    this.route.navigateByUrl('/suggestions')
  }

  ifArrOfModfier(){
    let arrOfMod = JSON.parse(sessionStorage.getItem('arrOfModfire'))

    if(arrOfMod){
      this.disalbedButton = false
      this.arrOfModLength = "Total Items"  + " " + `(${arrOfMod.length})`
    }else{
      this.disalbedButton = true
      if(this.langId == '1'){
        this.arrOfModLength = "لا يوجد طلبات"
      }else {
        this.arrOfModLength = "You Order is Empty"

      }
    }

  }


  gotToDetails(item) {
    sessionStorage.setItem('obj', JSON.stringify(item))
    this.route.navigateByUrl('/categoris')
  }

  goBack() {
    this.route.navigateByUrl('/home')
  }

  cancelOrder(){
    sessionStorage.clear()
    this.route.navigateByUrl('/home')
  }
  Done(){
    this.route.navigateByUrl('/review')
  }
}
