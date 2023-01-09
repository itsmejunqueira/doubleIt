import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TProducts } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  files: File[] = [];

  public allowTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
  ]

  @ViewChild('fileUpload') fileUpload
  constructor(
    private _spinnerService: NgxSpinnerService,
    private _productsService: ProductsService,
    public dialogRef: MatDialogRef<CreateComponent>,
    private _sanitizer: DomSanitizer,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: TProducts, private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.form = this.fb.group({
      nome: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      photo: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
    });
  }

  submit() {
    this.data = {
      name: this.form.value.nome,
      description: this.form.value.description,
      photo: this.form.value.photo,
      price: this.form.value.price,
      date: this.form.value.date,
      tags: this.form.value.category.split(',')
    }

    if (this.files.length) {
      var reader = new FileReader();
      reader.readAsDataURL(this.files[0]);
      reader.onload = () => {
        this.data.photo = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + reader.result.toString());
        this.data.photo = reader.result.toString();
        this._productsService.AddProduct(this.data).subscribe(() => {
          this.dialogRef.close(this.data);
        })
      };
    }
    else {
      this._productsService.AddProduct(this.data).subscribe(() => {
        this.dialogRef.close(this.data);
      })
    }

  }

  cancel() {
    this.dialogRef.close();
  }

  onSelect(event) {
    this.files.push(...event.addedFiles)
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1)
  }

  public loadFile(event: any): void {
    if (this.findType(event.target.files[0].type)) {
      for (let index = 0; index < event.target.files.length; index++) {
        this.files.push(event.target.files[index])
      }
    } else {
      this._toastrService.error(
        'O tipo do arquivo não é suportado.',
        'Arquivo não suportado.'
      )
    }
  }

  public findType(type: string) {
    return this.allowTypes.some((item) => item == type)
  }

  choseFile() {
    this.fileUpload.nativeElement.click()
  }
}