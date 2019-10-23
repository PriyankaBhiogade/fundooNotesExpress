import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentView: any;

  constructor(private httpService: HttpService) { }
  register(data) {
    const option =
    {
      url :'register',
      data: data
    }
    console.log("service",option);
    
    return this.httpService.postReq(option);
  }
  login(data){
    console.log("service",data);
    
    const option =
    {
      url :'login',
      data: data
    }
    return this.httpService.postReq(option);
  }
  forgotPassword(data){
  
    const option =
    {
      url :'forgotPassword',
      data: data
    }
    return this.httpService.postReq(option);
  }
  reset(token,data){
    console.log("token",token);
    
    const option =
    {
      url :'reset/'+token,
      data: data
    }
    return this.httpService.userWithToken(token,option);
  }
  profile(data){
    const option =
    {
      url :'upload',
      data: data
    }
    return this.httpService.postNote(option);
  }
  }


