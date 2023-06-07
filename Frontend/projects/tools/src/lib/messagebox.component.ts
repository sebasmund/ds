import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dialogRef:MatDialogRef<MessageboxComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void{
    this.dialogRef.close(false);
  }
}
