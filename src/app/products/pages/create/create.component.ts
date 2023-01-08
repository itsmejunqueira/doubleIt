import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  files: File[] = [];

  [x: string]: any
  public comment: string = ''
  public currentJobId: number
 // public receivedData: TattachimentsRequest
  //public attachments: Tattachments[]

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
    public dialogRef: MatDialogRef<CreateComponent>,
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



onSelect(event) {
  this.files.push(...event.addedFiles)
}

onRemove(event) {
  this.files.splice(this.files.indexOf(event), 1)
}

public async loadData() {
  this._spinnerService.show()
  this.receivedData = await this._atachimentsService.getAttachmentsStageEnd(
    this.currentJobId
  )
  this.attachments = this.receivedData.attachments
  this.comment =
    this.receivedData.comment != null ? this.receivedData.comment : ''
}

public loadFile(event: any): void {
  if (this.findType(event.target.files[0].type)) {
    for (let index = 0; index < event.target.files.length; index++) {
      this.files.push(event.target.files[index])
    }
  } else {
    this._toastService.error(
      'O tipo do arquivo não é suportado.',
      'Arquivo não suportado.'
    )
  }
}

public findType(type: string) {
  return this.allowTypes.some((item) => item == type)
}

public async save() {
  this._spinnerService.show()
  const formData = new FormData()
  formData.append('jobId', String(this.currentJobId))
  formData.append('authorized', this.authorized ? 'true' : null)

  this.comment != ''
    ? formData.append('comment', this.comment)
    : formData.append('comment', null)

  for (let index = 0; index < this.files.length; index++) {
    formData.append('attachments', this.files[index])
  }
  await this._atachimentsService.saveAttachmentsStageEnd(formData)
  this._toastService.success(
    'Os arquivos foram enviados com sucesso.',
    'Arquivos Enviados.'
  )
  this.comment = ''
  this.files = []
  this.loadData()
}

choseFile(){
  this.fileUpload.nativeElement.click()

}
}