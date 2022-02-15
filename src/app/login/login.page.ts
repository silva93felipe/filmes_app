import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public senha: string;
  public teste = 'dfsdfds';

  constructor(public toastController: ToastController, private route: Router) { }

  ngOnInit() {
  }

  public login(){
    if (this.email === 'admin' && this.senha === 'admin'){
      this.route.navigateByUrl('/tabs/filmes');
      this.presentToast('Seja Bem Vindo!', 'success');
    }else{
      this.presentToast('Usuário ou senha inválidos!', 'danger');
    }
  }

  async presentToast(text: string, cor: string) {
    const toast = await this.toastController.create({
      message: text,
      color: cor,
      duration: 2000
    });
    toast.present();
  }

}
