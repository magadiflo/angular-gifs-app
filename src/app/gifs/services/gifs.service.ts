import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Gif, SearchGifsResponse } from '../interface/gifs-api-tipado.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  resultados: Gif[] = [];
  private readonly apiKey: string = '3ZFhGljhvA8ctX3W29sNy5xCrjAqBwLE';
  private readonly apiGif: string = 'http://api.giphy.com';
  private _historial: string[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = ''): void {
    query = query.toLowerCase();
    if (!this._historial.includes(query) && query.length != 0) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      //* Almacena el historial de búsqueda en el localStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(`${this.apiGif}/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe(resp => {
        console.log(resp.data);
        this.resultados = resp.data;

        //* Guardando el último resultado de búsqueda
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }


} 
