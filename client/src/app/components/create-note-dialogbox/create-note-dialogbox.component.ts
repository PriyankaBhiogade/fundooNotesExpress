import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NotesService } from  '../../services/notes.service'
import { DataSharingService } from 'src/app/services/data-sharing.service';
@Component({
  selector: 'app-create-note-dialogbox',
  templateUrl: './create-note-dialogbox.component.html',
  styleUrls: ['./create-note-dialogbox.component.scss']
})
export class CreateNoteDialogboxComponent implements OnInit {
  @Input() noteData: any
  constructor(
    private data:DataSharingService,
    private noteService: NotesService,
    private snackBar: MatSnackBar,
    private activtedRoute: ActivatedRoute,
    public dialogBox: MatDialog,
    public dialogRef: MatDialogRef<CreateNoteDialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public notes: any,) { }
    title = new FormControl(this.notes.title);
    description = new FormControl(this.notes.description);
    noteId = this.notes.noteId
  ngOnInit() {
  }
  onClose() {
    this.dialogBox.closeAll();
    const notesdata = {
      "_id": this.notes.noteData._id,
      "title": this.title.value,
      "description": this.description.value
    }
 
    this.noteService.updateNote(this.notes.noteData._id, notesdata).subscribe(
      (res: any) => {
        this.data.changeMessage(res)
        console.log("res",res)
        this.snackBar.open(
          "Notes are updated successfully",
          "undo",
          { duration: 2500 }
        )
      },
      (err) => {
        this.snackBar.open(
          "Notes not updated",
          "undo",
          { duration: 2500 }
        )
      }
    )
}

}