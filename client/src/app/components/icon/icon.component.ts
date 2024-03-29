import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { noteModel } from 'src/app/models/notes';
import { LabelsService } from 'src/app/services/labels.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  colorArray: any = []
  @Output() changeReminder: EventEmitter<any> = new EventEmitter();
  @Output() changeColor: EventEmitter<any> = new EventEmitter();
  @Output() changeLabel: EventEmitter<any> = new EventEmitter();

  @Input() noteData: any;
  model: any;
  color: any;
  flag = false;
  labels: any[];
  checked: any
  constructor(private noteService: NotesService, private labelService: LabelsService, private data: DataSharingService) { }

  ngOnInit() {
    this.onclick();
    this.colorArray = [
      [
        { "name": "WHITE", "hexcode": "#FFFFFF" },
        { "name": "MAROON", "hexcode": "#800000" },
        { "name": "TEAL", "hexcode": "#008080" },
        { "name": "YELLOW", "hexcode": "#FFFF00" }],

      [
        { "name": "INDIANRED", "hexcode": "#CD5C5C" },
        { "name": "DARKKHAKI", "hexcode": "#BDB76B" },
        { "name": "PLUM", "hexcode": "#DDA0DD" },
        { "name": "PALEVIOLETRED", "hexcode": "#DB7093" }],

      [
        { "name": "LIGHTCORAL", "hexcode": "#F08080" },
        { "name": "CADETBLUE", "hexcode": "#5F9EA0" },
        { "name": "ROSYBROWN", "hexcode": "ROSYBROWN" },
        { "name": "DARKSLATEGRAY", "hexcode": "#2F4F4F" }]
    ]
  }
  setColor(colors) {
    this.changeColor.emit(colors)
  }

  tomorrowDate() {

    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var time = " 8:00:00";
    var tomorrowDate = month + "-" + day + "-" + year + time;
    console.log("TomorrowDate ==> ", day + "-" + month + "-" + year + time)
    this.changeReminder.emit(tomorrowDate)
  }
  //  var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  nextWeek() {
    var currentDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var time = " 20:00:00";
    var nextWeek = month + "-" + day + "-" + year + time;
    console.log("nextWeek ==> ", nextWeek)
    this.changeReminder.emit(nextWeek)
  }
  currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var time = " 20:00:00";
    var currentDate = mm + '-' + dd + '-' + yyyy + '-' + time;
    console.log("current date ==>", currentDate);

    this.changeReminder.emit(currentDate)

  }
  // note: noteModel = new noteModel();
  archive(note) {
    note = {
      isArchive: this.flag = true,
      _id: this.noteData._id,
      userid: localStorage.getItem('userId')
    }
    this.noteService.setArchive(note)
      .subscribe(Response => {
        this.data.changeMessage(Response)
      },
        error => {
          console.log("error of archive:: ", error);
        }
      )
  }

  delete(note) {
    note = {
      isTrash: this.flag = true,
      _id: this.noteData._id,
      userid: localStorage.getItem('userId')
    }
    console.log("delete", note);
    this.noteService.setdelete(note)
      .subscribe(Response => {
        this.data.changeMessage(Response)
      },
        error => {
          console.log("error of delete:: ", error);
        }
      )
  }
  onclick() {
    this.labelService.getLabel()
      .subscribe(response => {
        //  this.label = response;
        this.labels = response.data;
        // this.data.changeMessage(response.data)

      },
        error => {
          console.log("error of getAllNotes: ", error);
        }
      )
  }
  setLabel(item) {
    this.changeLabel.emit(item)
    console.log("data of getAlllabels:", item);
  }

}
