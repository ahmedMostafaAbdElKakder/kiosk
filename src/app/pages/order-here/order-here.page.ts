import { Component, OnInit } from '@angular/core';
import { NavController, Platform, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-order-here',
  templateUrl: './order-here.page.html',
  styleUrls: ['./order-here.page.scss'],
})
export class OrderHerePage implements OnInit {

  constructor(private navCtr: NavController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private route: Router) {
    this.platform.backButton.subscribeWithPriority(99999, () => {
      if (this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ngOnInit() {
    console.log("شسشي")
    OrderHerePage.fromUTF8String("شسشي")
  }

  geOeder() {
    this.route.navigateByUrl('/home')
  }

  public static fromUTF8String(intpuStr) {
    let data = [];

    for (let i = 0; i < intpuStr.length; ++i) {
      data.push(intpuStr.charCodeAt(i));
    }

    var str = '',
      i;

    for (i = 0; i < data.length; i++) {
      var value = data[i];

      if (value < 0x80) {
        str = str.concat(String.fromCharCode(value));
      } else if (value > 0xBF && value < 0xE0) {
        str = str.concat(String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F));
        i += 1;
      } else if (value > 0xDF && value < 0xF0) {
        str = str.concat(String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F));
        i += 2;
      } else {
        // surrogate pair
        var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;

        str = str.concat(String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00));
        i += 3;
      }
    }

    console.log(str)
    return str;
  }
}
