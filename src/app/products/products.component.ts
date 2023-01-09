import { DeleteComponent } from './pages/delete/delete.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ProductsService } from '../shared/services/products.service';
import { TProducts } from '../shared/models/product.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products:TProducts[] = [];

  constructor(
    public dialog: MatDialog,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this._ProductsService.getAllproducts().subscribe((productsResult)=>{
      this.products = productsResult;
    });
  }

  newProduct() {
    const dialogRef = this.dialog.open(CreateComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.loadProducts();
      }
    });
  }

  editProduct(item) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(item) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.loadProducts();
      }
    });
  }
}
