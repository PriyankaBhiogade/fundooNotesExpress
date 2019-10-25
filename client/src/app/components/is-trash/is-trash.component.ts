import { Component, OnInit, Input } from '@angular/core';
import { noteModel } from 'src/app/models/notes';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';
import { CreateNoteDialogboxComponent } from '../create-note-dialogbox/create-note-dialogbox.component';

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
  notes:[] ;
  notee:any
  gridview:boolean;
  model: any
  dialog: any;
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
    this.noteService.getAllTrashNotes().subscribe(
      (response: any) => {
        console.log("response ------>",response)

        this.notes = response.data
        console.log("dbfhjsdfvg",this.notes)
        // this.notee = response.result.label
      }
    )
  }
  item : any[];
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
    console.log("color",this.color)
    console.log("idnote",item);
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
}
