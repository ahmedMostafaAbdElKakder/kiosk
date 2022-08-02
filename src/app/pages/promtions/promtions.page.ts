import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promtions',
  templateUrl: './promtions.page.html',
  styleUrls: ['./promtions.page.scss'],
})
export class PromtionsPage implements OnInit {

  constructor(private rest : RestService ,  private route: Router,) { }
  langId
  promoId;
  categoris = []
  showCover: boolean = false
  arrOfModLength;
  disalbedButton = true
  Menu
  Back
  Cancel
  OrderDone
  MyOrder
  dir
  promotionsArr
  bestSelling;
  discount;
  promotions
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
    }
    this.getCategoris()
    this.ifArrOfModfier()
    this.rest.getPromtion(this.langId).subscribe((res : any) => {
      console.log(res)
      this.promotionsArr = res
    })
  }

  gotToDetails(item){
    console.log(item)
    this.rest.getPromoDetails(this.langId,item.Id).subscribe(res => {
      console.log(res)
      sessionStorage.setItem('promotions', JSON.stringify(res))
      this.route.navigateByUrl('/prom-details')

    })
  }
  getCategoris() {
    this.rest.getCategoriWithProduct(this.langId).subscribe((res: any) => {
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


  goBack() {
    this.route.navigateByUrl('/main_menu')
  }

  cancelOrder() {
    sessionStorage.clear()
    this.route.navigateByUrl('/home')
  }
  Done() {
    this.route.navigateByUrl('/review')
  }

  gotToItems(item) {
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

}
