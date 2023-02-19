import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../Model/Person";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  // the url to the backend
  apiUrl = 'http://localhost:8080/api/people';
  constructor(
    private http:HttpClient
  ) { }
  // function to bring all the people from backend
  getPeopleByPage(page: number): Observable<Person[]> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<Person[]>(url);
  }
}
