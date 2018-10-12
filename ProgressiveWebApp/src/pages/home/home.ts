import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ContactProvider, Contact, ContactList } from '../../providers/contact/contact';
import { EditContactPage } from '../edit-contact/edit-contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contacts: ContactList[];

  constructor(public navCtrl: NavController, private contactProvider: ContactProvider, private toast: ToastController ) {

  }

  ionViewDidEnter(){
    this.contactProvider.getAll()
        .then((result) => {
          this.contacts = result;
        });
  }

  addContact(){
    this.navCtrl.push('EditContactPage');
  }

  editContact(item: ContactList){
    this.navCtrl.push(EditContactPage, { key: item.key, contact: item.contact});
  }

  removeContact(item: ContactList){
    this.contactProvider.remove(item.key)
      .then(() => {
        let index = this.contacts.indexOf(item);
        this.contacts.splice(index, 1);

        this.toast.create({ message: 'Contato Removido Com Sucesso!', duration: 3000, position: 'botton'}).present();
      })
  }


   
}
