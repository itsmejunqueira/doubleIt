import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TProducts } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<DeleteComponent>,
    private _productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: TProducts,
  ) {}

  ngOnInit(): void {
  }
  
  deleteProduct() {
    this._productsService.DeleteProduct(this.data).subscribe(
      {
        next: (value) => this.dialogRef.close(true),
        error: (error) => console.log(error)
      })
    
  }

   
  cancel() {
    this.dialogRef.close(false);
  }
}
