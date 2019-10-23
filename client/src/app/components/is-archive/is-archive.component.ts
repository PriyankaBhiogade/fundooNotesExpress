import { Component, OnInit, Input } from '@angular/core';
import { noteModel } from 'src/app/models/notes';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-is-archive',
  templateUrl: './is-archive.component.html',
  styleUrls: ['./is-archive.component.scss']
})
export class IsArchiveComponent implements OnInit {

  @Input() noteData: any
  public dialogRef: any
  message: string;

  note: noteModel = new noteModel();
  notes:[] ;
  notee:any
  gridview:boolean;
  model: any
  constructor( private snackBar: MatSnackBar,
    private noteService: NotesService,
    public matDialog: MatDialog,
    private dataService :DataService 
    )
    {}
  ngOnInit() {
    this.getNote();
    this.dataService.currentMessage.subscribe(
      responce=>this.gridview=responce
    )
    this.viewUpdate()
  }
  viewUpdate() {
    this.dataService.currentMessage.subscribe(
    response =>
    {
      this.message = response['Title']
      console.log("response =====>",this.message)
    }
    

    );
  }
  getNote() {
    this.noteService.getAllArchiveNotes().subscribe(
      (response: any) => {
        console.log("response ------>",response)

        this.notes = response.data
        console.log("dbfhjsdfvg",this.notes)
        // this.notee = response.result.label
      }
    )
  }

}
