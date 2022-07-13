import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor() { }

  buscarGifs(query: string = ''): void {
    query = query.toLowerCase();
    if (!this._historial.includes(query) && query.length != 0) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
  }


} 
