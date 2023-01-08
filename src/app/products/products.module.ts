import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from './pages/create/create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditComponent } from './pages/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './pages/delete/delete.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,    
    MatListModule,
    MatDialogModule,    
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class ProductsModule { }
