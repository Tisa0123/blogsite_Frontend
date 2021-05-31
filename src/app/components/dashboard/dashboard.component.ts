import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
posts:any;
  constructor(private postSetvice :PostService) { }

  ngOnInit(): void {
    debugger
    this.postSetvice.getAllPosts().subscribe(
      (response : any)=>{
         this.posts=JSON.parse(response);
         console.log(this.posts);
       
      },
      error=>{
      console.log(error.message);
      }
      
    )
  }

}
