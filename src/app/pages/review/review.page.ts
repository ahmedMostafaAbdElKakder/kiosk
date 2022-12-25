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
  Vat
  serviceName
  serviceVat
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
      this.Vat = "ضريبة القيمة المضافه"
      this.serviceName = "خدمة"
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
      this.Vat = 'Vat'
      this.serviceName = "Services"

    }
    this.getPromtionsList()
    this.getVat()
  }

  arrOfPromo1 = []
  TaxGroup;
  VatValue = 0
  getVat() {
    this.rest.getVat().subscribe((res: any) => {
      console.log("vat", res)
      if (res.BranchDetails.TaxGroup == "0%") {
        this.TaxGroup = 0
      } else {
        this.TaxGroup = res.BranchDetails.TaxGroup
        this.TaxGroup = this.TaxGroup.slice(0, 2)
        this.TaxGroup = + this.TaxGroup
      }
      console.log(this.TaxGroup)
    })
  }
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
  discountvalueOfPrint
  oldtotlaBeforDiscount = 0
  service = 0
  getData() {
    console.log("in data", this.item)
    let BeforeTax = localStorage.getItem('BeforeTax')
    let serviceTax = +localStorage.getItem('ServiceTax')
    this.serviceVat = serviceTax
    console.log("serviceTax", serviceTax)

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

      if (this.item[i].modfire.length != 0) {
        for (let j = 0; j < this.item[i].modfire.length; j++) {
          this.item[i].modfire[j].oldCount = this.item[i].modfire[j].count
          this.modfirePrice = this.modfirePrice + (this.item[i].modfire[j].Price * this.item[i].modfire[j].count)
        }
      } else {
        this.modfirePrice = this.modfirePrice + 0
      }

      this.oldtotlaBeforDiscount = this.oldtotlaBeforDiscount + this.soucePrice + this.modfirePrice + this.priceOfProdct
      console.log("oldtotlaBeforDiscount", this.oldtotlaBeforDiscount)

      if (this.item[i].discount) {
        console.log("BeforeTax", BeforeTax)
        if (BeforeTax == 'false') {
          if (this.item[i].DiscountType == 1) {

            this.item[i].total = this.soucePrice + this.modfirePrice + this.priceOfProdct
            this.item[i].oldTotal = this.soucePrice + this.modfirePrice + this.priceOfProdct
            let valueOfDiscount = this.item[i].total * ((this.item[i].discount) / 100)
            console.log("valueOfDiscount", valueOfDiscount)
            if (valueOfDiscount > this.item[i].MaxDiscountAmount) {
              this.discountvalueOfPrint = this.item[i].MaxDiscountAmount
              this.item[i].total = this.item[i].total - this.item[i].MaxDiscountAmount
            } else {
              this.discountvalueOfPrint = valueOfDiscount
              this.item[i].total = this.item[i].total * ((100 - this.item[i].discount) / 100)
            }
          } else {
            this.item[i].total = this.soucePrice + this.modfirePrice + this.priceOfProdct
            this.item[i].oldTotal = this.soucePrice + this.modfirePrice + this.priceOfProdct
            this.item[i].total = this.item[i].total - (this.item[i].discount * this.item[i].Prdoucts[0].count)
            console.log("you are here", this.soucePrice, this.modfirePrice, this.priceOfProdct)
          }
        } else {
          // befortax

          if (this.item[i].DiscountType == 1) {

            this.item[i].total = this.soucePrice + this.modfirePrice + this.priceOfProdct
            this.item[i].oldTotal = this.soucePrice + this.modfirePrice + this.priceOfProdct
            // this.VatValue = this.item[i].total * (this.TaxGroup / 100)
            // this.item[i].total = this.item[i].total + this.VatValue
            let valueOfDiscount = this.item[i].total * ((this.item[i].discount) / 100)
            console.log("valueOfDiscount", valueOfDiscount)
            if (valueOfDiscount > this.item[i].MaxDiscountAmount) {
              this.discountvalueOfPrint = this.item[i].MaxDiscountAmount
              this.item[i].total = this.item[i].total - this.item[i].MaxDiscountAmount
            } else {
              this.discountvalueOfPrint = valueOfDiscount
              this.item[i].total = this.item[i].total * ((100 - this.item[i].discount) / 100)
            }
          } else {
            this.item[i].total = this.soucePrice + this.modfirePrice + this.priceOfProdct
            this.item[i].oldTotal = this.soucePrice + this.modfirePrice + this.priceOfProdct
            this.VatValue = this.item[i].total * (this.TaxGroup / 100)
            this.item[i].total = this.item[i].total 
            this.item[i].total = this.item[i].total - (this.item[i].discount * this.item[i].Prdoucts[0].count)
            console.log(this.soucePrice, this.modfirePrice, this.priceOfProdct)
          }
        }

      } else {
        this.item[i].oldTotal = this.soucePrice + this.modfirePrice + this.priceOfProdct
        this.item[i].total = this.soucePrice + this.modfirePrice + this.priceOfProdct
        //  this.VatValue = this.item[i].total * (this.TaxGroup / 100)
        // this.item[i].total =this.item[i].total + this.VatValue
      }
      this.totalPrice = this.totalPrice + this.item[i].total
    }
    if (BeforeTax == 'false') {
      setTimeout(() => {
        this.totalPriceAfterSerial = this.totalPrice
        this.service = this.totalPrice * (serviceTax / 100)
        this.totalPrice = this.totalPrice + this.service
        this.VatValue = this.totalPrice * (this.TaxGroup / 100)
        this.totalPrice = this.totalPrice + this.VatValue

        console.log(this.totalPrice, this.VatValue)
        this.block = false
      }, 2000);
    } else {
      setTimeout(() => {
        this.totalPriceAfterSerial = this.totalPrice
        console.log(this.totalPriceAfterSerial )
        this.service = this.totalPrice * (serviceTax / 100)
        this.VatValue = (this.oldtotlaBeforDiscount + this.service) * (this.TaxGroup / 100)
        this.totalPrice = this.totalPrice + this.service + this.VatValue
        console.log("BeforeTax == 'true'", this.totalPrice, this.VatValue)
        this.block = false
      }, 2000);
    }

  }
  minus(item) {
    let BeforeTax = localStorage.getItem('BeforeTax')
    console.log(this.priceOfProdct)
    if (item.Prdoucts[0].count > 1) {
      this.totalPrice = 0
      this.soucePrice = 0
      this.modfirePrice = 0
      this.priceOfProdct = 0
      item.count = item.count - 1

      if (item.modfire.length != 0) {
        for (let i = 0; i < item.modfire.length; i++) {
          let count = item.modfire[i].count / item.Prdoucts[0].count
          item.modfire[i].count = item.modfire[i].count - count
          this.modfirePrice = this.modfirePrice + (item.modfire[i].Price * item.modfire[i].count)
          console.log(this.modfirePrice)
        }
      }
      if (item.ingridtArr.length != 0) {
        for (let i = 0; i < item.ingridtArr.length; i++) {
          let count = item.ingridtArr[i].count / item.Prdoucts[0].count
          item.ingridtArr[i].count = item.ingridtArr[i].count - count
          this.soucePrice = this.soucePrice + (item.ingridtArr[i].Price * item.ingridtArr[i].count)
          console.log(this.soucePrice)
        }
      }
      for (let i = 0; i < item.Prdoucts.length; i++) {
        item.Prdoucts[i].count = item.Prdoucts[i].count - 1
        this.priceOfProdct = this.priceOfProdct + (item.Prdoucts[i].Price * item.Prdoucts[i].count)
      }





      let totalPrice = this.soucePrice + this.modfirePrice + this.priceOfProdct
      console.log(this.soucePrice, this.modfirePrice, this.priceOfProdct)
      item.oldTotal = totalPrice
      console.log(totalPrice)
      this.oldtotlaBeforDiscount = totalPrice

      if (BeforeTax == 'false') {
        if (item.discount) {
          if (item.DiscountType == 1) {
            console.log("discountType", item.DiscountType)
            let value = totalPrice * (item.discount / 100)
            if (value > item.MaxDiscountAmount) {
              this.discountvalueOfPrint = item.MaxDiscountAmount
              item.total = totalPrice - item.MaxDiscountAmount
            } else {
              this.discountvalueOfPrint = value
              item.total = item.oldTotal * ((100 - item.discount) / 100)
              console.log("item.total", item.total)
            }
          } else {
            console.log("discountType", item.DiscountType)
            this.discountvalueOfPrint = item.discount
            item.total = totalPrice - (item.discount * item.Prdoucts[0].count)
          }
        } else {
          this.discountvalueOfPrint = 0
          item.total = this.soucePrice + this.modfirePrice + this.priceOfProdct
        }

        for (let i = 0; i < this.item.length; i++) {
          this.totalPrice = this.totalPrice + this.item[i].total
        }

        console.log("this.totalPrice", this.totalPrice)

        this.totalPriceAfterSerial = this.totalPrice
        this.service = this.totalPrice * (this.serviceVat / 100)
        this.totalPrice = this.totalPrice + this.service
        this.VatValue = this.totalPrice * (this.TaxGroup / 100)
        this.totalPrice = this.totalPrice + this.VatValue

        console.log("this.totalPrice", this.totalPrice)
        this.totalPrice = this.totalPrice - this.giftCardCount
        if (this.totalPrice < 0) {
          this.totalPrice = 0
          this.VatValue = 0
          this.service = 0
        }
      } else {
        if (item.discount) {
          if (item.DiscountType == 1) {
            // this.VatValue = totalPrice * (this.TaxGroup / 100)
            // totalPrice = totalPrice + this.VatValue
            let value = totalPrice * (item.discount / 100)

            // let value = totalPrice * (item.discount / 100)
            if (value > item.MaxDiscountAmount) {
              this.discountvalueOfPrint = item.MaxDiscountAmount
              item.total = totalPrice - item.MaxDiscountAmount
            } else {
              this.discountvalueOfPrint = value
              item.total = totalPrice * ((100 - item.discount) / 100)
            }
          } else {
            this.discountvalueOfPrint = item.discount
            item.total = totalPrice - (item.discount * item.Prdoucts[0].count)
          }
        } else {
          this.discountvalueOfPrint = 0
          item.total = this.soucePrice + this.modfirePrice + this.priceOfProdct
        }
        this.VatValue = 0
        let oldPrice = 0
        for (let i = 0; i < this.item.length; i++) {
          oldPrice = oldPrice + this.item[i].oldTotal
          this.totalPrice = this.totalPrice + this.item[i].total
        }


        // this.VatValue = this.totalPrice * (this.TaxGroup / 100)
        this.totalPriceAfterSerial = this.totalPrice
        this.service = this.totalPrice * (this.serviceVat / 100)
        this.VatValue = (oldPrice + this.service) * (this.TaxGroup / 100)
        // this.totalPrice = this.totalPrice + (this.totalPrice * (this.TaxGroup / 100))
        this.totalPrice = this.totalPrice + this.service + this.VatValue

        this.totalPrice = this.totalPrice - this.giftCardCount
        if (this.totalPrice < 0) {
          this.totalPrice = 0
          this.VatValue = 0
          this.service = 0
        }
      }

    }


    sessionStorage.setItem('arrOfModfire', JSON.stringify(this.item))

  }
  plus(item) {
    let BeforeTax = localStorage.getItem('BeforeTax')
    console.log(item)
    this.soucePrice = 0
    this.totalPrice = 0
    this.modfirePrice = 0
    this.priceOfProdct = 0
    if (item.modfire.length != 0) {

      for (let i = 0; i < item.modfire.length; i++) {
        let count = item.modfire[i].count / item.Prdoucts[0].count
        item.modfire[i].count = item.modfire[i].count + count

        this.modfirePrice = this.modfirePrice + (item.modfire[i].Price * item.modfire[i].count)
      }
      console.log(this.modfirePrice)
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

    for (let i = 0; i < item.Prdoucts.length; i++) {
      item.Prdoucts[i].count = item.Prdoucts[i].count + 1
      this.priceOfProdct = this.priceOfProdct + (item.Prdoucts[i].Price * item.Prdoucts[i].count)
    }



    let totalPrice = this.soucePrice + this.modfirePrice + this.priceOfProdct
    console.log("is the final price", totalPrice)
    item.oldTotal = totalPrice
    this.oldtotlaBeforDiscount = totalPrice

    if (BeforeTax == 'false') {
      if (item.discount) {
        if (item.DiscountType == 1) {
          let value = totalPrice * (item.discount / 100)
          console.log(value)
          if (value > item.MaxDiscountAmount) {
            this.discountvalueOfPrint = item.MaxDiscountAmount
            item.total = totalPrice - item.MaxDiscountAmount
          } else {
            this.discountvalueOfPrint = value
            item.total = item.oldTotal * ((100 - item.discount) / 100)
          }
        } else {
          console.log(item)
          // item.discount = (item.discount * item.Prdoucts[0].count)
          this.discountvalueOfPrint = item.discount
          item.total = totalPrice - (item.discount * item.Prdoucts[0].count)
        }
      } else {
        this.discountvalueOfPrint = 0
        item.total = this.soucePrice + this.modfirePrice + this.priceOfProdct
      }

      for (let i = 0; i < this.item.length; i++) {
        this.totalPrice = this.totalPrice + this.item[i].total
      }
      this.totalPriceAfterSerial = this.totalPrice
      this.service = this.totalPrice * (this.serviceVat / 100)
      this.totalPrice = this.totalPrice + this.service
      this.VatValue = this.totalPrice * (this.TaxGroup / 100)
      this.totalPrice = this.totalPrice + this.VatValue
      this.totalPrice = this.totalPrice - this.giftCardCount
      if (this.totalPrice < 0) {
        this.totalPrice = 0
        this.VatValue = 0
        this.service = 0
      }
    } else {
      if (item.discount) {
        if (item.DiscountType == 1) {
          let value = totalPrice * (item.discount / 100)
          console.log(value)
          if (value > item.MaxDiscountAmount) {
            this.discountvalueOfPrint = item.MaxDiscountAmount
            item.total = totalPrice - item.MaxDiscountAmount
          } else {
            this.discountvalueOfPrint = value
            item.total = totalPrice * ((100 - item.discount) / 100)
          }
        } else {
          this.discountvalueOfPrint = item.discount
          item.total = totalPrice - (item.discount * item.Prdoucts[0].count)
        }
      } else {

        this.discountvalueOfPrint = 0
        item.total = this.soucePrice + this.modfirePrice + this.priceOfProdct
      }

      

      this.VatValue = 0
      let oldPrice = 0
      for (let i = 0; i < this.item.length; i++) {
        this.totalPrice = this.totalPrice + this.item[i].total
        oldPrice = oldPrice + this.item[i].oldTotal
      }
      console.log("this.totalPriceAfterSerial", this.totalPrice)

      this.totalPriceAfterSerial = this.totalPrice
      this.service = this.totalPrice * (this.serviceVat / 100)
      this.totalPrice = this.totalPrice + this.service 
      this.VatValue = (oldPrice + this.service) * (this.TaxGroup / 100)

      this.totalPrice = this.totalPrice + this.VatValue

      this.totalPrice = this.totalPrice - this.giftCardCount
      if (this.totalPrice < 0) {
        this.totalPrice = 0
        this.VatValue = 0
        this.service = 0
      }
    }


    console.log(this.item)

    sessionStorage.setItem('arrOfModfire', JSON.stringify(this.item))
    console.log(this.totalPrice)
  }
  goBack() {
    this.rest.sendObsData('true')
    this.route.navigateByUrl('/main_menu')
  }

  cancel() {
    this.route.navigateByUrl('/home')
    sessionStorage.clear()
    this.rest.sendObsData('true')
  }

  goToCheckOut() {
    let customerNumber = sessionStorage.getItem('mobileNumber')
    let ingrdtion = []
    let modfiersArr = []
    let prodArrOfCombo = []
    let arradumy = []
    let productArrofItem = []
    let oldPrice = 0;
    let newPrice = 0
    let DiscountAmount = 0
    for (let i = 0; i < this.item.length; i++) {
      arradumy.push(this.item[i])
    }

    console.log(arradumy)

    let arrofPrint = []
    for (let i = 0; i < arradumy.length; i++) {
      ingrdtion = []
      modfiersArr = []
      let arr = []


      oldPrice = oldPrice + arradumy[i].oldTotal
      newPrice = newPrice + arradumy[i].total

      if (arradumy[i].Prdoucts.length > 1) {
        for (let j = 0; j < arradumy[i].Prdoucts.length; j++) {
          let obj = {
            "Id": arradumy[i].Prdoucts[j].Id,
            "Price": arradumy[i].Prdoucts[j].Price * arradumy[i].Prdoucts[j].count,
            "Count": arradumy[i].Prdoucts[j].count,
            'name': arradumy[i].Prdoucts[j].Name,
            "sizeId": arradumy[i].Prdoucts[j].sizeId,
            "compoName": arradumy[i].Prdoucts[j].compoName,
            "parentCombo": arradumy[i].Prdoucts[j].parentCombo,
            "sizeName": arradumy[i].Prdoucts[j].sizeName
          }
          arr.push(obj)
          productArrofItem.push({
            _mainData: obj,
            Modifires: [],
            Ingredients: []
          })
        }
        arrofPrint.push({
          mainData: arr
        })
      } else {
        let obj = {
          "Id": arradumy[i].Prdoucts[0].Id,
          "Price": arradumy[i].Prdoucts[0].Price * arradumy[i].Prdoucts[0].count,
          "Count": arradumy[i].Prdoucts[0].count,
          'name': arradumy[i].Prdoucts[0].Name
        }

        if (arradumy[i].modfire.length != 0) {
          for (let j = 0; j < arradumy[i].modfire.length; j++) {
            modfiersArr.push({
              "Id": arradumy[i].modfire[j].Id,
              "Price": arradumy[i].modfire[j].Price * arradumy[i].modfire[j].count,
              "Count": arradumy[i].modfire[j].count,
              "name": arradumy[i].modfire[j].Name
            })
          }
        } else {
          modfiersArr = []
        }

        if (arradumy[i].ingridtArr.length != 0) {
          for (let j = 0; j < arradumy[i].ingridtArr.length; j++) {
            ingrdtion.push({
              "Id": arradumy[i].ingridtArr[j].Id,
              "Price": arradumy[i].ingridtArr[j].Price * arradumy[i].ingridtArr[j].count,
              "Count": arradumy[i].ingridtArr[j].count,
              "name": arradumy[i].ingridtArr[j].Name
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

        arr.push({
          _mainData: obj,
          Modifires: modfiersArr,
          Ingredients: ingrdtion
        })
        arrofPrint.push({
          mainData: arr
        })
      }
    }

    DiscountAmount = oldPrice - newPrice

    let idOfBranch = localStorage.getItem("idOfBranch")
    let obj = {
      'BranchId': idOfBranch,
      "PaymentTypeId": 2,
      "totalPrice": this.totalPrice,
      'Products': productArrofItem,
      'CustomerPhone': customerNumber,
      'DiscountAmount': DiscountAmount,
      'oldPrice': this.totalPriceAfterSerial,
      "giftCardCount": this.giftCardCount,
      "discountvalueOfPrint": this.discountvalueOfPrint,
      "priceBeforDiscount": this.oldtotlaBeforDiscount,
      "vat": this.VatValue,
      "service": this.service ,
      "serviceVat" : this.serviceVat ,
      "taxVat" : this.TaxGroup
    }

    console.log(obj)
    sessionStorage.setItem('finalObj', JSON.stringify(obj))
    sessionStorage.setItem('finalObjOfPrint', JSON.stringify(arrofPrint))
    this.route.navigateByUrl('/payment')

  }

  shwoProced = true
  removeItem(i, product) {
    let PrdouctVat
    let PrdouctService
    let BeforeTax = localStorage.getItem('BeforeTax')
    this.item.splice(i, 1)
    sessionStorage.setItem('arrOfModfire', JSON.stringify(this.item))
    console.log(product)
    if(product.discount){
      if(BeforeTax == "true"){
        PrdouctService = product.total  * (this.serviceVat / 100)
         PrdouctVat = (product.oldTotal + PrdouctService)  * (this.TaxGroup / 100)
      }else {
        PrdouctService = product.total  * (this.serviceVat / 100)
        PrdouctVat = (product.total + PrdouctService ) * (this.TaxGroup / 100)
      }
    }else {
      PrdouctService = product.total  * (this.serviceVat / 100)
      PrdouctVat = (product.total + PrdouctService)  * (this.TaxGroup / 100)
    }


    this.totalPriceAfterSerial = this.totalPriceAfterSerial - product.total
    this.totalPrice = this.totalPriceAfterSerial - this.giftCardCount
    this.VatValue = this.VatValue - PrdouctVat
    this.service = this.service - PrdouctService
    this.totalPrice = this.totalPrice + this.VatValue
    this.totalPrice = this.totalPrice + this.service
    // if (this.totalPrice < 0) {
    //   this.totalPrice = 0
    //   this.VatValue = 0
    // }
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
  serialNumberIsUsed = ''
  status = false
  validSerial() {
    console.log(this.giftCardCount)
    if(this.serialNumber != this.serialNumberIsUsed){
      this.block = true
      this.rest.sendValidSerial(this.serialNumber).subscribe((res: any) => {
        console.log(res)
        this.showIsValid = true
        if (res.Status == "Valid") {
          this.serialNumberIsUsed = this.serialNumber
          this.block = false
          this.showStatusValid = true
          this.showStatusValidFalse = false
          this.giftCardCount = res.Price
          if (this.langId == '1') {
            this.giftCardISVaild = " كارت الهدايا صالح"
          } else {
            this.giftCardISVaild = "Gift Card  is valid"
          }
          sessionStorage.setItem("idOfSerial", res.Id)
          this.totalPriceAfterSerial = this.totalPrice
          this.totalPrice = this.totalPrice - res.Price
          if (this.totalPrice < 0) {
            this.totalPrice = 0
            // this.VatValue = 0
          }
        } else if (res.Status == "Not Valid") {
          console.log(this.giftCardCount)
          this.totalPrice = this.totalPrice + this.giftCardCount
          this.totalPriceAfterSerial = this.totalPrice
          this.giftCardCount = 0
          this.serialNumberIsUsed = ""
          if (this.langId == '1') {
            this.giftCardISVaild = " كارت الهدايا غير صالح"
          } else {
            this.giftCardISVaild = "Gift Card Number Not Valid"
          }
          this.showStatusValid = false
          this.showStatusValidFalse = true
          this.block = false
        } else if (res.Status == "Expired") {
          this.serialNumberIsUsed = ""
          this.totalPrice = this.totalPrice + this.giftCardCount
          this.totalPriceAfterSerial = this.totalPrice
          this.giftCardCount = 0
          if (this.langId == '1') {
            this.giftCardISVaild = " كارت الهدايا منتهي "
          } else {
            this.giftCardISVaild = "Gift Card Number Expired"
          }
          this.showStatusValid = false
          this.showStatusValidFalse = true
          this.block = false
        } else {
          this.serialNumberIsUsed = ""
          this.totalPrice = this.totalPrice + this.giftCardCount
          this.totalPriceAfterSerial = this.totalPrice
          this.giftCardCount = 0
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

  }

  inputChange(event) {
    this.showStatusValid = false
    this.showStatusValidFalse = false
    // this.serialNumberIsUsed = event.target.value
    if(event.target.value == ""){
      this.totalPrice = this.totalPrice + this.giftCardCount
      this.totalPriceAfterSerial = this.totalPrice
      this.giftCardCount = 0
      this.serialNumberIsUsed = ""
    }
    // this.showStatusValid = !this.showStatusValid
  }

}
