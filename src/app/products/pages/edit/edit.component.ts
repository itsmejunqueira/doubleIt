import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    private _productsService: ProductsService,
    private _sanitizer: DomSanitizer,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.loadForm();
  }

  loadForm() {
    this.form = this.fb.group({
      id: [this.data.id, Validators.compose([Validators.required])],
      nome: [this.data.name, Validators.compose([Validators.required])],
      description: [this.data.description, Validators.compose([Validators.required])],
      photo: [this.data.photo, Validators.compose([Validators.required])],
      price: [this.data.price, Validators.compose([Validators.required])],
      date: [this.data.date, Validators.compose([Validators.required])],
      category: [this.data.tags.toString(), Validators.compose([Validators.required])],
    });
  }

  submit() {
    this.data = {
      id: this.form.value.id,
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
        this._productsService.EditProduct(this.data).subscribe(
          {
            next: (value) => this.dialogRef.close(this.data),
            error: (error) => console.log(error)
          })
      };
    }
    else {
      this._productsService.EditProduct(this.data).subscribe(
        {
          next: (value) => this.dialogRef.close(this.data),
          error: (error) => console.log(error)
        }
      )
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
