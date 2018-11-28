import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';


@IonicPage()
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage {
  model: Contact;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactProvider: ContactProvider, private toast: ToastController ) {
 
    if(this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Contact();
    }
 }

 save(){
    if(this.model.name !== "" &&
       this.model.lastName !== "" && 
       this.model.phone !== null &&
       this.model.email !== "" && 
       this.model.birth !== null){
      this.saveContact()
        .then(() => {
          this.toast.create({ message: 'Contato Salvo.', duration: 3000, position: 'botton' }).present();
          this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao Salvar o Contato.', duration: 3000, position: 'botton' }).present();
        })
    } else {
      this.toast.create({ message: 'Favor preencher todos os campos!', duration: 3000, position: 'botton'}).present();
    }
 }

 private saveContact(){
    if(this.key){
      return this.contactProvider.update(this.key, this.model);
    } else {
      return this.contactProvider.insert(this.model);
    }
 }

}
