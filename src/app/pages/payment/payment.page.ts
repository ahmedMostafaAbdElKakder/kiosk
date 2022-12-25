import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
import { DatePipe } from '@angular/common';
import { ThermalPrinterPlugin } from 'thermal-printer-cordova-plugin/src';
declare let ThermalPrinter: ThermalPrinterPlugin;
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  obj
  langId
  Back
  selectPayment
  Counter
  Here
  giftId
  date
  orderNumber
  products
  totalPrice
  productsArr
  totalPriceAfterVat
  vatValue
  pipe = new DatePipe('en-US');
  priceBeforDiscount
  DiscountAmount
  giftCardCount
  imageBase64;
  branchName:any
  constructor(private rest: RestService,
    private printer: Printer,
    private http: HttpClient,
    private route: Router) { }

  ngOnInit() {
    this.block = true
    this.branchName = localStorage.getItem("BranchName")
    let objofPrint = JSON.parse(sessionStorage.getItem('finalObjOfPrint'))
    console.log(objofPrint)
    this.http.get('/assets/images/Asset 7 - black.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          var base64data = reader.result;
          this.imageBase64 = base64data
          this.imageBase64 = this.imageBase64.replace('data:', '').replace(/^.+,/, '');
          this.beforPrint()
          
        }
        reader.readAsDataURL(res);
      });
    this.products = JSON.parse(sessionStorage.getItem('finalObj'))
    // this.getVat()
    this.vatValue = this.products.vat
    this.vatValue = this.vatValue.toFixed(2)
    this.productsArr = objofPrint
    this.totalPrice = this.products.totalPrice
    this.totalPrice = this.totalPrice.toFixed(2)
    this.priceBeforDiscount = this.products.priceBeforDiscount
    this.DiscountAmount = this.products.DiscountAmount
    this.giftCardCount = this.products.giftCardCount
    this.totalPriceAfterVat = this.products.oldPrice
    this.date = this.pipe.transform(Date.now(), 'dd/MM/yyyy HH:MM:SS');
    console.log(this.date)
    this.langId = localStorage.getItem("lang")
    this.giftId = sessionStorage.getItem("idOfSerial")
    this.obj = JSON.parse(sessionStorage.getItem('finalObj'))
    this.obj.service = this.obj.service.toFixed(2)
    console.log(this.obj)
    if (this.langId == '1') {
      this.Back = "رجوع"
      this.selectPayment = "من فضلك اختر طريقة الدفع"
      this.Counter = "كاشير"
      this.Here = "هنا"

    } else {
      this.Back = "Back"
      this.selectPayment = "Please select payment type"
      this.Counter = "At Counter"
      this.Here = "Here"
    }
  }


  TaxGroup
  getVat() {
    this.rest.getVat().subscribe((res: any) => {
      console.log("vat", res)
      this.TaxGroup = res.BranchDetails.TaxGroup
      this.TaxGroup = this.TaxGroup.slice(0, 2)
      this.TaxGroup = + this.TaxGroup

      this.vatValue = this.totalPrice - this.totalPriceAfterVat
      this.vatValue = this.vatValue.toFixed(2)
    })
  }

  block = false
  arrOfPrint
  pay() {
    // this.base64ToHex(this.imageBase64)
    this.block = true
    this.rest.checkOut(this.obj).subscribe((res: any) => {
      console.log(res)
      sessionStorage.setItem("numberOfOrder", res)
      this.route.navigateByUrl('/order-number')
      this.orderNumber = res
      this.block = false
      this.print(res)
      this.rest.activeSerial(this.giftId, res).subscribe(res => {
        console.log(res)
      })
      this.route.navigateByUrl('/order-number')
    })
  }

  goBack() {
    this.route.navigateByUrl('/review')
  }

  imageInTag
  beforPrint() {
    this.block = false
    let bindThis = this
    var printer: any
    ThermalPrinter.listPrinters({ type: 'usb' }, function (printers) {

      if (printers.length > 0) {

        for (let i = 0; i < printers.length; i++) {
          if (printers[i].productName == 'A8 USB Printer') {
            printer = printers[i];
          }
        }

        ThermalPrinter.bitmapToHexadecimalString({
          type: "usb",
          id: printer.productName,
          base64: bindThis.imageBase64
        }, function (res) {
          // alert(JSON.stringify(res))
          // alert(res)
          bindThis.imageInTag = res
          console.log('Successfully printed!');
        }, function (error) {
          alert("erorr")
          console.error('Printing error', error);
        })

      } else {
        console.error('No printers found!');
      }
    }, function (error) {
      console.error('Ups, we cant list the printers!', error);
    });
  }

  print(ordernumber) {
    let objofPrint = JSON.parse(sessionStorage.getItem('finalObjOfPrint'))
    let branchName = localStorage.getItem("NameOfBranch")
    console.log(objofPrint)
    var printer: any
    var text;
    let arrOfPrint = []



    text =
      "[C]<img>" + `${this.imageInTag}` + "</img>\n" +
      "[L]\n" +
      "[C]" + `${this.date}` + "\n" +
      "[L]\n" +
      "[C]" + "Branch : " + `${branchName}` + "\n" +
      "[C]" + "<u>" + `<font size='big'>#${ordernumber}</font>` + "</u>" + "\n" +
      "[L]\n"


    for (let i = 0; i < objofPrint.length; i++) {

      for (let j = 0; j < objofPrint[i].mainData.length; j++) {
        if (objofPrint[i].mainData[j]._mainData) {
          text = text + "[L]" + "<b>" + `X${objofPrint[i].mainData[j]._mainData.Count}${" "}${objofPrint[i].mainData[j]._mainData.name}` + "</b>" + "\n" +
            "[L]" + "Price : " + `${objofPrint[i].mainData[j]._mainData.Price}` + " " + "LE" + "\n" +
            "[L]\n"

          if (objofPrint[i].mainData[j].Modifires.length != 0) {
            for (let q = 0; q < objofPrint[i].mainData[j].Modifires.length; q++) {
              text = text + "[L]" + "<b>" + `X${objofPrint[i].mainData[j].Modifires[q].Count}${" "}${objofPrint[i].mainData[j].Modifires[q].name}` + "</b>" + "\n" +
                "[L]" + "Price : " + `${objofPrint[i].mainData[j].Modifires[q].Price}` + " " + "LE" + "\n" +
                "[L]\n"
            }
          }

          if (objofPrint[i].mainData[j].Ingredients.length != 0) {
            for (let q = 0; q < objofPrint[i].mainData[j].Ingredients.length; q++) {
              text = text + "[L]" + "<b>" +
                `X${objofPrint[i].mainData[j].Ingredients[q].Count}${" "}${objofPrint[i].mainData[j].Ingredients[q].name}` +
                "</b>" + "\n" +
                "[L]" + "Price : " + `${objofPrint[i].mainData[j].Ingredients[q].Price}` + " " + "LE" + "\n" +
                "[L]\n"
            }
          }
        } else {
          if (j == 0) {
            text = text + "[L]" + `${objofPrint[i].mainData[j].compoName}` + " - " + `${objofPrint[i].mainData[j].parentCombo}` + " - " + `${objofPrint[i].mainData[j].sizeName}` + "\n"
          }
          text = text +
            "[L]" + "<b>" + `X${objofPrint[i].mainData[j].Count}${" "}${objofPrint[i].mainData[j].name}` + "</b>" + "\n" +
            "[L]" + "Price : " + `${objofPrint[i].mainData[j].Price}` + " " + "LE" + "\n" +
            "[L]\n"
        }

      }


      text = text + "[C]--------------------------------\n"

    }

    text = text + "[L] PRICE :" + "[R]" + `${this.obj.priceBeforDiscount}` + "\n" +
      "[C]--------------------------------\n"




    if (this.DiscountAmount != 0) {
      text = text +
        // "[L] PRICE BEFORE DISCOUNT :" + "[R]" + `${this.priceBeforDiscount}` + "\n" +
        "[L] DISCOUNT :" + "[R]" + `- ${this.DiscountAmount}` + "\n" +
        "[L] PRICE AFTER DISCOUNT :" + "[R]" + `${this.priceBeforDiscount - this.DiscountAmount}` + "\n" +
        `[L] Tax VAT (${this.obj.taxVat}%) :` + "[R]" + `${this.vatValue}` + "\n" +
        `[L] Service VAT (${this.obj.serviceVat}%)  :` + "[R]" + `${this.obj.service}` + "\n"
    } else {
      text = text + `[L] Tax VAT (${this.obj.taxVat}%) :` + "[R]" + `${this.vatValue}` + "\n" +
        `[L] Service VAT (${this.obj.serviceVat}%)  :` + "[R]" + `${this.obj.service}` + "\n"
    }
    if (this.giftCardCount != 0) {
      text = text +
        "[L] PRICE BEFORE GIFT CARD :" + "[R]" + `${this.totalPriceAfterVat}` + "\n" +
        "[L] GIFT CARD :" + "[R]" + `- ${this.giftCardCount}` + "\n"
      if (this.totalPrice == 0) {
        text = text +
          "[L] PRICE AFTER GIFT CARD :" + "[R]" + `0` + "\n"
      } else {
        text = text +
          "[L] PRICE AFTER GIFT CARD :" + "[R]" + `${this.totalPrice}` + "\n"
      }
    }

    text = text +

      "[C]--------------------------------\n" +
      "[L] TOTAL PRICE :" + "[R]" + `${this.totalPrice}` + "LE" + "\n" +
      "[L]  \n" +
      "[L]\n" +
      "[L]\n" +
      "[L]\n" +
      "[L]\n" +
      "[L]\n" +
      "[L]\n" +
      "[L]\n" +
      "[L]\n"

    console.log(text)


    ThermalPrinter.listPrinters({ type: 'usb' }, function (printers) {

      if (printers.length > 0) {

        for (let i = 0; i < printers.length; i++) {
          if (printers[i].productName == 'A8 USB Printer') {
            printer = printers[i];
          }
        }

        ThermalPrinter.getEncoding({
          type: 'usb',
          id: printer.productName
        }, function (succ) {
          // alert(JSON.stringify(succ))
        }, function () { })

        ThermalPrinter.printFormattedTextAndCut({
          type: 'usb',
          id: printer.productName,
          mmFeedPaper: 0,
          dotsFeedPaper: 0,
          text: text
        }, function () {
          console.log('Successfully printed!');
        }, function (error) {
          console.error('Printing error', error);
        });

      } else {
        console.error('No printers found!');
      }
    }, function (error) {
      console.error('Ups, we cant list the printers!', error);
    });
  }


}
