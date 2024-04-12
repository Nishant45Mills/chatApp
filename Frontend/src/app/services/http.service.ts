import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private token: LocalService) {}

  post(normalUrl: any, payload: any) {
    return this.http.post(`${this.baseUrl}${normalUrl}`, payload);
  }

  get(normalUrl: any) {    
    const headers = { Authorization: `Bearer ${this.token.get()}` };
    return this.http.get(`${this.baseUrl}${normalUrl}`, { headers });
  }
}
