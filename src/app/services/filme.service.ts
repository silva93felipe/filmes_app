import { IListaFilmes } from './../models/IFilmeApi.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  public lingua = 'pt-BR';
  public regiao = 'BR';
  private apiUrl = 'https://api.themoviedb.org/3/';
  private key = '?api_key=11aab4c6c8a3d8c6573037e4c76ef8ea';

  constructor(private http: HttpClient, public toastController: ToastController) { }

  buscarFilmes(busca: string): Observable<IListaFilmes>{
    const url = `${this.apiUrl}search/movie${this.key}&language=${this.lingua}&region=${this.regiao}&query=${busca}`;

    return this.http.get<IListaFilmes>(url).pipe(
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
