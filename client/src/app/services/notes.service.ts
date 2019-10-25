import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  
  constructor(private httpService: HttpService) { }
  createNote(data){
    var option =
    {
      url :'createNotes',
      data: data
    }
    console.log("service",option);
    
    return this.httpService.postNote(option);
  }
  updateNote(id,data) {
    var option =
    {
      url :'updateNotes',
      data: data
    }
    console.log("service",option.data);
    
    return this.httpService.postNote(option);
  }
  getAllNotes(){
    var option =
    {
      url :'getAllNotes'   
    }
    console.log("service",option);
    
    return this.httpService.getNote(option); 
  }
  getAllReminderNotes(){
    var option =
    {
      url :'getAllReminderNotes'   
    }
    console.log("service",option);
    
    return this.httpService.getNote(option); 
    
  }
  getAllArchiveNotes(){
    var option =
    {
      url :'getAllIsArchiveNotes'   
    }
    console.log("service",option);
    
    return this.httpService.getNote(option); 
  }
  getAllTrashNotes(){
    var option =
    {
      url :'getAllIsTrashNotes'   
    }
    console.log("service",option);
    
    return this.httpService.getNote(option); 
  
  }
  setColor(data){
    var option =
    {
      url :'color',
      data: data
    }
    console.log("service",option.data);
    
    return this.httpService.postNote(option);
  }
}
