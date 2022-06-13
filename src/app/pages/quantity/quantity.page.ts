import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';

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
  constructor(private navCtr: NavController , 
    private route : Router,
    private rest : RestService) { }

  ngOnInit() {

    this.langId = sessionStorage.getItem("lang")
    if (this.langId == '1') {
      this.dir = 'rtl'
      this.Back = "رجوع"
      this.Cancel = "إلغاء"
      this.addChange = "اضف الي العربة"
      this.Quantity = "العدد"
      this.price = "السعر"
      this.ingedtiont = "الاضافات"
      this.modfieres = 'المكونات'
      this.edit = "هل تريد تغير اي اضاقات"
      this.Customized = "تعديل"
    } else {
      this.dir = 'trl'
      this.Back = "Back"
      this.Cancel = "Cancel"
      this.addChange = "Add To Order"
      this.Quantity = "Quantity"
      this.price = "Price"
      this.ingedtiont = "Ingredients"
      this.modfieres = 'Modifiers '
      this.edit = "Want to Change Ingredients ?"
      this.Customized = "Customized"
    }  

    this.getData()
  }

  image;
  showOrHideMod = false
  getData(){
    this.item =  JSON.parse(sessionStorage.getItem('ModfireOfChose'))
    console.log(this.item)
    if(sessionStorage.getItem('ifModFire') == "false"){
      this.showOrHideMod = false
    }else {
      this.showOrHideMod = true
      this.modfireName = this.item.Name
      this.modfirePrice = this.item.Price
    }
    this.prdouct =  JSON.parse(sessionStorage.getItem('ProductOfChose'))
    this.nameOfItem = this.prdouct.Name
    this.itemPrice = this.prdouct.Price
    this.image = this.prdouct.Image

    if(this.item.ingridtArr.length != 0){
      this.souceName = this.item.ingridtArr[0].Name
      this.souceCount = this.item.ingridtArr[0].count
      this.soucePrice = this.item.ingridtArr[0].Price * this.item.ingridtArr[0].count
    }else {
      this.souceName = " "
      this.souceCount = " "
    }

  }

  plus(){
    // this.itemPrice = this.item.Price
    this.count = this.count + 1
    // this.itemPrice = this.itemPrice * this.count
  }

  minus(){
    if(this.count != 1){
      // this.itemPrice = this.item.Price
      this.count = this.count - 1
      // this.itemPrice = this.itemPrice * this.count
    }
  }
  goBack(){
    if(this.item.ingridtArr.length != 0){
      this.route.navigateByUrl('/add-souce')
    }else {
      this.route.navigateByUrl('/categoris')

    }
  }

  gotoMenu(){
    if(sessionStorage.getItem('ifModFire') != "false"){
      this.item.count = this.count
    }

    this.item.Prdoucts[0].count = this.count
    if(this.item.ingridtArr.length != 0){
      this.item.ingridtArr[0].count = (this.count + this.item.ingridtArr[0].count) - 1
    }
    let dumy = []
   let arrOfModfire = JSON.parse(sessionStorage.getItem('arrOfModfire'))
    if(arrOfModfire){
      arrOfModfire.push(this.item)
      sessionStorage.setItem('arrOfModfire',JSON.stringify(arrOfModfire))
    }else {
      dumy.push(this.item)
      sessionStorage.setItem('arrOfModfire',JSON.stringify(dumy))
    }
    this.rest.sendObsData('true')
    this.route.navigateByUrl('/main_menu')
    sessionStorage.removeItem('ifModFire')
  }

  cancelOrder(){
    sessionStorage.clear()
    this.route.navigateByUrl('/main_menu')
  }
}
