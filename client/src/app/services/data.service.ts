import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private messageSource = new BehaviorSubject('');
  
  currentMessage = this.messageSource.asObservable();

  constructor() { }
  @Output() image = new EventEmitter();

  changeMessage(message: string) {
    console.log("messsdfsdge",message)
    this.messageSource.next(message)
  }
  uploadProfile(message :string){
    this.image.emit(message);
  }

}
