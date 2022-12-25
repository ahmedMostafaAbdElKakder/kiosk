import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-edit-customiz',
  templateUrl: './edit-customiz.page.html',
  styleUrls: ['./edit-customiz.page.scss'],
})
export class EditCustomizPage implements OnInit {

  langId
  dir: string;
  Back: string;
  addChange: string;
  Cancel: string;
  ingrdArr
  modfiresArr
  itemOfChnage
  Ingredients
  Modfires
  constructor(private route: Router, private rest: RestService) { }

  ngOnInit() {
    this.ingrdArr = JSON.parse(sessionStorage.getItem('IngrdDub'))
    this.modfiresArr = JSON.parse(sessionStorage.getItem('modfiresArr'))
    this.itemOfChnage = JSON.parse(sessionStorage.getItem('itemISChange'))
    console.log(this.itemOfChnage)
    if (this.itemOfChnage.ingridtArr.length != 0) {
      for (let j = 0; j < this.ingrdArr.length; j++) {
        this.ingrdArr[j].count = 0
      }
      for (let i = 0; i < this.itemOfChnage.ingridtArr.length; i++) {
        for (let j = 0; j < this.ingrdArr.length; j++) {
          if (this.itemOfChnage.ingridtArr[i].Id == this.ingrdArr[j].Id) {
            this.ingrdArr[j].count = this.itemOfChnage.ingridtArr[i].count
          }
        }
      }
    } else {
      for (let j = 0; j < this.ingrdArr.length; j++) {
        this.ingrdArr[j].count = 0
      }
    }

    if (this.itemOfChnage.modfire.length != 0) {
      for (let j = 0; j < this.modfiresArr.length; j++) {

        this.modfiresArr[j].count = 0
      }
      for (let i = 0; i < this.itemOfChnage.modfire.length; i++) {
        for (let j = 0; j < this.modfiresArr.length; j++) {
          if (this.itemOfChnage.modfire[i].Id == this.modfiresArr[j].Id) {
            this.modfiresArr[j].count = this.itemOfChnage.modfire[i].count
          }
        }
      }
    } else {
      for (let j = 0; j < this.modfiresArr.length; j++) {

        this.modfiresArr[j].count = 0
      }
    }


    this.langId = localStorage.getItem("lang")
    if (this.langId == '1') {
      this.dir = 'rtl'
      this.Back = "رجوع"
      this.addChange = "حفظ"
      this.Cancel = "إلغاء"
      this.Ingredients = "المكونات"
      this.Modfires = "الاضافات"
    } else {
      this.dir = 'ltr'
      this.Back = "Back"
      this.addChange = "Save"
      this.Cancel = "Cancel"
      this.Ingredients = "Ingredients"
      this.Modfires = "Modifiers"
    }
  }

  plus(value) {
    value.count = value.count + 1
  }
  minus(value) {
    if (value.count >= 1) {
      value.count = value.count - 1
    }
  }

  save() {
    let arr = []
    arr = JSON.parse(sessionStorage.getItem('myArrOfItems'))
    for (let i = 0; i < this.ingrdArr.length; i++) {
      if (this.ingrdArr[i].count == 0) {
        this.ingrdArr.splice(i, 1)
      }
    }
    for (let i = 0; i < this.modfiresArr.length; i++) {
      if (this.modfiresArr[i].count == 0) {
        this.modfiresArr.splice(i, 1)
      }
    }
    this.itemOfChnage.ingridtArr = this.ingrdArr
    this.itemOfChnage.modfire = this.modfiresArr

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == this.itemOfChnage.id) {
        arr.splice(i, 1)
      }
    }

    arr.push(this.itemOfChnage)
    arr.reverse()
    sessionStorage.setItem('myArrOfItems', JSON.stringify(arr))

    this.route.navigateByUrl("/customize")
    this.rest.sendDataOfDub('true')
  }

  goBack() {
    this.route.navigateByUrl('/customize')
  }

}
