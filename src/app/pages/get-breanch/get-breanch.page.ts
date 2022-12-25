import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-breanch',
  templateUrl: './get-breanch.page.html',
  styleUrls: ['./get-breanch.page.scss'],
})
export class GetBreanchPage implements OnInit {

  Email
  idOfBranch
  subscription: Subscription;
  showContent = true
  showSkip = false
  erorrMasg = "Check Your Email"
  expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  constructor(private rest: RestService, private route: Router) { }

  ngOnInit() {
    this.idOfBranch = localStorage.getItem('idOfBranch')
    if (this.idOfBranch) {
      this.showSkip = true
    } else {
      this.showSkip = false
    }
  }
  result
  getEmail(e) {
    this.Email = e.target.value
    this.result = this.expression.test(this.Email);
  }
  showErorrMasg = false
  getData() {
    this.subscription = this.rest.getStatusOfbranch().subscribe(res => {
      if(res == "5"){
        this.erorrMasg = "license expired"
      }else {
        this.erorrMasg = "account rejected"
      }
     
    })
    if (this.result == true) {
      this.showErorrMasg = false
      this.rest.getClientBranch(this.Email).subscribe((res: any) => {
        console.log(res)
        if (res != null) {
          if (res.StatusId == 3) {
            this.showErorrMasg = false
            if (res.ClientBranches.Branches.length != 0) {
              localStorage.setItem('arrayOfBranch', JSON.stringify(res.ClientBranches.Branches))
              this.route.navigateByUrl('/chose-branch')
            }
          } else if (res.StatusId == 5) {
            this.showErorrMasg = true
            this.erorrMasg = "license expired"
          }else if (res.StatusId == 4){
            this.showErorrMasg = true
            this.erorrMasg = "account rejected"
          }
        }else {
          this.showErorrMasg = true
          this.erorrMasg = "Check Your Email"
        }
      })
    } else {
      this.showErorrMasg = true
      this.erorrMasg = "Check Your Email"
    }
  }
}
