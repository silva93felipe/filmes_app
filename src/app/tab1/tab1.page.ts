import { IFilmeApi, IListaFilmes } from './../models/IFilmeApi.model';
import { DadosService } from './../services/dados.service';
import { IFilme } from './../models/IFilme.model';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FilmeService } from '../services/filme.service';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public title = 'Filmes';
  public listaVideos: IFilme[] = [
    {
      nome: 'Mortal Kombat',
      lancamento: '15/04/2021 (BR)',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/yaX5hliSF1rwZ9WVNbUchndjFSb.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura'],
      pagina: '/mortal-kombat'
    },

    {
      nome: 'Mortal Kombat',
      lancamento: '15/04/2021 (BR)',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/yaX5hliSF1rwZ9WVNbUchndjFSb.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura'],
      pagina: '/mortal-kombat'
    },

    {
      nome: 'Mortal Kombat',
      lancamento: '15/04/2021 (BR)',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/yaX5hliSF1rwZ9WVNbUchndjFSb.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura'],
      pagina: '/mortal-kombat'
    },
  ];

  public listaFilmes: IListaFilmes;
  public generos: string[] = [];

  constructor(public alertController: AlertController,
              public toastController: ToastController,
              public dadosService: DadosService,
              public filmeService: FilmeService,
              public generoService: GeneroService,
              public route: Router) {}

  buscarFilmes(event: any){
    const busca = event.target.value;
    if(busca && busca.trim() !== ''){
      this.filmeService.buscarFilmes(busca).subscribe(dados =>{
        this.listaFilmes = dados;
      });
    }
  }

  public exibirFilme(filme: IFilmeApi){
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async alertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      // message: 'Message <strong>text</strong>!!!',
      message: 'Deseja realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
              //fazer algo
          }
        }, {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  ngOnInit(): void {
      this.generoService.buscarGeneros().subscribe(dados => {
        dados.genres.forEach(genero => {
          this.generos[genero.id] = genero.name;
        });
      });

      this.dadosService.guardarDados('generos', this.generos);
  }
}
