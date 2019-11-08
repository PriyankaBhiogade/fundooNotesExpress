import { Component, OnInit, Input } from '@angular/core';
import { noteModel } from 'src/app/models/notes';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';
import { CreateNoteDialogboxComponent } from '../create-note-dialogbox/create-note-dialogbox.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { NotificationService } from '../../../notification.service' 
@Component({
  selector: 'app-get-notes',
  templateUrl: './get-notes.component.html',
  styleUrls: ['./get-notes.component.scss']
})
export class GetNotesComponent implements OnInit {
  @Input() noteData: any
  message: string;

  note: noteModel = new noteModel();
  notes: Array<any> = [];
  gridview: boolean;
  model: any
  data1: any;
  constructor(private snackBar: MatSnackBar,
    private noteService: NotesService,
    public dialog: MatDialog,
    private dataService: DataService,
    private data: DataSharingService,
    private notificationService: NotificationService
  ) { }
  ngOnInit() {
    this.getNote();
    this.dataService.currentMessage.subscribe(
      responce => this.gridview = responce
    )
    this.viewUpdate()
  }
  viewUpdate() {
    this.dataService.currentMessage.subscribe(
      response => {
        this.message = response['Title']
      }
    );
  }
  getNote() {
    this.data.currentMessage.subscribe(message => {
      this.noteService.getAllNotes().subscribe(
        (response: any) => {
          this.notes = response.data

          // this.notee = response.result.label
        }
      )
    })
  }
  item: any[];
  openDialog(item): void {
    const dialogRef = this.dialog.open(CreateNoteDialogboxComponent, {
      width: '550px',
      // height:'200px',
      data: { noteData: item, disableClose: true }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  color(item: any, $event) {
    this.color = $event;
    this.model = {
      color: this.color,
      noteId: item._id
    }
    this.noteService.setColor(this.model)
      .subscribe(Response => {
        this.data.changeMessage(Response)
        console.log("data of color: ", Response);
      },
        error => {
          console.log("error of color:: ", error);

        }
      )
  }
  reminder(item: any, $event) {
    this.reminder = $event;
    console.log("reminder",this.reminder)
    this.model = {
      reminder: this.reminder,
      noteId: item._id
    }
    console.log("nodel reminder",this.model)
    this.noteService.setReminder(this.model)
      .subscribe(Response => {
        this.data.changeMessage(Response)
        this.notificationService.getPermission();
        console.log("data of reminder: ", Response);
      },
        error => {
          console.log("error of reminder:: ", error);

        }
      )
  }
  Label_id: any
  getLabel(item: any, $event) {
    this.Label_id = $event._id;
    console.log("event", $event);
    this.model = {
      "labelId": this.Label_id,
      "noteId": item._id,
      "userId": item.userId
    }
    this.noteService.addLabelToNote(this.model)
      .subscribe(response => {
        this.data1 = response
        console.log("data of color: ", this.data1);
        this.data.changeMessage(this.data1)
        this.snackBar.open('add label successfully', 'End Now', { duration: 3000 })
      },
        error => {
          console.log(error)
          this.snackBar.open('Not added', 'End Now', { duration: 3000 })
        }
      )
  }

}
