import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  public url="http://localhost:8080/";

  public getAllPosts(){
   let token=localStorage.getItem("token");
   let tokenStr="Bearer "+token;
   const headers=new HttpHeaders().set("Authorization",tokenStr);
   return this.http.get(this.url+"post/getAllPost",{headers,responseType:'text'as 'json'});
 }
}
