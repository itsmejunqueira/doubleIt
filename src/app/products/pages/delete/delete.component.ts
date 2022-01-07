import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
  ) {}

  ngOnInit(): void {
  }
  
  deleteProduct() {
    this.dialogRef.close(true);
  }

   
  cancel() {
    this.dialogRef.close(false);
  }


}
