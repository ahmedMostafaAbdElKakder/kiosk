import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.page.html',
  styleUrls: ['./quantity.page.scss'],
})
export class QuantityPage implements OnInit {
  item
  nameOfItem
  itemPrice
  count = 1
  souceName;
  souceCount
  prdouct
  modfireName;
  modfirePrice;
  soucePrice
  langId
  Back
  Cancel
  addChange
  Quantity
  dir
  price
  ingedtiont;
  modfieres
  edit;
  Customized
  arrayOfIngr
  LE
  constructor(private navCtr: NavController,
    private location: Location,
    private route: Router,
    private rest: RestService) { }

  ngOnInit() {

    this.langId = localStorage.getItem("lang")
    if (this.langId == '1') {
      this.dir = 'rtl'
      this.Back = "رجوع"
      this.Cancel = "إلغاء"
      this.addChange = "متابعة"
      this.Quantity = "العدد"
      this.price = "السعر"
      this.ingedtiont = "الاضافات"
      this.modfieres = 'المكونات'
      this.edit = "هل تريد تغير اي إضافات"
      this.Customized = "تعديل"
      this.LE = "جنيه"
    } else {
      this.dir = 'ltr'
      this.Back = "Back"
      this.Cancel = "Cancel"
      this.addChange = "continue"
      this.Quantity = "Quantity"
      this.price = "Price"
      this.ingedtiont = "Ingredients"
      this.modfieres = 'Modifiers '
      this.edit = "Want to Change Ingredients ?"
      this.Customized = "Customized"
      this.LE = "LE"
    }

    this.getData()
  }

  image;
  showOrHideMod = false
  modfiresArr
  getData() {
    this.item = JSON.parse(sessionStorage.getItem('ModfireOfChose'))
    console.log(this.item)
    // if(!this.item.Name){
    //   this.showOrHideMod = false
    // }else {
    //   this.showOrHideMod = true
    //   this.modfireName = this.item.Name
    //   this.modfirePrice = this.item.Price
    //   console.log(this.modfireName,this.modfirePrice)
    // }
    this.prdouct = JSON.parse(sessionStorage.getItem('ProductOfChose'))
    this.nameOfItem = this.prdouct.Name
    if(this.prdouct.NewPrice == 0){
      this.itemPrice = this.prdouct.Price
    }else {
      this.itemPrice = this.prdouct.NewPrice
    }
    
    this.image = this.prdouct.Image

    this.modfiresArr = this.item.modfire

    if (this.item.ingridtArr.length != 0) {
      this.arrayOfIngr = this.item.ingridtArr
      this.souceName = this.item.ingridtArr[0].Name
      this.souceCount = this.item.ingridtArr[0].count
      this.soucePrice = this.item.ingridtArr[0].Price * this.item.ingridtArr[0].count
      console.log(this.souceName, this.souceCount, this.soucePrice)
    } else {
      this.souceName = " "
      this.souceCount = " "
    }


  }

  plus() {
    // this.itemPrice = this.item.Price
    this.count = this.count + 1
    // this.itemPrice = this.itemPrice * this.count
  }

  minus() {
    if (this.count != 1) {
      // this.itemPrice = this.item.Price
      this.count = this.count - 1
      // this.itemPrice = this.itemPrice * this.count
    }
  }
  goBack() {
    this.location.back();
    // if(this.item.ingridtArr.length != 0){
    //   this.route.navigateByUrl('/add-souce')
    // }else {
    //   this.route.navigateByUrl('/categoris')

    // }
  }

  // gotoMenu(){

  //   console.log(this.item)
  //   this.item.Prdoucts[0].count = this.count

  //   if(this.item.ingridtArr.length != 0){
  //     for(let i = 0 ;  i < this.item.ingridtArr.length ; i++){
  //       this.item.ingridtArr[i].count = this.item.ingridtArr[i].count * this.count
  //     }
  //   }
  //   if(this.item.modfire.length != 0){
  //     for(let i = 0 ;  i < this.item.modfire.length ; i++){
  //       this.item.modfire[i].count = this.item.modfire[i].count * this.count
  //     }
  //   }

  //   let dumy = []
  //  let arrOfModfire = JSON.parse(sessionStorage.getItem('arrOfModfire'))
  //   if(arrOfModfire){
  //     arrOfModfire.push(this.item)
  //     sessionStorage.setItem('arrOfModfire',JSON.stringify(arrOfModfire))
  //   }else {
  //     dumy.push(this.item)
  //     sessionStorage.setItem('arrOfModfire',JSON.stringify(dumy))
  //   }
  //   this.rest.sendObsData('true')
  //   this.route.navigateByUrl('/main_menu')
  //   sessionStorage.removeItem('ifModFire')
  // }

  gotoCustmoize() {
    let modfireArrInsession = JSON.parse(sessionStorage.getItem('modfiresArr'))
    let ingrdArrInsession = JSON.parse(sessionStorage.getItem('IngrdDub'))

    if (ingrdArrInsession.length == 0 && modfireArrInsession.length == 0) {
      this.item.Prdoucts[0].count = this.count
      let arrOfModfire = JSON.parse(sessionStorage.getItem('arrOfModfire'))
      if (arrOfModfire) {
        arrOfModfire.push(this.item)
        sessionStorage.setItem('arrOfModfire', JSON.stringify(arrOfModfire))
      } else {
        let dumy = []
        dumy.push(this.item)
        sessionStorage.setItem('arrOfModfire', JSON.stringify(dumy))
      }
      this.rest.sendObsData('true')
      this.route.navigateByUrl('/main_menu')
      sessionStorage.removeItem('ifModFire')
    } else {

      sessionStorage.setItem("countOfProduct", this.count + "")
      this.route.navigateByUrl('/customize')
    }
  }

  cancelOrder() {
    sessionStorage.clear()
    this.route.navigateByUrl('/main_menu')
  }
}
