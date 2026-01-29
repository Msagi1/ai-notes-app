import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AiService {
  private url = 'https://ai-notes-server-hl9r.onrender.com/ai';

  constructor(private http: HttpClient) {}

  ask(prompt: string): Observable<{ output: string }> {
    return this.http.post<{ output: string }>(this.url, { prompt });
  }
}