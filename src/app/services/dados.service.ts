import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private dados: any = [];

  constructor() { }

  guardarDados(index: string, dados: any): boolean{
    if(index){
      this.dados[index] = dados;
      return true;
    }
    return false;
  }

  pegarDados(index: string): any {
    if(index){
      return this.dados[index];
    }
    return null;
  }

  deletarDados(index: string): boolean{
    return delete this.dados[index];
  }
}
