import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
} from '@angular/material/dialog';


export interface DialogData{
  animal:string,
  name:string
}
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  animal: string | undefined;
  name: string | undefined;

  constructor(public dialog: MatDialog) {}

  openDialog():void{
     const dialogRef = this.dialog.open(Dialog,{
      data:{name:this.name,animal:this.animal}
     })

     dialogRef.afterClosed().subscribe(result=>{
      console.log('The dialog was closed')
      this.animal = result
     })
  }
}

@Component({
  selector: 'dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog.html',
})

export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData
    ){}

    onNoClick():void{
      this.dialogRef.close()
    }
  
}
