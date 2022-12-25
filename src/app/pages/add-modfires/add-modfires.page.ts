import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-add-modfires',
  templateUrl: './add-modfires.page.html',
  styleUrls: ['./add-modfires.page.scss'],
})
export class AddModfiresPage implements OnInit {

  productImage
  item
  nameOfItem
  itemPrice;
  arrOfSouces = []
  prdouct
  prdouctName;
  productPrice
  langId
  Back
  Cancel
  addChange
  dir
  ingrdtiont;
  LE
  
  constructor(private rest: RestService
    ,private location: Location,
    private route: Router) { }

  ngOnInit() {
    this.langId = localStorage.getItem("lang")
    if (this.langId == '1') {
      this.dir = 'rtl'
      this.Back = "رجوع"
      this.Cancel = "إلغاء"
      this.addChange = "اضف المكونات"
      this.ingrdtiont = "الإضافات"
      this.LE = "جنيه"
    } else {
      this.dir = 'ltr'
      this.Back = "Back"
      this.Cancel = "Cancel"
      this.addChange = "Apply Changes"
      this.ingrdtiont = "Modifiers"
      this.LE = "LE"
    }
    this.getData()
  }

  getData() {
    this.item = JSON.parse(sessionStorage.getItem('modfiresArr'))
    this.prdouct = JSON.parse(sessionStorage.getItem('ProductOfChose'))
    this.prdouctName = this.prdouct.Name
    this.productPrice = this.prdouct.Price
    this.productImage = this.prdouct.Image
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].count = 0
    }
    this.arrOfSouces = this.item

  }

  goCheckOut() {
    let products = JSON.parse(sessionStorage.getItem('ProductOfChose'))
    let modfire = []
    let finalPrdouct:any = {}
    for (let i = 0; i < this.arrOfSouces.length; i++) {
      if (this.arrOfSouces[i].count != 0) {
        modfire.push(this.arrOfSouces[i])
      }
    }
    finalPrdouct.modfire = modfire
    finalPrdouct.Prdoucts = [products]
    this.rest.GetItemsbyProductId(this.langId,this.prdouct.Id).subscribe((res : any) => {
      if(res.length != 0){
        console.log(res)
        sessionStorage.setItem('IngrdDub', JSON.stringify(res))
        sessionStorage.setItem('ModfireOfChose', JSON.stringify(finalPrdouct))
        this.route.navigateByUrl('/add-souce')
      }else {
        finalPrdouct.ingridtArr = []
        sessionStorage.setItem('ModfireOfChose', JSON.stringify(finalPrdouct))
        this.route.navigateByUrl('/quantity')
      }
    })
    // sessionStorage.setItem('ModfireOfChose', JSON.stringify(finalPrdouct))
    // this.route.navigateByUrl('/add-souce')
  }

  goBack() {
    this.location.back();
  }

  minus(item) {
    if (item.count > 0) {
      item.count = item.count - 1
    }
  }
  plus(item) {
    item.count = item.count + 1
  }
}
