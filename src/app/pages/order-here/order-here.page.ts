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

  constructor(private navCtr : NavController ,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
     private route :Router) {
      this.platform.backButton.subscribeWithPriority(99999, () => {
        if (this.routerOutlet.canGoBack()) {
          App.exitApp();
        }
      });
      }

  ngOnInit() {
  }

  geOeder(){
    this.route.navigateByUrl('/home')
  }
}
