import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { noteModel } from 'src/app/models/notes';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  
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
    this.noteService.getAllReminderNotes().subscribe(
      (response: any) => {
        console.log("response ------>",response)

        this.notes = response.data
        console.log("dbfhjsdfvg",this.notes)
        // this.notee = response.result.label
      }
    )
  }
}
