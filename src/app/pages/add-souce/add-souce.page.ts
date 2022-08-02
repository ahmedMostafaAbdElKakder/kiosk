import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-souce',
  templateUrl: './add-souce.page.html',
  styleUrls: ['./add-souce.page.scss'],
})
export class AddSoucePage implements OnInit {
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
  constructor(private rest: RestService,
    private route: Router,
    private navCtr: NavController) { }

  ngOnInit() {
    this.langId = localStorage.getItem("lang")
    if (this.langId == '1') {
      this.dir = 'rtl'
      this.Back = "رجوع"
      this.Cancel = "إلغاء"
      this.addChange = "اضف المتغيرات"
      this.ingrdtiont = "الاضافات"
      this.LE = "جنيه"
    } else {
      this.dir = 'ltr'
      this.Back = "Back"
      this.Cancel = "Cancel"
      this.addChange = "Apply Changes"
      this.ingrdtiont = "Ingredients"
      this.LE = "LE"
    }
    this.getData()
  }


productImage
  getData() {
    this.item = JSON.parse(sessionStorage.getItem('ModfireOfChose'))
    let mod =  sessionStorage.getItem('ifModFire')
    if(mod == 'false'){
      this.item.Modfire = []
      console.log("true")
    }
    this.prdouct = JSON.parse(sessionStorage.getItem('ProductOfChose'))
    this.prdouctName = this.prdouct.Name
    this.productPrice = this.prdouct.Price
    this.productImage = this.prdouct.Image
    this.rest.GetItemsbyProductId(this.langId,this.prdouct.Id).subscribe((res: any) => {
      console.log(res)
      if(res.length != 0){
        this.arrOfSouces = res
        for (let i = 0; i < this.arrOfSouces.length; i++) {
          this.arrOfSouces[i].count = 0
        }
      }else {
        console.log(res.length)
        let products = JSON.parse(sessionStorage.getItem('ProductOfChose'))
        this.item.ingridtArr = []
        this.item.Prdoucts = [products]
        sessionStorage.setItem('ModfireOfChose', JSON.stringify(this.item))
        this.route.navigateByUrl('/quantity')
      }

    })
  }

  goCheckOut() {
    let products = JSON.parse(sessionStorage.getItem('ProductOfChose'))
    let ingridtArr = []
    if (this.arrOfSouces.length != 0) {
      for (let i = 0; i < this.arrOfSouces.length; i++) {
        if (this.arrOfSouces[i].count != 0) {
          ingridtArr.push(this.arrOfSouces[i])
        }
      }
      console.log("inas",this.item)
      this.item.ingridtArr = ingridtArr
      this.item.Prdoucts = [products]
      sessionStorage.setItem('ModfireOfChose', JSON.stringify(this.item))
      this.route.navigateByUrl('/quantity')
    } else {
      this.item.ingridtArr = []
      this.item.Prdoucts = [products]
      sessionStorage.setItem('ModfireOfChose', JSON.stringify(this.item))
      this.route.navigateByUrl('/quantity')
      
    }

  }

  goBack() {
    this.route.navigateByUrl('/categoris')
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
