import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { THeader, TProducts } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CreateComponent } from '../create/create.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public products: TProducts[] = [];
  public productsBkp: TProducts[] = [];
  public search: string = '';
  public selectedHeaderItems: THeader[] = [
    {
      canSort: false,
      isSorted: false,
      isAsc: false,
      label: 'Ações',
      property: 'action',
    },
    {
      canSort: true,
      isSorted: false,
      isAsc: false,
      label: 'Nome',
      property: 'name',
    },
    {
      canSort: true,
      isSorted: false,
      isAsc: false,
      label: 'Descrição',
      property: 'description',
    },
    {
      canSort: true,
      isSorted: false,
      isAsc: false,
      label: 'Preço',
      property: 'price',
    }
  ];

  constructor(
    public dialog: MatDialog,
    private _ProductsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this._ProductsService.getAllproducts().subscribe((productsResult) => {
      this.products = productsResult;
      this.productsBkp = JSON.parse(
        JSON.stringify(this.products)
      );
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

  public resetSort(ignoreProperty: string | null = null) {
    this.selectedHeaderItems.forEach((item) => {
      if (item.property != ignoreProperty) {
        item.isSorted = false;
        item.isAsc = false;
      }
    })
  }

  public sort(item: THeader): void {
    this.resetSort(item.property);
    item.isSorted = true;
    item.isAsc = !item.isAsc;
    if (item.isAsc)
      this.products.sort((a, b) => a[item.property].localeCompare(b[item.property]));
    else this.products.sort((a, b) => b[item.property].localeCompare(a[item.property]));
  }

  public searchByString(): void {
    if (this.search)
      this.products = this.productsBkp.filter(
        (x) =>
          this.compareString(x.name, this.search) ||
          this.compareString(x.description, this.search) ||
          this.compareString(x.price, this.search)
      );
    else this.clearFilter();
  }

  clearFilter() {
    this.products = JSON.parse(
      JSON.stringify(this.productsBkp)
    );
  }

  compareString(str: string, str2: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()
      .includes(
        str2
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase()
      );
  }
}