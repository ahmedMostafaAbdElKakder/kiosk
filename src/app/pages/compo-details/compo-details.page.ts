import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-compo-details',
  templateUrl: './compo-details.page.html',
  styleUrls: ['./compo-details.page.scss'],
})
export class CompoDetailsPage implements OnInit {
  langId
  dir
  name
  desc
  image
  arrayOfProducts
  Cancel
  addChange
  LE
  Back
  arrOfProductSize = []
  SelectSize
  count = 0
  ifCount = false
  comboName
  constructor(private rest: RestService
    , private location: Location,
    private route: Router, ) { }

  ngOnInit() {
    this.langId = localStorage.getItem('lang')
    this.comboName = sessionStorage.getItem("comboName")
    if (this.langId == '1') {
      this.dir = "rtl"
      this.Back = "رجوع"
      this.Cancel = "إلغاء"
      this.addChange = "اضف الي العربة"
      this.LE = "جنيه"
      this.SelectSize = "اختر الحجم"
    } else {
      this.Back = "Back"
      this.dir = "ltr"
      this.Cancel = "Cancel"
      this.addChange = "Add To Order"
      this.LE = "LE"
      this.SelectSize = "Select Size"

    }
    this.getDetailsOfCombo()
  }

  objOfCombo
  getDetailsOfCombo() {
    this.objOfCombo = JSON.parse(sessionStorage.getItem('productOfCombo'))
    console.log(this.objOfCombo)
    let id = sessionStorage.getItem('comboId')

    let totalPrice = 0
    if (this.objOfCombo.SizeProductsLst.length != 0) {
      this.name = this.objOfCombo.Name
      this.desc = this.objOfCombo.description
      this.image = this.objOfCombo.image
      if (this.image == "") {
        this.image = "assets/images/kiosk.png"
      }
      this.arrayOfProducts = this.objOfCombo.SizeProductsLst
      for (let i = 0; i < this.arrayOfProducts.length; i++) {
        totalPrice = 0
        for (let j = 0; j < this.arrayOfProducts[i].products.length; j++) {
          totalPrice = totalPrice + this.arrayOfProducts[i].products[j].Price
          this.arrayOfProducts[i].count = 0
        }
        this.arrayOfProducts[i].totalPrice = totalPrice
        this.arrayOfProducts[i].status = false
      }
    }

  }

  getItem(item) {
    for (let i = 0; i < this.arrayOfProducts.length; i++) {
      this.arrayOfProducts[i].status = false
    }
    item.status = true
    this.arrOfProductSize = []
    let arrOfProd = []
    for (let i = 0; i < item.products.length; i++) {
      arrOfProd.push(
        {
          Id: item.products[i].Id,
          Name: item.products[i].Name,
          Price: item.products[i].Price,
          count: this.count,
          status: false
        }
      )
    }
    let obj = {
      ingridtArr: [],
      modfire: [],
      Prdoucts: arrOfProd
    }

    this.arrOfProductSize.push(obj)


    console.log(item)

  }

  plus(item) {
    this.ifCount = true
    item.count = item.count + 1

    for (let i = 0; i < item.products.length; i++) {
      item.products[i].count = item.count
    }
    console.log(this.arrayOfProducts)
  }
  minus(item) {
    this.ifCount = true
    if (item.count > 1) {
      item.count = item.count - 1
      for (let i = 0; i < item.products.length; i++) {
        item.products[i].count = item.count
      }
    }
  }

  addOrder() {
    let arrOfProd = []
    let arrOfObj = []
    for (let i = 0; i < this.arrayOfProducts.length; i++) {
      arrOfProd = []
      if (this.arrayOfProducts[i].count != 0) {
        for (let j = 0; j < this.arrayOfProducts[i].products.length; j++) {
          arrOfProd.push(
            {
              Id: this.arrayOfProducts[i].products[j].Id,
              Name: this.arrayOfProducts[i].products[j].Name,
              Price: this.arrayOfProducts[i].products[j].Price,
              count: this.arrayOfProducts[i].products[j].count,
              sizeId: this.arrayOfProducts[i].sizeId,
              sizeName : this.arrayOfProducts[i].SizeName,
              compoName : this.comboName,
              parentCombo : this.objOfCombo.Name
            }
          )
        }
        let obj = {
          ingridtArr: [],
          modfire: [],
          Prdoucts: arrOfProd
        }
        arrOfObj.push(obj)
      }
    }

    console.log("arrOfProd",arrOfObj)

    let dumyarr = JSON.parse(sessionStorage.getItem('arrOfModfire'))

    if (dumyarr) {
      for (let i = 0; i < arrOfObj.length; i++) {
        dumyarr.push(arrOfObj[i])
      }
      sessionStorage.setItem('arrOfModfire', JSON.stringify(dumyarr))
    } else {
      sessionStorage.setItem('arrOfModfire', JSON.stringify(arrOfObj))
    }
    this.rest.sendObsData('true')
    this.route.navigateByUrl('/main_menu')
  }

  cancel() {
    this.route.navigateByUrl('/main_menu')
  }

  goBack() {
    this.location.back();
  }
}
