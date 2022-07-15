import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //TODO: Cambiar any por su tipo correspondiente
  resultados: any[] = [];
  private readonly apiKey: string = '3ZFhGljhvA8ctX3W29sNy5xCrjAqBwLE';
  private readonly apiGif: string = 'http://api.giphy.com';
  private _historial: string[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { }

  buscarGifs(query: string = ''): void {
    query = query.toLowerCase();
    if (!this._historial.includes(query) && query.length != 0) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get(`${this.apiGif}/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });

  }


} 
