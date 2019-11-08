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
    return this.httpService.postNote(option);
  }
  updateNote(id,data) {
    var option =
    {
      url :'updateNotes',
      data: data
    }    
    return this.httpService.postNote(option);
  }
  getAllNotes(){
    var option =
    {
      url :'getAllNotes'   
    }    
    return this.httpService.getNote(option); 
  }
  getAllReminderNotes(){
    var option =
    {
      url :'getAllReminderNotes'   
    }    
    return this.httpService.getNote(option); 
    
  }
  getAllArchiveNotes(){
    var option =
    {
      url :'getAllIsArchiveNotes'   
    }    
    return this.httpService.getNote(option); 
  }
  getAllTrashNotes(){
    var option =
    {
      url :'getAllIsTrashNotes'   
    }    
    return this.httpService.getNote(option); 
  
  }
  setColor(data){
    var option =
    {
      url :'color',
      data: data
    }    
    return this.httpService.postNote(option);
  }
  setReminder(data){
    var option =
    {
      url :'reminder',
      data: data
    }    
    return this.httpService.postNote(option);
  }
  
  setArchive(data){
    var option =
    {
      url :'isArchive',
      data: data
    }    
    return this.httpService.postNote(option);
  }
  setdelete(data){
    var option =
    {
      url :'isTrash',
      data: data
    }    
    return this.httpService.postNote(option);
  }
  addLabelToNote(data){
    var option =
    {
      url :'addLabelToNotes',
      data: data
    }    
    return this.httpService.postNote(option);
  }
  searchNote(data){
    var option =
    {
      url :'search',
      data: data
    }    
    return this.httpService.postNote(option);
  }
  
  }
  

