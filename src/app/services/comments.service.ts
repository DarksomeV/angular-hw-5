import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { Comment } from "../models/comments";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiUrl = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }

  getComments(id: number):Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.apiUrl}	/comments?postId=${id}`);
  }
}
