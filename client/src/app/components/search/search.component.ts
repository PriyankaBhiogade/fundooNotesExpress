import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSnackBar } from '@angular/material';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  model: { "labelId": any; "noteId": any; "userId": any; };
  data1: any;

  constructor(private dashboardService: DashboardComponent ,private snackBar: MatSnackBar,
    private noteService: NotesService,) { }
  searhNotes: any;
  ngOnInit() {
    this.dashboardService.currentMessage.subscribe(
      (response: any) => {
        this.searhNotes = response;
        console.log(this.searhNotes)

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
