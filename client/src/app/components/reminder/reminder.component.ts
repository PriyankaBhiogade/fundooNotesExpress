import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  @Output() changeReminder: EventEmitter<any> = new EventEmitter();
  constructor(private notesService: NotesService) { }
  @Input()noteData:any;
  model:any;
  flag=false;
  notes: any[];
  ngOnInit() {

    this.notesService.getAllNotes()
    .subscribe(Title => {
      console.log("data of getAllNotes Reminder: ", Title);
      this.notes = Title['Title']

    },
      error => {
        console.log("error of getAllNotes Reminder: ", error);

      }
    )
}
}
