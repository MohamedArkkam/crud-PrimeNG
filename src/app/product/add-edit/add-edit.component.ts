import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder,Validators, } from '@angular/forms'
import { ProductService } from '../services/product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit, OnChanges {
 
 @Input() displayAddEditModal:boolean=true;
 @Input() selectedProduct : any = null;
 @Output() clickClose: EventEmitter<boolean>= new EventEmitter<boolean>(); 
 @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
 modelType = "Add"

 productForm = this.fb.group({
  title: ["", Validators.required],
  price: ["",Validators.required],
  description: [""],
  category: ["", Validators.required],
  image:["", Validators.required]

 });
 constructor(private fb:FormBuilder, private pService:ProductService, private mS:MessageService) { }

 ngOnInit(): void { }

 ngOnChanges(): void {
   if(this.selectedProduct) {
    this.modelType="Edit"
    this.productForm.patchValue(this.selectedProduct)
   }
   else {
    this.productForm.reset()
    this.modelType="Add"
   }
 }

 closeModal(){
  this.productForm.reset();
  this.clickClose.emit(true); 
 }

 add_editProduct(){
  // console.log(this.productForm.value)
  this.pService.save_editProd(this.productForm.value, this.selectedProduct).subscribe(
    response =>  {
      this.clickAddEdit.emit(response)
      this.closeModal()
      const msg=this.modelType=== 'Add' ? 'Product Added' : 'Product Updated';
      this.mS.add({ severity: 'success', summary: 'Success', detail: msg });
 
    },
    Error => {
      console.log("error")
      this.mS.add({ severity: 'error', summary: 'Error', detail: "Not Added" });
    }
    );
 } 
}
