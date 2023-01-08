import { DeleteComponent } from './pages/delete/delete.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products = this._ProductsService.getAllproducts();

  constructor(
    public dialog: MatDialog,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {}

  newProduct() {
    const dialogRef = this.dialog.open(CreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.products.push(result);
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
        const index = this.products.indexOf(item);
        this.products[index] = result;
      }
    });
  }

  deleteProduct(item) {
    const dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        const index = this.products.indexOf(item);
        this.products.splice(index, 1);
      }
    });
  }
}
