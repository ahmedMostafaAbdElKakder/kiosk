import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-chose-branch',
  templateUrl: './chose-branch.page.html',
  styleUrls: ['./chose-branch.page.scss'],
})
export class ChoseBranchPage implements OnInit {
  arrOfBranch = []
  idOfBranch = ''
  selectedValue :any
  constructor(private route : Router , private rest : RestService) { }

  ngOnInit() {
   this.arrOfBranch =  JSON.parse(localStorage.getItem('arrayOfBranch'))
   console.log(this.arrOfBranch)
  }

  getRadio(e){
    this.idOfBranch = e.target.value
    this.disabledButton = false


  }
  getItem(item){
    console.log(item)
  }

  disabledButton = true

  goToOrder(){



    if(this.idOfBranch == ''){
      
      this.disabledButton = true
    }else {
      for(let i = 0 ; i < this.arrOfBranch.length;i++){
        if(this.arrOfBranch[i].Id == this.idOfBranch){
          localStorage.setItem("NameOfBranch",this.arrOfBranch[i].Name)
        }
      }
      this.rest.getBranchDetails(this.idOfBranch,1).subscribe((res :any) => {
        console.log(res)
        localStorage.setItem("BeforeTax",res.BranchDetails.BeforeTax)
        let service = res.BranchDetails.ServiceTax
        service =+ service
        localStorage.setItem("ServiceTax",service)
        this.disabledButton = false
        this.route.navigateByUrl('/order-here')
        localStorage.setItem("idOfBranch",this.idOfBranch)
        this.rest.sendDataOfBranch("true")
      })
  
    }

  }

}
