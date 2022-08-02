import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-here',
  templateUrl: './order-here.page.html',
  styleUrls: ['./order-here.page.scss'],
})
export class OrderHerePage implements OnInit {

  constructor(private navCtr : NavController , private route :Router) { }

  ngOnInit() {
  }

  geOeder(){
    this.route.navigateByUrl('/phone-number')
  }
}
