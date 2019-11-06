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
  data1: any;
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
  color(item: any, $event) {
    this.color = $event;
    console.log("color", this.color)
    console.log("idnote", item);
    this.model = {
      color: this.color,
      noteId: item._id
    }
    console.log("color", this.model);
    this.noteService.setColor(this.model)
      .subscribe(Response => {
        console.log("data of color: ", Response);       
      },
        error => {
          console.log("error of color:: ", error);

        }
      )
  }

  Lable_id:any
  getLabel(item:any,$event){
    this.Lable_id =$event._id;
    console.log("event",$event);
      this.model = {
        "labelId": this.Lable_id,
        "noteId": item._id,
        "userId": item.userId
      }
      console.log("data model11fgdf1",this.model);
      this.noteService.addLabelToNote(this.model)
  
        .subscribe(response => {
          this.data1 = response
          console.log("label data  ",  this.data1)
  
          this.snackBar.open('add label successfully', 'End Now', { duration: 3000 })
        },
          error => {
            console.log(error)
             this.snackBar.open('Not added', 'End Now', { duration: 3000 })
          }
        )
    }
}
