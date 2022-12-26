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
    if(!localStorage.getItem('lang')){
      localStorage.setItem("lang" , this.lang)
      this.ifLang('2')
    }else {
      this.lang = localStorage.getItem('lang')
      this.ifLang(this.lang)
    }
  }

  gotToShop(){
    this.route.navigateByUrl('/main_menu')
  }

  changeLang(lang){
    this.lang = lang
    localStorage.setItem("lang" , this.lang)
    this.ifLang(this.lang)
  }

  title ;
  takeOut
  inShop
  ifLang(langId){
    if(langId == '2'){
      this.title = "What will you choose today"
      this.takeOut = "Take Out"
      this.inShop = "In Shop"
    }else {
      this.title = "ماذا ستختار اليوم"
      this.takeOut = "في الخارج"
      this.inShop = "في المتجر"
    }
  }
}
