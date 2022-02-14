import { IGenero, IListaGenero } from './../models/IGenero.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  public lingua = 'pt-BR';
  private apiUrl = 'https://api.themoviedb.org/3/';
  private key = '?api_key=11aab4c6c8a3d8c6573037e4c76ef8ea';

  constructor(private http: HttpClient, public toastController: ToastController) { }

  buscarGeneros(): Observable<IListaGenero>{
    const url = `${this.apiUrl}genre/movie/list${this.key}&language=${this.lingua}`;

    return this.http.get<IListaGenero>(url).pipe(
      map(ret => ret),
      catchError(erro => this.exibeErro(erro))
    );
  }

  async exibeErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao buscar filmes',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}
