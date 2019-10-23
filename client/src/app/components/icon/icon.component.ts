import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  colorArray:any=[]
  @Output() changeReminder: EventEmitter<any> = new EventEmitter();
  @Output() changeColor: EventEmitter<any> = new EventEmitter();
  @Output() changeLabel: EventEmitter<any> = new EventEmitter();

  @Input() noteData:any;
  model:any;
  color: any;
  flag=false;
  labels: Object;
  checked:any
  constructor(private noteService: NotesService) { }

  ngOnInit() {
    // this.onclick() 
  //  this.colorArray=[
  //    [
  //    { "name":"WHITE","hexcode":"#FFFFFF"},
  //    {"name":"RED","hexcode":"#FF0000"},
  //    {"name":"MEDIUMVIOLETRED","hexcode":"#C71585"},
  //    {"name":"YELLOW","hexcode":"#FFFF00"}  ],

  //    [
  //    { "name":"DARKRED","hexcode":"#8B0000"},
  //    {"name":"PURPLE","hexcode":"#800080"},
  //    {"name":"DARKGREEN","hexcode":"#006400"},
  //    {"name":"NAVY","hexcode":"#000080"}  ],

  //    [
  //     { "name":"DARKKHAKI","hexcode":"#BDB76B"},
  //     {"name":"CADETBLUE","hexcode":"#5F9EA0"},
  //     {"name":"ROSYBROWN","hexcode":"ROSYBROWN"},
  //     {"name":"DARKSLATEGRAY","hexcode":"#2F4F4F"}  ]
  //  ]
  }
  setColor(colors){
    this.changeColor.emit(colors) 
  }

  tomorrowDate(){
  
  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  var time = " 8:00:00";
  var tomorrowDate =  month + "-" + day + "-" + year+ time;
 console.log( "TomorrowDate ==> ",day + "-" + month + "-" + year+ time)
 this.changeReminder.emit(tomorrowDate)
 }
//  var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  nextWeek() {
    var currentDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var time = " 20:00:00";
    var nextWeek = month + "-" +day  + "-" + year+ time;
   console.log( "nextWeek ==> ",nextWeek)
   this.changeReminder.emit(nextWeek)
}
currentDate(){
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var time = " 20:00:00";
var currentDate = mm + '-' + dd + '-' + yyyy +'-'+ time;
console.log("current date ==>",currentDate);

this.changeReminder.emit(currentDate)

}
// archive(){
  
//   this.model = {
//     isArchive: this.flag=true,
//     id:this.noteData.id,
//     fundooUserId:localStorage.getItem('userid')
//   }
//   console.log("archive", this.model);
//   this.noteService.setArchive(this.model)
//     .subscribe(Response => {
//       console.log("data of set archive: ", Response);
//     },
//       error => {
//         console.log("error of archive:: ", error);

//       }
//     )
// }

// delete(){
  
//   this.model = {
//     isTrash: this.flag=true,
//     id:this.noteData.id,
//     fundooUserId:localStorage.getItem('userid')
//   }
//   console.log("delete", this.model);
//   this.noteService.setdelete(this.model)
//     .subscribe(Response => {
//       console.log("data of set delete: ", Response);
//     },
//       error => {
//         console.log("error of delete:: ", error);

//       }
//     )
// }
// onclick() {
  
//   this.labelservice.getLabel()
//     .subscribe(response => {
//       //console.log("dataaaa",response);
//       // this.label = response;
//       this.labels = response;
//       // console.log("data of getAlllabels11111: ", this.labels);
//     },
//       error => {
//         console.log("error of getAllNotes: ", error);

//       }
//     )

//     }
//     setLabel(item){
//      this.changeLabel.emit(item) 
//       console.log("data of getAlllabels111111111111: ", item);
    
//     }

}
