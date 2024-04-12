import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  get() {
    return localStorage.getItem('token');
  }

  set(name:any,token: any) {
    localStorage.setItem(name, token);
  }

  remove() {
    localStorage.removeItem('token');
  }
}
