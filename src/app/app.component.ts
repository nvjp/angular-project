import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.apiService.getPosts().subscribe(res => console.log(res));
  }
}
