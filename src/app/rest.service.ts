import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { Observable , Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  private subject = new Subject<any>();
  status = 'true'
  langId
  branchId
  subscription2 : Subscription
  constructor(private http: HttpClient) { 
    this.subscription2 =  this.getDataOfbranch().subscribe(res => {
      this.branchId = localStorage.getItem('idOfBranch')
    })
    this.branchId = localStorage.getItem('idOfBranch')
  }

  getClientBranch(Email){
    // let Email = "ids@ids.com"
    return this.http.get(`${environment.baseUrl}/api/Branches/GetClientBranches?Email=${Email}`)

  }

  getCategoriWithProduct(langId){
    return this.http.get(`${environment.baseUrl}/api/Products/GetCategorieswithProduct?branchid=${this.branchId}&langId=${langId}`)
  }

  GetItemsbyProductId(langId,id){
    return this.http.get(`${environment.baseUrl}/api/Products/GetItemsbyProductId?prodId=${id}&langId=${langId}`)

  }

  mostSelling(langId){
    return this.http.get(`${environment.baseUrl}/api/Products/GetMostSellingbyBranchId?branchid=${this.branchId}&langId=${langId}`)
  }

  GetModifiresbyProductId(prodId,langId){
    return this.http.get(`${environment.baseUrl}/api/Products/GetModifiresbyProductId?prodId=${prodId}&langId=${langId}&branchid=${this.branchId}`)

  }

  checkOut(obj){
    return this.http.post(`${environment.baseUrl}/api/Orders/AddOrder`,obj)
  }

  gitDiscount(langId){
    return this.http.get(`${environment.baseUrl}/api/Discounts/getDiscounts?branchid=${this.branchId}&langId=${langId}`)
  }
  
  getPromtion(langId){
    return this.http.get(`${environment.baseUrl}/api/Promotions/getPromotions?branchid=${this.branchId}&langId=${langId}`)
  }

  getPromoDetails(langId,promoId){
    return this.http.get(`${environment.baseUrl}/api/Promotions/GetPromotionProducts?promotionId=${promoId}&langId=${langId}&branchid=${this.branchId}`)
  }

  allPromtion(langId){
    return this.http.get(`${environment.baseUrl}/api/Promotions/GetProductsForAllPromotion?branchid=${this.branchId}&langId=${langId}`)
  }

  // serial number
  // http://206.225.82.102:8042/api/GiftCards/getGigtCard?SerialNumber=

  sendValidSerial(serial){
    return this.http.get(`${environment.baseUrl}/api/GiftCards/getGigtCard?branchid=${this.branchId}&SerialNumber=${serial}`)
  }
// api/GiftCards/getGigtCard?branchId={branchId}&SerialNumber={SerialNumber}
  activeSerial(giftId,orderid){
    return this.http.post(`${environment.baseUrl}/api/GiftCards/UseGiftCard?giftId=${giftId}&orderid=${orderid}`,"")

  }
  // 

  combo(langId){
    return this.http.get(`${environment.baseUrl}/api/Combo/GetCombos?branchid=${this.branchId}&langId=${langId}`)

  }
  comboDetails(comboId,langId){
    return this.http.get(`${environment.baseUrl}/api/Combo/GetComboGroup?branchid=${this.branchId}&comboId=${comboId}&langId=${langId}`)
  }
  // Vat

  getVat(){
    return this.http.get(`${environment.baseUrl}/api/Branches/getBranchDetails?branchid=${this.branchId}&langId=1`)
  }

  getBranchDetails(branchid,langId){
    return this.http.get(`${environment.baseUrl}/api/Branches/getBranchDetails?branchid=${branchid}&langId=${langId}`)
    // GET api/Branches/getBranchDetails?branchid={branchid}&langId={langId}
  }
  sendObsData(event) {
    this.subject.next(event);
  }

  getObsData(): Observable<any> {
    return this.subject.asObservable();
  }


  // 

  
  private subjectOfDub = new Subject<any>();
  private subjectOfGetBranch = new Subject<any>();
  sendDataOfDub(event) {
    this.subjectOfDub.next(event);
  }

  getDataOfDub(): Observable<any> {
    return this.subjectOfDub.asObservable();
  }
  
  private subjectOfBranch = new Subject<any>();
  sendDataOfBranch(event) {
    this.subjectOfBranch.next(event);
  }

  getDataOfbranch(): Observable<any> {
    return this.subjectOfBranch.asObservable();
  }

  sendStatusOfBranch(event) {
    this.subjectOfGetBranch.next(event);
  }

  getStatusOfbranch(): Observable<any> {
    return this.subjectOfGetBranch.asObservable();
  }

}
