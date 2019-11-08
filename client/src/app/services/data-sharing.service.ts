import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  

  constructor() { }
  @Output() image = new EventEmitter();

  changeMessage(message: string) {
    
    this.messageSource.next(message);
  }
  uploadProfile(message :string){
    this.image.emit(message);
  }
}
