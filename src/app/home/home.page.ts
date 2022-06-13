import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private rest : RestService ,
    private route : Router
    ,private navCtr : NavController) {}

    lang = '2'
  ngOnInit(){
    sessionStorage.setItem("lang" , this.lang)
    // this.getItemById()
  }

  // getItemById(){
  //   this.rest.GetItemsbyProductId(this.lang).subscribe(res => {
  //     console.log("by id " , res)
  //   })
  // }

  gotToShop(){
    this.route.navigateByUrl('/main_menu')
  }

  changeLang(lang){
    this.lang = lang
    sessionStorage.setItem("lang" , this.lang)
  }
}
