import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private httpService: HttpService) { }
  createLabel(data){
    const option =
    {
      url :'createLabel',
      data: data
    }
    console.log("service",option.data);
    
    return this.httpService.postLabel(option);
  }
  getLabel(){
    const option =
    {
      url :'getAllLabel'     
    }
    return this.httpService.getLabel(option);
  }
  
    deleteLabel(noteId, data)
    {
      const option = 
      {
        url : 'deleteLabel',
        data : data
      }
      return this.httpService.putRequest(option)
    }
    updateLabel(noteId,data){
      const option = 
      {
        url : 'updateLabel',
        data : data
      }
      return this.httpService.putRequest(option)
    }
  }
  
  

