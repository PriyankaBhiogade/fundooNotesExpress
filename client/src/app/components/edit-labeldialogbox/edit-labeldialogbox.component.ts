import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LabelsService } from 'src/app/services/labels.service';
import { labelModel } from 'src/app/models/label';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-edit-labeldialogbox',
  templateUrl: './edit-labeldialogbox.component.html',
  styleUrls: ['./edit-labeldialogbox.component.scss']
})
export class EditLabeldialogboxComponent implements OnInit {
  @Input() labelData: any
  labels: any[];
  label: labelModel = new labelModel();

  constructor(public dialogRef: MatDialogRef<EditLabeldialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public notes: any, private labelService: LabelsService,
    private matSnackBar: MatSnackBar,private data: DataSharingService) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getLabel();
  }
  createlabel() {
    this.labelService.createLabel(this.label).subscribe(
      (response: any) => {
        this.data.changeMessage(response)
        this.matSnackBar.open(
          "Label created Successfully",
          "undo",
          { duration: 2500 }
        )
      },
      (error) => {
        this.matSnackBar.open(
          "Label creation Failed",
          "undo",
          { duration: 2500 }
        )
      }
    )
  }

  /**
   * @description function to display all label
   */
  getLabel() {
    this.data.currentMessage.subscribe(message =>{
      console.log("messege",message)
    this.labelService.getLabel().subscribe(
      (response: any) => {
        this.labels = response.result
      }
    )
  })
  }
  /**
   * @description function to delete a label
   */
  deleteLabel(label) {
    console.log(label._id);
    var data1 = 
    {
      "_id": label._id,
    }

    this.labelService.deleteLabel(label._id, data1).subscribe(
      (response: any) => {
        this.data.changeMessage(response)     
         this.matSnackBar.open(
            "Label deleted Successfully",
            "undo",
            { duration: 2500 }
          )
        },
        error =>
        {
          this.matSnackBar.open(
            "Label deletion Failed",
            "undo",
            { duration: 2500 }
          )
        }
      )
    }

  /**
   * @description function to update a label
   */
  onEditLabel(label, data: any) {
    console.log("dataftd", data)
    console.log("Label is id" + data._id)
    console.log(label);
    var data1 = {
      "_id": data._id,
      "label": data.label
    }
    console.log("data1",data1)
    this.labelService.updateLabel(data._id, data1).subscribe(
      response => {
        console.log(response);
        this.matSnackBar.open(
          "Note is updated Successfully",
          "undo",
          { duration: 2500 }
        )
      },
      (err) => {
        this.matSnackBar.open(
          "Note is updation Failed",
          "undo")
        { duration: 2500 }
      }
    )
  }



}
