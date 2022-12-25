import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.page.html',
  styleUrls: ['./customize.page.scss'],
})
export class CustomizePage implements OnInit {

  langId
  dir
  Back
  products
  modfiresArr
  ingrdArr
  countOfProduct
  Cancel
  addChange
  myArray = []
  myArrOfItems
  Customize
  Ingredients
  Modfires
  LE
  subscription: Subscription;
  countOfProductAfter

  constructor(private route: Router , private rest : RestService) { }

  ngOnInit() {
    this.subscription = this.rest.getDataOfDub().subscribe(res => {
      if (res == 'true') {
        console.log("true")
        this.ngOnInit()
      }
    })
    this.langId = localStorage.getItem("lang")
    if (this.langId == '1') {
      this.dir = 'rtl'
      this.Back = "رجوع"
      this.addChange = "أضف الي العربة"
      this.Cancel = "إلغاء"
      this.Customize = "تعديل"
      this.Ingredients = "المكونات"
      this.Modfires = "الأضافات"
      this.LE = "جنيه"
    } else {
      this.dir = 'ltr'
      this.Back = "Back"
      this.addChange = "Add To Order"
      this.Cancel = "Cancel"
      this.Customize = "Customize"
      this.Ingredients = 'Ingredients'
      this.Modfires = "Modfires"
      this.LE = "LE"
    }
    this.products = JSON.parse(sessionStorage.getItem('ModfireOfChose'))
    this.ingrdArr = JSON.parse(sessionStorage.getItem('IngrdDub'))
    this.modfiresArr = JSON.parse(sessionStorage.getItem('modfiresArr'))
    this.countOfProduct = sessionStorage.getItem("countOfProduct")
    this.countOfProductAfter = sessionStorage.getItem("countOfProduct")
    this.countOfProductAfter =+  this.countOfProductAfter
    this.myArrOfItems = JSON.parse(sessionStorage.getItem('myArrOfItems'))
    this.countOfProduct = + this.countOfProduct - 1

    if (this.myArrOfItems) {
      if(this.myArrOfItems.length < this.countOfProductAfter){
        this.myArrOfItems.push({
          Prdoucts: [this.products.Prdoucts[0]],
          ingridtArr: [],
          modfire: [],
          id: this.myArrOfItems.length + 3
        })
        this.myArray = this.myArrOfItems
      }else {
        this.myArray = this.myArrOfItems
        
      }
    } else {
      this.products.id = 1
      this.myArray.push(this.products)
      for (let i = 0; i < this.countOfProduct; i++) {
        this.myArray.push({
          Prdoucts: [this.products.Prdoucts[0]],
          ingridtArr: [],
          modfire: [],
          id: i + 2
        })
      }
      sessionStorage.setItem('myArrOfItems', JSON.stringify(this.myArray))
    }

    console.log(this.myArray)

  }

  gotToCustomize(item) {
    console.log(item)
    this.route.navigateByUrl("edit-customiz")
    sessionStorage.setItem('itemISChange', JSON.stringify(item))
  }

  addOrder() {
    let arrOfModfire = JSON.parse(sessionStorage.getItem('arrOfModfire'))
    if (arrOfModfire) {
      for (let i = 0; i < this.myArray.length; i++) {
        this.myArray[i].Prdoucts[0].count = 1
        arrOfModfire.push(this.myArray[i])
      }

      sessionStorage.setItem('arrOfModfire', JSON.stringify(arrOfModfire))
    } else {
      for (let i = 0; i < this.myArray.length; i++) {
        this.myArray[i].Prdoucts[0].count = 1
      }
      sessionStorage.setItem('arrOfModfire', JSON.stringify(this.myArray))
    }

    this.rest.sendObsData('true')
    sessionStorage.removeItem('myArrOfItems')
    this.route.navigateByUrl('/main_menu')
    sessionStorage.removeItem('ifModFire')
  }

  goBack(){
    this.route.navigateByUrl('/quantity')
  }

  cancel(){
    this.route.navigateByUrl("/main_menu")
    sessionStorage.clear()
  }
}
