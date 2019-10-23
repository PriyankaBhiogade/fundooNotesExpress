import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from '../../services/data.service'

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
    private note: NotesService, private dataService: DataService) { }
  firstName = localStorage.getItem('firstName')
  lastName = localStorage.getItem('lastName')
  email = localStorage.getItem('email')
  profile = localStorage.getItem('profile')
  
  // message: any
  img = this.profile;
  ngOnInit() {
    this.dataService.image.subscribe((data:any) =>{
      this.profile = data
      console.log("datdata",this.profile)
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
