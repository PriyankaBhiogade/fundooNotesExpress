import { Component, OnInit } from '@angular/core';
import { noteModel } from 'src/app/models/notes';
import { MatSnackBar } from '@angular/material';
import { NotesService } from  '../../services/notes.service'
@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  flag = true
  note : noteModel = new noteModel();
  constructor(private snackBar: MatSnackBar, 
    private noteService: NotesService) { }
  
  ngOnInit() {
  }
  onOptionClick() {
    this.flag = !this.flag;
  }
  close()
  {
    this.flag = false;
    if (this.note.title != null) {
      console.log("model data",this.note)
      this.noteService.createNote(this.note).subscribe(
        (response: any) => {
          console.log("response",response)
          this.snackBar.open(
            "Note is created Successfully", "",
            { duration: 2500 }
          )
        }
      )
    }
    else{
      this.snackBar.open(
        "Title is not empty", "",
        { duration: 2500 }
      )
    }
  }

 

}
