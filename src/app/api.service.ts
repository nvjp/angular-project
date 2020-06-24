import { Injectable } from '@angular/core';
import { IPosts } from './posts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public Base_Url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPosts[]> {
    return this.http.get<IPosts[]>(this.Base_Url);
  }
}
