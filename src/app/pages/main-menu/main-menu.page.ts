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
  bestSelling;
  discount;
  promotions
  Compo
  subscription2: Subscription;
  constructor(private rest: RestService,
    private route: Router,
    private navCtr: NavController) { }

  ngOnInit() {

  
    this.langId = localStorage.getItem('lang')
    if (this.langId == '1') {
      this.dir = "rtl"
      this.Menu = "قائمة الطلبات"
      this.Back = "رجوع"
      this.Cancel = "إلغاء الطلب"
      this.OrderDone = "دفع"
      this.MyOrder = "طلباتي - في المتجر"
      this.bestSelling = "افضل المنتجات"
      this.discount = "الخصومات"
      this.promotions = "العروض"
      this.Compo = "كومبو"
    } else {
      this.dir = "ltr"
      this.Menu = "Main Menu"
      this.Back = "Back"
      this.Cancel = "Cancel Order"
      this.OrderDone = "Done"
      this.MyOrder = "My Order - In Shop"
      this.bestSelling = "Best Selling"
      this.discount = "Discount"
      this.promotions ="Promotion"
      this.Compo = "Combo"
    }
    this.getCategoris()
    this.ifArrOfModfier()

    this.subscription = this.rest.getObsData().subscribe(res => {
      if (res == 'true') {
        console.log("true")
        this.getCategoris()
        this.ifArrOfModfier()
      } else {
        console.log("false")
        this.getCategoris()
        this.ifArrOfModfier()
      }
    })
  }

  getCategoris() {
    this.rest.getCategoriWithProduct(this.langId).subscribe((res: any) => {
      console.log(res)
      if(res.StatusId == 3){
        this.categoris = res.categoriesProducts
        for (let i = 0; i < this.categoris.length; i++) {
          if (i == 1 || i == 4 || i == 7 || i == 10) {
            this.categoris[i].status = true
          } else {
            this.categoris[i].status = false
          }
        }
      }else if (res.StatusId == 5){
        this.route.navigateByUrl('/get-breanch')
        this.rest.sendStatusOfBranch("5")
      }else if (res.StatusId == 4) {
        this.route.navigateByUrl('/get-breanch')
        this.rest.sendStatusOfBranch("4")
      }

    })
  }

  gotToSugg() {
    this.route.navigateByUrl('/suggestions')
  }

  ifArrOfModfier() {
    let arrOfMod = JSON.parse(sessionStorage.getItem('arrOfModfire'))

    if (arrOfMod) {
      this.disalbedButton = false
      if (this.langId == '1') {
        this.arrOfModLength = "إجمالي المنتجات" + " " + `(${arrOfMod.length})`
      } else {
        this.arrOfModLength = "Total Items" + " " + `(${arrOfMod.length})`
      }
    } else {
      this.disalbedButton = true
      if (this.langId == '1') {
        this.arrOfModLength = "لا يوجد طلبات"
      } else {
        this.arrOfModLength = "You Order is Empty"

      }
    }

  }


  gotToDetails(item) {
    if (item == 'Discount') {
      this.rest.gitDiscount(this.langId).subscribe((res: any) => {
        console.log(res)
        let obj = {
          Name : 'Discount',
          Products : res
        }
        sessionStorage.setItem('obj', JSON.stringify(obj))
        this.route.navigateByUrl('/discount')

      })
  
    } else {
      sessionStorage.setItem('obj', JSON.stringify(item))
      this.route.navigateByUrl('/categoris')
    }

  }

  goBack() {
    this.route.navigateByUrl('/home')
  }

  cancelOrder() {
    this.rest.sendObsData('true')
    sessionStorage.clear()
    this.route.navigateByUrl('/home')
  }
  Done() {
    this.route.navigateByUrl('/review')
  }
}
