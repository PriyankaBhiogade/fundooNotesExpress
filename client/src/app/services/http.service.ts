import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl;
  url = environment.url;
  constructor(private http: HttpClient) { }
  public postReq(options): any {
    console.log("adsdads", options.data);
    
    return this.http.post( this.url+options.url , options.data);
  }
  userWithToken(token,options) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token':  localStorage.getItem('access_token'),
        'data':options.data
      })
    };
    console.log('token in Http service resetpassword :', token);
    console.log("data",options.data);
    return this.http.post(this.url+'reset/:token',options.data,httpOptions);
  }
}
