import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PInterface } from '../p-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProd():Observable<PInterface[]> {
    return this.http.get<PInterface[]>('https://fakestoreapi.com/products?sort=desc')
  }

  save_editProd(postData:any, selectedPdt:any) {
    if(!selectedPdt){
      return this.http.post('https://fakestoreapi.com/products',postData)
    }
    else{
      return this.http.put(`https://fakestoreapi.com/products/${selectedPdt.id}`,postData)
    }
  }  

  delete_Prod(productID:number){
    return this.http.delete(`https://fakestoreapi.com/products/${productID}`)
  }
}
