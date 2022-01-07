import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.form = this.fb.group({
      nome: [ '', Validators.compose([Validators.required])],
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
    this.dialogRef.close(this.data);
  }

  cancel(){
    this.dialogRef.close();
    
  }
}