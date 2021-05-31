import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../services/jwt.service';
import {LoginPayload} from '../login-payloads';
import {Router} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserDetails } from '../user-details-payload';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loginPayload!: LoginPayload;
  userDetails!:UserDetails ;
  token:any;
  success=1;

  constructor(private formBuilder:FormBuilder,private jwtservice:JwtService,private route:Router) { 
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      credential: '',
      password: ''
    };
    this.userDetails = {
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        birthMonth: '',
        birthYear: '',
        street: '',
        state: '',
        country: '',
        zipCode: '',
        contact: '',
        profilePic: '',
        userName: '',
        role: ''
    };
  }

  ngOnInit(): void {

  }
public onSubmit(){
  debugger
  this.loginPayload.credential = this.loginForm.get('username')?.value;;
  this.loginPayload.password = this.loginForm.get('password')?.value;
  this.jwtservice.generateToken(this.loginPayload).subscribe(
    (respose : any)=>{
      if(respose=="Incorrect credential or password!"){
        (<HTMLLabelElement>document.getElementById("token")).innerHTML=respose.toString();
        this.success=0;
      }else{
        debugger
        let token=JSON.parse(respose).jwt;
        this.jwtservice.loginUser(token);
        this.jwtservice.userDetails(this.userDetails).subscribe((res:any)=>{
          console.log(JSON.parse(res));
          let obj=JSON.parse(res);
          localStorage.setItem("userDetails",JSON.stringify(obj));

          (<HTMLLabelElement>document.getElementById("token")).innerHTML="successful";
          this.success=1;
          this.route.navigate(['/dashboard']).then(() => {
              window.location.reload();
          });

          
        });
      
      }
     
    },
    error=>{
      (<HTMLLabelElement>document.getElementById("token")).innerHTML=error.error;
      this.success=0;
    }
    
  )
 
}
}

// data=> {
//   if(data=="Incorrect credential or password!"){
//     (<HTMLLabelElement>document.getElementById("token")).innerHTML=data.toString();
//   }else{
//     this.token=data;
//     (<HTMLLabelElement>document.getElementById("token")).innerHTML=JSON.parse(this.token).jwt;
//     this.route.navigate(['/home']);
//   }