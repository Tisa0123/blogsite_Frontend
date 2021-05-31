
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload } from '../components/login-payloads';
import { UserDetails } from '../components/user-details-payload';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http:HttpClient) { }
  
  public url="http://localhost:8080/";

  public generateToken(loginPayload : LoginPayload){
    debugger
    return this.http.post(this.url+"authenticate",loginPayload,{responseType:'text'as 'json'});
  }

  loginUser(token:String){
    localStorage.setItem("token",token.toString());
    return true;
  }

  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token==undefined || token ==null || token ==''){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    return true;
  }

  public hello(token: string){
    let tokenStr="Bearer "+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(this.url+"hello",{headers,responseType:'text'as 'json'});
  }
  public userDetails(userDetails:UserDetails){
    let tokenStr="Bearer "+localStorage.getItem("token");
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(this.url+"profile/getUserDetails",{headers,responseType:'text'as 'json'});
  }
}

