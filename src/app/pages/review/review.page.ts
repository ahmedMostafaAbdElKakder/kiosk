import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
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
  reviewMyOrder;
  Remove;
  Edit
  dir
  LE
  serialVaild
  placeHolder
  totalPrice = 0
  showOrHideMod = false
  listOfPromtion = []
  upto;
  Discount
  constructor(private navCtr: NavController,
    private loadingCtrl: LoadingController,
    private route: Router,
    private rest: RestService) { }

  ngOnInit() {
    this.langId = localStorage.getItem("lang")
    if (this.langId == '1') {
      this.Discount = "خصم"
      this.placeHolder = "رقم كارت الهدايا"
      this.Suggestions = "الاقتراحات"
      this.Back = "رجوع"
      this.Cancel = "إلغاء"
      this.CheckOut = "استكمال عملية الدفع"
      this.Total = "الأجمالي"
      this.reviewMyOrder = "قم بمراجعة طلبك"
      this.Edit = "تعديل"
      this.Remove = "إلغاء"
      this.dir = "rtl"
      this.LE = "جنيه"
      this.serialVaild = "تحقق من الرمز"
      this.upto = "بحد اقصي"
    } else {
      this.placeHolder = "gift card number"
      this.Suggestions = 'Suggestions'
      this.Back = "Back"
      this.Cancel = "Cancel"
      this.CheckOut = "Proceed to check out"
      this.Total = "Total"
      this.reviewMyOrder = "Review my Eat in order"
      this.Edit = "Edit"
      this.Remove = "Remove"
      this.dir = "ltr"
      this.serialVaild = "valid Serial"
      this.LE = "LE"
      this.upto = "up to"
      this.Discount = 'Discount'
    }
    this.getPromtionsList()
  }

  arrOfPromo1 = []

  getPromtionsList() {
    this.item = JSON.parse(sessionStorage.getItem('arrOfModfire'))
    this.rest.allPromtion(this.langId).subscribe((res: any) => {
      this.listOfPromtion = res
      console.log("in promo", res)
      for (let i = 0; i < this.item.length; i++) {
        for (let j = 0; j < this.listOfPromtion.length; j++) {
          for (let q = 0; q < this.listOfPromtion[j].Products.length; q++) {
            if (this.item[i].Prdoucts[0].Id == this.listOfPromtion[j].Products[q].Id) {
              this.item[i].MaxDiscountAmount = this.listOfPromtion[j].MaxDiscountAmount
              this.item[i].discount = this.listOfPromtion[j].DiscountAmount
              this.item[i].DiscountType = this.listOfPromtion[j].DiscountType
            }
          }
        }
      }
      this.rest.gitDiscount(this.langId).subscribe((res: any) => {
        console.log("in discount", res)
        for (let i = 0; i < this.item.length; i++) {
          for (let j = 0; j < res.length; j++) {
            if (this.item[i].Prdoucts[0].Id == res[j].Id) {
              this.item[i].discount = res[j].DiscountAmount
              this.item[i].MaxDiscountAmount = res[j].MaxDiscountAmount
              this.item[i].DiscountType = res[j].DiscountType
            }
          }
        }
        this.getData()
      })
    })
  }

  block = true
  totalPriceAfterSerial = 0
  getData() {
    console.log("in data", this.item)
    for (let i = 0; i < this.item.length; i++) {
      this.soucePrice = 0;
      this.priceOfProdct = 0
      this.modfirePrice = 0
      if (this.item[i].ingridtArr.length != 0) {
        for (let j = 0; j < this.item[i].ingridtArr.length; j++) {
          this.item[i].ingridtArr[j].oldCount = this.item[i].ingridtArr[j].count
          this.soucePrice = this.soucePrice + (this.item[i].ingridtArr[j].Price * this.item[i].ingridtArr[j].count)
        }
      } else {
        this.soucePrice = this.soucePrice + 0
      }

      for (let q = 0; q < this.item[i].Prdoucts.length; q++) {
        this.priceOfProdct = this.priceOfProdct + (this.item[i].Prdoucts[q].Price * this.item[i].Prdoucts[q].count)
      }

      if (this.item[i].Name) {
        console.log("in mod")
        this.item[i].ifMode = false
        this.modfirePrice = this.modfirePrice + (this.item[i].Price * this.item[i].count)
      } else {
        this.modfirePrice = this.modfirePrice + 0
        this.item[i].ifMode = true
      }

      if (this.item[i].discount) {
        console.log("true")
        if (this.item[i].DiscountType == 1) {
          this.item[i].total = this.soucePrice + this.modfirePrice + this.priceOfProdct
          this.item[i].oldTotal = this.soucePrice + this.modfirePrice + this.priceOfProdct
          let valueOfDiscount = this.item[i].total * ((this.item[i].discount) / 100)
          console.log(this.soucePrice , this.modfirePrice , this.priceOfProdct )
          if(valueOfDiscount > this.item[i].MaxDiscountAmount){
            this.item[i].total = this.item[i].total - this.item[i].MaxDiscountAmount
          }else {
            this.item[i].total = this.item[i].total * ((100 - this.item[i].discount) / 100)
          }
        }else {
          this.item[i].total = this.soucePrice + this.modfirePrice + this.priceOfProdct
          this.item[i].oldTotal = this.soucePrice + this.modfirePrice + this.priceOfProdct
          this.item[i].total = this.item[i].total - this.item[i].discount
          console.log(this.soucePrice , this.modfirePrice , this.priceOfProdct )
          // if(valueOfDiscount > this.item[i].MaxDiscountAmount){
          //   this.item[i].total = this.item[i].total - this.item[i].MaxDiscountAmount
          // }else {
          //   this.item[i].total = this.item[i].total * ((100 - this.item[i].discount) / 100)
          // }
        }
      } else {
        this.item[i].total = this.soucePrice + this.modfirePrice + this.priceOfProdct
      }

      setTimeout(() => {
        this.totalPrice = this.totalPrice + this.item[i].total
        this.totalPriceAfterSerial = this.totalPrice
        // this.loading.dismiss();
        this.block = false
      }, 2000);

    }
  }
  minus(item) {
    if (item.Prdoucts[0].count > 1) {
      this.totalPrice = 0
      this.soucePrice = 0
      item.count = item.count - 1
      if (item.ifMode != true) {
        this.modfirePrice = item.Price * item.count
        console.log(this.modfirePrice)
      } else {
        this.modfirePrice = 0
      }
      if (item.ingridtArr.length != 0) {
        for (let i = 0; i < item.ingridtArr.length; i++) {
          let count = item.ingridtArr[i].count / item.Prdoucts[0].count
          item.ingridtArr[i].count = item.ingridtArr[i].count - count
          this.soucePrice = this.soucePrice + (item.ingridtArr[i].Price * item.ingridtArr[i].count)
          console.log(this.soucePrice)
        }
      }

      item.Prdoucts[0].count = item.Prdoucts[0].count - 1

      this.priceOfProdct = item.Prdoucts[0].Price * item.Prdoucts[0].count



      let totalPrice = this.soucePrice + this.modfirePrice + this.priceOfProdct
      console.log(this.soucePrice, this.modfirePrice, this.priceOfProdct)
      item.oldTotal = totalPrice
      console.log(totalPrice)

      if (item.discount) {
        if(item.DiscountType == 1){
          let value = totalPrice * (item.discount / 100)
          if (value > item.MaxDiscountAmount) {
            item.total = totalPrice - item.MaxDiscountAmount
          } else {
            item.total = item.oldTotal * ((100 - item.discount) / 100)
          }
        }else {
          item.total = totalPrice - item.discount
        }
      } else {
        item.total = this.soucePrice + this.modfirePrice + this.priceOfProdct
      }

      for (let i = 0; i < this.item.length; i++) {
        this.totalPrice = this.totalPrice + this.item[i].total
      }
      this.totalPriceAfterSerial = this.totalPrice
      this.totalPrice = this.totalPriceAfterSerial - this.giftCardCount
      if (this.totalPrice < 0) {
        this.totalPrice = 0
      }
    }

    sessionStorage.setItem('arrOfModfire', JSON.stringify(this.item))

  }
  plus(item) {
    this.soucePrice = 0
    this.totalPrice = 0
    if (item.ifMode != true) {
      item.count = item.count + 1
      this.modfirePrice = item.Price * item.count
      console.log(this.modfirePrice, item.count)
    } else {
      this.modfirePrice = 0
    }

    if (item.ingridtArr.length != 0) {
      console.log(this.soucePrice)
      for (let i = 0; i < item.ingridtArr.length; i++) {
        let count = item.ingridtArr[i].count / item.Prdoucts[0].count
        item.ingridtArr[i].count = item.ingridtArr[i].count + count

        this.soucePrice = this.soucePrice + (item.ingridtArr[i].Price * item.ingridtArr[i].count)
        console.log(this.soucePrice)
      }
    }

    item.Prdoucts[0].count = item.Prdoucts[0].count + 1
    this.priceOfProdct = item.Prdoucts[0].Price * item.Prdoucts[0].count

    let totalPrice = this.soucePrice + this.modfirePrice + this.priceOfProdct
    item.oldTotal = totalPrice

    if (item.discount) {
      if(item.DiscountType == 1){
        let value = totalPrice * (item.discount / 100)
        if (value > item.MaxDiscountAmount) {
          item.total = totalPrice - item.MaxDiscountAmount
        } else {
          item.total = item.oldTotal * ((100 - item.discount) / 100)
        }
      }else {
        item.total = totalPrice - item.discount
      }
    } else {
      item.total = this.soucePrice + this.modfirePrice + this.priceOfProdct
    }

    for (let i = 0; i < this.item.length; i++) {
      this.totalPrice = this.totalPrice + this.item[i].total
    }
    this.totalPriceAfterSerial = this.totalPrice
    this.totalPrice = this.totalPriceAfterSerial - this.giftCardCount
    if (this.totalPrice < 0) {
      this.totalPrice = 0
    }
    sessionStorage.setItem('arrOfModfire', JSON.stringify(this.item))
  }
  goBack() {
    this.route.navigateByUrl('/main_menu')
  }

  cancel() {
    this.route.navigateByUrl('/home')
    sessionStorage.clear()
    this.rest.sendObsData('true')
  }

  goToCheckOut() {
    let customerNumber =  sessionStorage.getItem('mobileNumber')
    let ingrdtion = []
    let modfiersArr = []
    let arradumy = []
    let productArrofItem = []
    let oldPrice = 0;
    let newPrice = 0
    let DiscountAmount = 0
    for (let i = 0; i < this.item.length; i++) {
      arradumy.push(this.item[i])
    }


    for (let i = 0; i < arradumy.length; i++) {
      ingrdtion = []
      modfiersArr = []

      oldPrice = oldPrice + arradumy[i].oldTotal
      newPrice = newPrice + arradumy[i].total
      let obj = {
        "Id": arradumy[i].Prdoucts[0].Id,
        "Price": arradumy[i].Prdoucts[0].Price * arradumy[i].Prdoucts[0].count,
        "Count": arradumy[i].Prdoucts[0].count
      }
      if (arradumy[i].Name) {
        modfiersArr.push({
          "Id": arradumy[i].Id,
          "Price": arradumy[i].Price * arradumy[i].count,
          "Count": arradumy[i].count
        })
      } else {
        modfiersArr = []
      }
      if (arradumy[i].ingridtArr.length != 0) {
        for (let j = 0; j < arradumy[i].ingridtArr.length; j++) {
          ingrdtion.push({
            "Id": arradumy[i].ingridtArr[j].Id,
            "Price": arradumy[i].ingridtArr[j].Price * arradumy[i].ingridtArr[j].count,
            "Count": arradumy[i].ingridtArr[j].count
          })
        }
      } else {
        ingrdtion = []
      }

      productArrofItem.push({
        _mainData: obj,
        Modifires: modfiersArr,
        Ingredients: ingrdtion
      })
    }


    DiscountAmount = oldPrice - newPrice

    let obj = {
      'BranchId': 3,
      "PaymentTypeId": 2,
      "totalPrice": this.totalPrice,
      'Products': productArrofItem,
      'CustomerPhone':customerNumber,
      'DiscountAmount': DiscountAmount
    }
    console.log(obj)

    console.log(obj)
    sessionStorage.setItem('finalObj', JSON.stringify(obj))
    this.route.navigateByUrl('/payment')

  }

  shwoProced = true
  removeItem(i, product) {
    this.item.splice(i, 1)
    sessionStorage.setItem('arrOfModfire', JSON.stringify(this.item))
    console.log(product)
    let souceCount = 0
    let itemPrice = 0
    // if (product.ifMode == true) {
    //   itemPrice = product.Prdoucts[0].Price * product.Prdoucts[0].count
    // } else {
    //   itemPrice = (product.Price * product.count) + (product.Prdoucts[0].Price * product.Prdoucts[0].count)
    // }
    // if (product.ingridtArr.length != 0) {
    //   for (let i = 0; i < product.ingridtArr.length; i++) {
    //     souceCount = souceCount + (product.ingridtArr[i].Price * product.ingridtArr[i].count)
    //   }
    // } else {
    //   souceCount = 0
    // }

    this.totalPriceAfterSerial = this.totalPriceAfterSerial - product.total
    this.totalPrice = this.totalPriceAfterSerial - this.giftCardCount
    // this.totalPriceAfterSerial = this.totalPrice
    if (this.totalPrice < 0) {
      this.totalPrice = 0
    }
    console.log(this.totalPrice, this.totalPriceAfterSerial)

    if (this.item.length == 0) {
      this.shwoProced = false
      sessionStorage.clear()
      this.route.navigateByUrl('/home')
      this.rest.sendObsData('true')
    } else {
      this.shwoProced = true
    }

  }

  edit(idOfEdit) {
    // sessionStorage.setItem('idOfEdit',idOfEdit)
    this.route.navigateByUrl('/add-souce')
  }

  // serial number
  serialNumber = '';
  giftCardCount = 0;
  giftCardISVaild
  showIsValid = false
  showStatusValid = false
  showStatusValidFalse = false
  validSerial() {
    this.block = true
    this.rest.sendValidSerial(this.serialNumber).subscribe((res: any) => {
      console.log(res)
      this.showIsValid = true
      if (res.Status == "Valid") {
        this.block = false
        this.serialNumber = ""
        this.showStatusValid = true
        this.showStatusValidFalse = false
        this.giftCardCount = res.Price
        if (this.langId == '1') {
          this.giftCardISVaild = " كارت الهدايا صالح"
        } else {
          this.giftCardISVaild = "Gift Card  is valid"
        }
        sessionStorage.setItem("idOfSerial", res.Id)
        this.totalPrice = this.totalPriceAfterSerial - res.Price
        if (this.totalPrice < 0) {
          this.totalPrice = 0
        }
      } else if (res.Status == "Not Valid"){
        if (this.langId == '1') {
          this.giftCardISVaild = " كارت الهدايا غير صالح"
        } else {
          this.giftCardISVaild = "Gift Card Number not valid"
        }
        this.showStatusValid = false
        this.showStatusValidFalse = true
        this.block = false
      }else if (res.Status == "Expired"){
        if (this.langId == '1') {
          this.giftCardISVaild = " كارت الهدايا منتهي "
        } else {
          this.giftCardISVaild = "Gift Card Number Expired"
        }
        this.showStatusValid = false
        this.showStatusValidFalse = true
        this.block = false
      }else {
        if (this.langId == '1') {
          this.giftCardISVaild = " كارت الهدايا تم استخدامه "
        } else {
          this.giftCardISVaild = "Gift Card Number Used"
        }
        this.showStatusValid = false
        this.showStatusValidFalse = true
        this.block = false
      }
    })
    console.log(this.serialNumber)
  }

  inputChange(event) {
    this.showStatusValid = false
    this.showStatusValidFalse = false
    console.log("action")
    // this.showStatusValid = !this.showStatusValid
  }

}
