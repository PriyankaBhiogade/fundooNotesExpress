import { Component, OnInit, Input } from '@angular/core';
import { noteModel } from 'src/app/models/notes';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';

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
    this.noteService.getAllNotes().subscribe(
      (response: any) => {
        console.log("response ------>",response)

        this.notes = response.data
        console.log("dbfhjsdfvg",this.notes)
        // this.notee = response.result.label
      }
    )
  }
  reminder(item: any, $event) {
    this.reminder = $event;
    this.model = {
      reminder: this.reminder,
      id: item.id,
      fundooUserId: localStorage.getItem('userid')
    }
    console.log("reminder", this.model);
    this.noteService.getAllNotes().subscribe(Response => {
        console.log("data of reminder: ", Response);
        //  this.reminder = Response;
      },
        error => {
          console.log("error of reminder:: ", error);

        }
      )
  }

}
