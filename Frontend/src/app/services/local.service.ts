import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  get(key:any) {
    return localStorage.getItem(key);
  }

  set(name:any,token: any) {
    localStorage.setItem(name, token);
  }

  remove() {
    localStorage.removeItem('token');
  }
}
