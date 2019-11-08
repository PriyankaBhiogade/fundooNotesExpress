import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from '../../services/data.service'
import { EditLabeldialogboxComponent } from '../edit-labeldialogbox/edit-labeldialogbox.component';
import { LabelsService } from 'src/app/services/labels.service';
import { BehaviorSubject } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();
  titlename: any;
  gridview: boolean;2
  constructor(public dialog: MatDialog,
    private route: Router,
    private note: NotesService, private dataSharingService: DataSharingService
    , private dataService: DataService, private labelService: LabelsService, private dataService1: DataSharingService) { }
  firstName = localStorage.getItem('firstName')
  lastName = localStorage.getItem('lastName')
  email = localStorage.getItem('email')
  profile: any = localStorage.getItem('profile')
  // img = this.profile;
  labels: Array<any> = [];
  // img = this.profile;
  // message: any
  ngOnInit() {
    this.getLabel();
    this.dataSharingService.image.subscribe(message => {
      this.profile = message
    })
    this.viewUpdate();
  }
  
  logout() {
    localStorage.removeItem('token')
  }
  profileImage(event): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '400px',
      data: event
    });
    dialogRef.afterClosed()
      .subscribe(result => {
      });
  }
  refresh() {
    window.location.reload();
  }
  openDialoglabels(): void {
    const dialogRef = this.dialog.open(EditLabeldialogboxComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  getLabel() {
    this.dataSharingService.currentMessage.subscribe(message => {
      this.labelService.getLabel().subscribe(
        (response: any) => {
          this.labels = response.data
        }
      )
    })
  }

  value: string;
  data: {};
  search: any;
  onEnter(value: string) {
    this.value = value;
    this.data = {
      search: this.value
    }
    this.note.searchNote(this.data).subscribe(
      (response: any) => {
        this.search = response['data']
        this.messageSource.next(this.search);
        this.route.navigate(['dashboard', 'search']);
      },
      error => {
        console.log("error", error);
      }
    )
  }
  viewUpdate() {
    this.dataService.currentMessage.subscribe(
      response => this.gridview = response
    );
  }
  changeView() {
    this.gridview = !this.gridview;
    this.dataService.changeMessage(this.gridview);
  }

  addNote() {
    this.titlename = "FundooNote"
    this.route.navigate(['dashboard', 'addNote']);
  }
  icon() {
    this.titlename = "FundooNote"
    this.route.navigate(['dashboard', 'icon']);
  }
  getNote() {
    this.titlename = "FundooNote"
    this.route.navigate(['dashboard', 'getNotes']);
  }
  archive() {
    this.titlename = "FundooNote"
    this.route.navigate(['dashboard', 'isArchive']);
  }
  trash() {
    this.titlename = "FundooNote"
    this.route.navigate(['dashboard', 'isTrash']);
  }
  reminder() {
    this.titlename = "FundooNote"
    this.route.navigate(['dashboard', 'reminder']);
  }



}
