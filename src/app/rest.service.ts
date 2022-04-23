import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  private subject = new Subject<any>();
  status = 'true'
  langId
  constructor(private http: HttpClient) { 
    this.langId = sessionStorage.getItem('lang')
  }


  getCategoriWithProduct(){
    return this.http.get(`${environment.baseUrl}/api/Products/GetCategorieswithProduct?branchId=3&langId=${this.langId}`)
  }

  GetItemsbyProductId(){
    return this.http.get(`${environment.baseUrl}/api/Products/GetItemsbyProductId?prodId=2&langId=${this.langId}`)

  }

  mostSelling(){
    return this.http.get(`${environment.baseUrl}/api/Products/GetMostSellingbyBranchId?branchId=3&langId=${this.langId}`)
  }

  GetModifiresbyProductId(prodId){
    console.log("lang",this.langId)
    return this.http.get(`${environment.baseUrl}/api/Products/GetModifiresbyProductId?prodId=${prodId}&langId=${this.langId}`)

  }

  checkOut(obj){
    return this.http.post(`${environment.baseUrl}/api/Orders/AddOrder`,obj)
  }

  sendObsData(event) {
    this.subject.next(event);
  }

  getObsData(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
