import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { PInterface } from './p-interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  
  products: PInterface[]=[];
  displayAddEditModal = false;
  selectedProduct: any = null
  subscription: Subscription[] = [] //Unsubscribe process  or Async operation is also possible
  pdtSubscription: Subscription = new Subscription()   //Unsubscribe process

  constructor(private pService:ProductService, private confS:ConfirmationService, private mS:MessageService) {}

  ngOnInit(): void {
    this.get_Prod();
  }

  get_Prod() {
    this.pdtSubscription = this.pService.getProd().subscribe(    //Unsubscribe process
      response => {
        this.products=response;
      }
    )
    this.subscription.push(this.pdtSubscription)    //Unsubscribe process
  }

  show_Add_Product(){
    this.displayAddEditModal = true;
    this.selectedProduct=null
  }

  hideAddModal(isClosed:boolean) {
    this.displayAddEditModal = !isClosed;
  }

  save_updateProductList(newdata:any){
    if(this.selectedProduct && newdata.id === this.selectedProduct.id){
      const productIndex = this.products.findIndex(data => data.id === newdata.id)
      this.products[productIndex] = newdata
    }
    else { 
      this.products.unshift(newdata)
    }  
    // this.get_Prod()    //incase of own API
  }
  
  show_Edit_Product(product:PInterface){
    this.displayAddEditModal = true;
    this.selectedProduct = product
  }
   deleteProduct(product:PInterface) {
    
    this.confS.confirm({
      message: 'Are you sure that you want to delete this product?',
       accept: () => {
        this.pService.delete_Prod(product.id).subscribe(    //Unsubscribe process optional
          response => {
            // this.get_Prod();
            this.products=this.products.filter(data =>data.id !== product.id)
            this.mS.add({ severity: 'success', summary: 'Success', detail: "Product Deleted" });
          },
          error =>{
            this.mS.add({ severity: 'error', summary: 'Error', detail: "Product Not Deleted" });
          }
          
        )
       }
    });
   }

   ngOnDestroy(): void {
     this.subscription.forEach(sub =>sub.unsubscribe()); //Unsubscribe process
   }
}
