import { Component, OnInit, Input } from '@angular/core';
import { noteModel } from 'src/app/models/notes';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-get-notes',
  templateUrl: './get-notes.component.html',
  styleUrls: ['./get-notes.component.scss']
})
export class GetNotesComponent implements OnInit {
  @Input() noteData: any
  public dialogRef: any
  message: string;

  note: noteModel = new noteModel();
  notes:[] ;
  notee:any
  constructor( private snackBar: MatSnackBar,
    private noteService: NotesService,
    public matDialog: MatDialog,
    ) { }

  ngOnInit() {
    this.getNote();
  }
  getNote() {
    this.noteService.getAllNotes().subscribe(
      (response: any) => {
        console.log("response ------>",response.data)

        this.notes = response.data
        console.log("dbfhjsdfvg",this.notes)
        // this.notee = response.result.label
      }
    )
  }

}
