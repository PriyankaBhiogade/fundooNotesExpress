import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor( private snackBar: MatSnackBar,
    private noteService: NotesService,) {
   }
   notes: Array<any> = [];
  @Input() NotesArray
  ngOnInit() {
    console.log("data",this.NotesArray)
  }
  getNote() {
  
    this.noteService.getAllNotes().subscribe(
      (response: any) => {
        this.notes = response.data
        // this.notee = response.result.label
      }
    )
  }
}
