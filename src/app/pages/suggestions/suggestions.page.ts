import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

  mostSellingArr = []

  langId
  Suggestions
  Back
  Thanks
  constructor(private rest: RestService, 
    private route :Router,
    private navCtr: NavController) { }

  ngOnInit() {
   this.langId =  sessionStorage.getItem("lang")
   if(this.langId == '1'){
     this.Suggestions = "الاقتراحات"
     this.Back = "رجوع"
     this.Thanks = "شكرا"
   }else {
     this.Suggestions = 'Suggestions'
     this.Back= "Back"
     this.Thanks = "No Thanks"
   }
    this.getMostSelling()
  }

  getMostSelling() {
    this.rest.mostSelling().subscribe((res: any) => {
      console.log(res)
      this.mostSellingArr = res
      for (let i = 0; i < this.mostSellingArr.length; i++) {
        if (i == 2 || i == 5 || i == 8 || i == 11) {
          this.mostSellingArr[i].status = true
        } else {
          this.mostSellingArr[i].status = false

        }
      }
    })
  }

  goBack() {
    this.route.navigateByUrl('/home')
  }

  noThanks() {
    this.route.navigateByUrl("/main_menu")
  }

  goToOeder(item){
    this.route.navigateByUrl("/main_menu")
  }

}
