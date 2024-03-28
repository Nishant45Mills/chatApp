import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  post(normalUrl: any, payload: any) {
    return this.http.post(`${this.baseUrl}${normalUrl}`, payload);
  }
}
