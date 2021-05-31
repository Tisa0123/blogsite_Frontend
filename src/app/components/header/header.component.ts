import { Component, HostListener, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public loggedIn=false;
public userName='';
  constructor(private jwtservice:JwtService,private route:Router) { }

  ngOnInit(): void {
    debugger
    this.loggedIn=this.jwtservice.isLoggedIn();
    var user:any=localStorage.getItem("userDetails");
    var userDetails=JSON.parse(user);
    if(userDetails!=null ||userDetails!=undefined){
      this.userName="Hello "+userDetails.userName;
      console.log( userDetails);
    }
  }
  logOutUser(){
    this.route.navigateByUrl('').then(() => {
      window.location.reload();
  });
    this.jwtservice.logout();
  }
  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }


}
