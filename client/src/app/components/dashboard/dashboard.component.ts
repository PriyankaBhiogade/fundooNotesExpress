import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from '../../services/data.service'
import { EditLabeldialogboxComponent } from '../edit-labeldialogbox/edit-labeldialogbox.component';
import { LabelsService } from 'src/app/services/labels.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  titlename: any;
  gridview: boolean;
  constructor(public dialog: MatDialog,
    private route: Router,
    private note: NotesService, private dataService: DataService, private labelService: LabelsService, ) { }
  firstName = localStorage.getItem('firstName')
  lastName = localStorage.getItem('lastName')
  email = localStorage.getItem('email')
  profile = localStorage.getItem('profile')
  labels: any[];
  // message: any
  img = this.profile;
  ngOnInit() {
    this.getLabel();
    this.dataService.image.subscribe((data: any) => {
      this.profile = data
      console.log("datdata", this.profile)
    })
    // console.log("messege",this.message)
    this.viewUpdate();
  }

  profileImage(event): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '400px',
      data: event
    });
    dialogRef.afterClosed()
      .subscribe(result => {

        // this.img = localStorage.getItem("profile")
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
    this.labelService.getLabel().subscribe(
      (response: any) => {
        console.log("response", response)
        this.labels = response.data
        console.log("labels", this.labels)
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
