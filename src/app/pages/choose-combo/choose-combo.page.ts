import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-combo',
  templateUrl: './choose-combo.page.html',
  styleUrls: ['./choose-combo.page.scss'],
})
export class ChooseComboPage implements OnInit {
  langId
  Back
  dir
  products = []
  Menu
  categoris
  categoriObj;
  nameOfCat;
  items = []
  showModfire = false
  ModifiresbyProductId = []
  disalbedButton = true
  arrOfModLength
  Cancel
  OrderDone
  MyOrder
  Modfires
  Next
  bestSelling;
  discount;
  promotions
  LE
  combo
  constructor(private rest : RestService , private route: Router) { }

  ngOnInit() {
    this.langId = localStorage.getItem('lang')
    if (this.langId == '1') {
      this.dir = "rtl"
      this.Menu = "قائمة الطلبات"
      this.Back = "رجوع"
      this.Cancel = "إلغاء الطلب"
      this.OrderDone = "دفع"
      this.MyOrder = "طلباتي - في المتجر"
      this.Modfires = "الاضافات"
      this.Next = "التالي"
      this.bestSelling = "افضل المنتجات"
      this.discount = "الخصومات"
      this.promotions = "العروض"
      this.LE = "جنيه"
      this.combo = "كومبو"

    } else {
      this.dir = "ltr"
      this.Menu = "Main Menu"
      this.Back = "Back"
      this.Cancel = "Cancel Order"
      this.OrderDone = "Done"
      this.MyOrder = "My Order - In Shop"
      this.Modfires = "Modifiers"
      this.Next = "Next"
      this.bestSelling = "Best Selling"
      this.discount = "Discount"
      this.promotions = "Promotion"
      this.LE = "LE"
      this.combo = "combo"
    }
    // this.getData()
    this.getCategoris()
    this.getCommbo()
     this.ifArrOfModfier()
     this.getDatas()

  }

  getDatas(){
    let id = sessionStorage.getItem('comboId')
    this.rest.comboDetails(id,this.langId).subscribe((res :any) => {
      console.log("dasds",res)
      this.products = res
      for(let i = 0 ; this.products.length; i++){
        if(this.products[i].image == ""){
          this.products[i].image = "assets/images/kiosk.png"
        }
      }
     
    })
  }

  goToProd(item){

    this.route.navigateByUrl("/compo-details")
    sessionStorage.setItem('productOfCombo', JSON.stringify(item))
    console.log(item)
  }

  goBack(){
    this.route.navigateByUrl('/compo')
  }

  getCommbo(){
    this.rest.combo(this.langId).subscribe((res : any) => {
      console.log("combo",res)
      this.items = res
    })
  }
  getCategoris() {
    this.rest.getCategoriWithProduct(this.langId).subscribe((res: any) => {
      console.log(res)
      this.categoris = res.categoriesProducts
      for (let i = 0; i < this.categoris.length; i++) {
        if (i == 2 || i == 5 || i == 8 || i == 11) {
          this.categoris[i].status = true
        } else {
          this.categoris[i].status = false
        }
      }
    })
  }

  getData() {
    this.categoriObj = JSON.parse(sessionStorage.getItem('obj'))
    console.log(this.categoriObj)
    this.nameOfCat = this.categoriObj.Name
    // this.items = this.categoriObj.Products
    for (let i = 0; i < this.items.length; i++) {
      if (i == 2 || i == 5 || i == 8 || i == 11) {
        this.items[i].status = true
      } else {
        this.items[i].status = false
      }
    }
  }

  idOfIngrdtiont;
  GetModifiresbyProductId(item, id) {
    this.idOfIngrdtiont = id
    sessionStorage.setItem('ProductOfChose', JSON.stringify(item))
    this.price = item.Price
    this.rest.GetModifiresbyProductId(id, this.langId).subscribe((res: any) => {
      console.log(res)
      if (res.length != 0) {
        sessionStorage.setItem('modfiresArr', JSON.stringify(res))
        this.route.navigateByUrl('/add-modfires')
      } else {
        this.rest.GetItemsbyProductId(this.langId, id).subscribe((res: any) => {
          if (res.length == 0) {
            let products = JSON.parse(sessionStorage.getItem('ProductOfChose'))
            console.log("hamdaaaa")
            let item: any = {}
            item.ingridtArr = []
            item.Prdoucts = [products]
            item.modfire = []
            sessionStorage.setItem('ModfireOfChose', JSON.stringify(item))
            this.route.navigateByUrl('/quantity')
          } else {
            this.gotToDetails('normal')
          }
        })
      }
    })
  }
  close() {
    this.showModfire = false
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
    if (item == "normal") {
      let products = JSON.parse(sessionStorage.getItem('ProductOfChose'))
      this.rest.GetItemsbyProductId(this.langId, this.idOfIngrdtiont).subscribe((res: any) => {
        if (res.length == 0) {
          let item: any = {}
          item.ingridtArr = []
          item.Prdoucts = [products]
          item.modfire = []
          sessionStorage.setItem('ModfireOfChose', JSON.stringify(item))
          this.route.navigateByUrl('/quantity')
        } else {
          let item: any = {}
          item.Prdoucts = [products]
          item.modfire = []
          sessionStorage.setItem('ModfireOfChose', JSON.stringify(item))
          this.route.navigateByUrl('/add-souce')
        }
      })
  
      sessionStorage.setItem("ifModFire", 'false')
    } else if (item == 'Discount') {
      this.rest.gitDiscount(this.langId).subscribe((res: any) => {
        console.log(res)
        let obj = {
          Name: 'Discount',
          Products: res
        }
        sessionStorage.setItem('obj', JSON.stringify(obj))
        this.route.navigateByUrl('/discount')
      })
    }
    else {
      console.log("asdasdsa", item)
      this.rest.GetItemsbyProductId(this.langId, this.idOfIngrdtiont).subscribe((res: any) => {
        if (res.length == 0) {
          let products = JSON.parse(sessionStorage.getItem('ProductOfChose'))
          item.ingridtArr = []
          item.Prdoucts = [products]
          sessionStorage.setItem('ModfireOfChose', JSON.stringify(item))
          this.route.navigateByUrl('/quantity')
        } else {
          sessionStorage.setItem('ModfireOfChose', JSON.stringify(item))

          this.route.navigateByUrl('/add-souce')
        }
      })
    }

  }
  prdouct
  price
  ChoseCategori(item) {
    sessionStorage.setItem('obj', JSON.stringify(item))
    this.route.navigateByUrl('/categoris')
  }

  cancelOrder() {
    sessionStorage.clear()
    this.route.navigateByUrl('/suggestions')
  }
  Done() {
    this.route.navigateByUrl('/review')
  }

  goTocomboDetails(id){
    sessionStorage.setItem("comboId",id)
    this.route.navigateByUrl("/choose-combo")
  }

}
