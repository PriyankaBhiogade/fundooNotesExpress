import { Component, OnInit, Input } from '@angular/core';
import { noteModel } from 'src/app/models/notes';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';
import { CreateNoteDialogboxComponent } from '../create-note-dialogbox/create-note-dialogbox.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-is-trash',
  templateUrl: './is-trash.component.html',
  styleUrls: ['./is-trash.component.scss']
})
export class IsTrashComponent implements OnInit {


  @Input() noteData: any
  public dialogRef: any
  message: string;

  note: noteModel = new noteModel();
  notes: Array< any> = [];
  notee: any
  gridview: boolean;
  model: any
  dialog: any;
  data1: any;
  constructor(private snackBar: MatSnackBar,
    private noteService: NotesService,
    public matDialog: MatDialog,
    private dataService: DataService,
    private data:DataSharingService

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
    this.data.currentMessage.subscribe(message =>{
    this.noteService.getAllTrashNotes().subscribe(
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
      console.log('The dialog was closed');
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
      },
        error => {
          console.log("error of color:: ", error);
        }
      )
  }
  Lable_id: any
  getLabel(item: any, $event) {
    this.Lable_id = $event._id;
    console.log("event", $event);
    this.model = {
      "labelId": this.Lable_id,
      "noteId": item._id,
      "userId": item.userId
    }
    this.noteService.addLabelToNote(this.model)
      .subscribe(response => {
        this.data1 = response
        console.log("label",response)
        this.data.changeMessage(response)
        this.snackBar.open('add label successfully', 'End Now', { duration: 3000 })
      },
        error => {
          console.log(error)
          this.snackBar.open('Not added', 'End Now', { duration: 3000 })
        }
      )
  }
}
