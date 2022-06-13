import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  item
  nameOfProduct;
  priceOfProdct = 0
  count = 1
  souceName;
  souceCount = 0
  soucePrice = 0
  prdouct
  modfireName;
  modfirePrice = 0;
  modfireCount
  langId
  Suggestions
  Back
  Thanks
  Cancel
  CheckOut
  Total
  reviewMyOrder ;
  Remove;
  Edit
  dir
  totalPrice
  showOrHideMod = false
  constructor(private navCtr: NavController , 
    private route : Router,
    private rest : RestService) { }

  ngOnInit() {
    this.langId =  sessionStorage.getItem("lang")
    if(this.langId == '1'){
      this.Suggestions = "الاقتراحات"
      this.Back = "رجوع"
      this.Cancel = "إلغاء"
      this.CheckOut = "استكمال عملية الدفع"
      this.Total = "الأجمالي"
      this.reviewMyOrder = "قم بمراجعة طلبك"
      this.Edit = "تعديل"
      this.Remove = "إلغاء"
      this.dir = "rtl"
    }else {
      this.Suggestions = 'Suggestions'
      this.Back= "Back"
      this.Cancel = "Cancel"
      this.CheckOut = "Proced to check out"
      this.Total = "Total"
      this.reviewMyOrder = "Review my Eat in order"
      this.Edit = "Edit"
      this.Remove = "Remove"
      this.dir = "ltr"
    }
    this.getData()
  }

  getData() {
    this.item = JSON.parse(sessionStorage.getItem('arrOfModfire'))
    console.log(this.item)

    for (let i = 0; i < this.item.length; i++){

      if(this.item[i].ingridtArr.length != 0){
        for(let j = 0; j < this.item[i].ingridtArr.length ; j++){
          this.soucePrice = this.soucePrice + (this.item[i].ingridtArr[j].Price * this.item[i].ingridtArr[j].count)
        }
      }else {
        this.soucePrice = this.soucePrice + 0
      }

      for(let q = 0; q < this.item[i].Prdoucts.length ; q++){
        this.priceOfProdct = this.priceOfProdct + (this.item[i].Prdoucts[q].Price * this.item[i].Prdoucts[q].count)
      }

      if(this.item[i].Name){
        this.item[i].ifMode = false
        this.modfirePrice = this.modfirePrice + (this.item[i].Price * this.item[i].count)
        console.log(this.item[i].count)
      }else{
        console.log("out")
        this.modfirePrice = this.modfirePrice + 0
        this.item[i].ifMode = true
      }
    }

    this.totalPrice = this.soucePrice + this.modfirePrice + this.priceOfProdct
    console.log(this.soucePrice , this.modfirePrice , this.priceOfProdct)
  }
  minus(item) {
    console.log(item)
    if (item.Prdoucts[0].count > 1) {
      item.count = item.count - 1
      if(item.ifMode != true){
        this.modfirePrice = this.modfirePrice - item.Price
      }else {
        this.modfirePrice = 0
      }
      item.Prdoucts[0].count = item.Prdoucts[0].count - 1
      this.priceOfProdct =  this.priceOfProdct - item.Prdoucts[0].Price
      if(item.ingridtArr.length != 0){
        for(let i = 0 ; i < item.ingridtArr.length ; i++){
          item.ingridtArr[i].count = item.ingridtArr[i].count - 1
          this.soucePrice = this.soucePrice - item.ingridtArr[i].Price
        }
      }
      this.totalPrice = this.soucePrice + this.modfirePrice + this.priceOfProdct
    }
  }
  plus(item) {
    console.log(item)
    if(item.ifMode != true){
      this.modfirePrice = this.modfirePrice + item.Price
      item.count = item.count + 1
    }else {
      this.modfirePrice = 0
    }
    item.Prdoucts[0].count = item.Prdoucts[0].count + 1
    this.priceOfProdct =  this.priceOfProdct + item.Prdoucts[0].Price
    if(item.ingridtArr.length != 0){
      for(let i = 0 ; i < item.ingridtArr.length ; i++){
        item.ingridtArr[i].count = item.ingridtArr[i].count + 1
        this.soucePrice = this.soucePrice + item.ingridtArr[i].Price
      }
    }
    console.log(this.soucePrice , this.modfirePrice ,this.priceOfProdct)
    this.totalPrice = this.soucePrice + this.modfirePrice + this.priceOfProdct
  }
  goBack() {
    this.route.navigateByUrl('/main_menu')
  }

  cancel() {
    this.route.navigateByUrl('/home')
    sessionStorage.clear()
  }

  goToCheckOut() {
    let productArr = []
    let ingrdtion = []
    let modfiersArr = []

    for (let i = 0; i < this.item.length; i++) {
      for (let j = 0; j < this.item[i].ingridtArr.length; j++) {
        ingrdtion.push({
          "Id": this.item[i].ingridtArr[j].Id,
          "Price": this.item[i].ingridtArr[j].Price * this.item[i].ingridtArr[j].count,
          "Count": this.item[i].ingridtArr[j].count
        })
      }
      if(this.item[i].Name){
        modfiersArr.push({
          "Id": this.item[i].Id,
          "Price": this.item[i].Price * this.item[i].count,
          "Count": this.item[i].count
        })
      }else {
        modfiersArr = []
      }

    }
    for (let i = 0; i < this.item.length; i++) { 
      for (let q = 0; q < this.item[i].Prdoucts.length; q++) {
        productArr.push({
          "Id": this.item[i].Prdoucts[q].Id,
          "Price": this.item[i].Prdoucts[q].Price * this.item[i].Prdoucts[q].count,
          "Count": this.item[i].Prdoucts[q].count
        })
      }
    }

   
    let obj = {
      'BranchId': 1,
      "PaymentTypeId": 2,
      "totalPrice": this.totalPrice,
      'Products':productArr,
      'Modifires': modfiersArr,
      'Ingredients': ingrdtion
    }
    console.log(obj)
     sessionStorage.setItem('finalObj',JSON.stringify(obj))
    this.route.navigateByUrl('/payment')

  }

  shwoProced = true
  removeItem(i , product){
    this.item.splice(i, 1)
    sessionStorage.setItem('arrOfModfire',JSON.stringify(this.item))
    console.log(product)
    let souceCount = 0 
    let itemPrice = 0 
    if(product.ifMode == true){
      itemPrice = product.Prdoucts[0].Price * product.Prdoucts[0].count
    }else {
      itemPrice = (product.Price * product.count) + (product.Prdoucts[0].Price * product.Prdoucts[0].count)
    }
    if(product.ingridtArr.length != 0){
      for(let i = 0 ; i < product.ingridtArr.length ; i ++){
        souceCount = souceCount + (product.ingridtArr[i].Price * product.ingridtArr[i].count)
      }
    }else {
      souceCount = 0
    }

    this.totalPrice = this.totalPrice - (itemPrice + souceCount)
    console.log(itemPrice)

    if(this.item.length == 0){
      this.shwoProced = false
    }else {
      this.shwoProced = true
    }
    
  }

  edit(idOfEdit){
    // sessionStorage.setItem('idOfEdit',idOfEdit)
    this.route.navigateByUrl('/add-souce')
  }
}
