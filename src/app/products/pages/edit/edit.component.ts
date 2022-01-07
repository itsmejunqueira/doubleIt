import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.loadForm();
  }

  loadForm() {
    this.form = this.fb.group({
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
      name: this.form.value.nome,
      description: this.form.value.description,
      photo: this.form.value.photo,
      price: this.form.value.price,
      date: this.form.value.date,
      tags: this.form.value.category.split(',')
    }
    this.dialogRef.close(this.data);
  }

  cancel(){
    this.dialogRef.close();
    
  }
}
