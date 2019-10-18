import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }
  register(data) {
    var option =
    {
      url :'register',
      data: data
    }
    console.log("service",option);
    
    return this.httpService.postReq(option);
  }
  login(data){
    console.log("service",data);
    
    var option =
    {
      url :'login',
      data: data
    }
    return this.httpService.postReq(option);
  }
  forgotPassword(data){
  
    var option =
    {
      url :'forgotPassword',
      data: data
    }
    return this.httpService.postReq(option);
  }
  reset(token,data){
    console.log("token",token);
    
    var option =
    {
      url :'reset/'+token,
      data: data
    }
    return this.httpService.userWithToken(token,option);
  }
  }


