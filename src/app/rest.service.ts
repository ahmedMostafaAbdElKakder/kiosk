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
  }


  getCategoriWithProduct(langId){
    return this.http.get(`${environment.baseUrl}/api/Products/GetCategorieswithProduct?branchId=3&langId=${langId}`)
  }

  GetItemsbyProductId(langId,id){
    return this.http.get(`${environment.baseUrl}/api/Products/GetItemsbyProductId?prodId=${id}&langId=${langId}`)

  }

  mostSelling(langId){
    return this.http.get(`${environment.baseUrl}/api/Products/GetMostSellingbyBranchId?branchId=3&langId=${langId}`)
  }

  GetModifiresbyProductId(prodId,langId){
    return this.http.get(`${environment.baseUrl}/api/Products/GetModifiresbyProductId?prodId=${prodId}&langId=${langId}`)

  }

  checkOut(obj){
    return this.http.post(`${environment.baseUrl}/api/Orders/AddOrder`,obj)
  }

  gitDiscount(langId){
    return this.http.get(`${environment.baseUrl}/api/Discounts/getDiscounts?branchid=3&langId=${langId}`)
  }
  
  getPromtion(langId){
    return this.http.get(`${environment.baseUrl}/api/Promotions/getPromotions?branchid=3&langId=${langId}`)
  }

  getPromoDetails(langId,promoId){
    return this.http.get(`${environment.baseUrl}/api/Promotions/GetPromotionProducts?promotionId=${promoId}&langId=${langId}`)
  }

  allPromtion(langId){
    return this.http.get(`${environment.baseUrl}/api/Promotions/GetProductsForAllPromotion?branchid=3&langId=${langId}`)
  }

  // serial number
  // http://206.225.82.102:8042/api/GiftCards/getGigtCard?SerialNumber=

  sendValidSerial(serial){
    return this.http.get(`${environment.baseUrl}/api/GiftCards/getGigtCard?branchId=3&SerialNumber=${serial}`)
  }
// api/GiftCards/getGigtCard?branchId={branchId}&SerialNumber={SerialNumber}
  activeSerial(giftId,orderid){
    return this.http.post(`${environment.baseUrl}/api/GiftCards/UseGiftCard?giftId=${giftId}&orderid=${orderid}`,"")

  }
  // 
  sendObsData(event) {
    this.subject.next(event);
  }

  getObsData(): Observable<any> {
    return this.subject.asObservable();
  }
  
}
