import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
@Injectable()
export class ContactProvider {

  constructor(private storage: Storage, private datepipe: DatePipe ) {}

  public insert(contact: Contact){
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, contact);
  }

  public update(key: string, contact: Contact){
    return this.save(key, contact);
  }

  private save(key: string, contact: Contact){
    return this.storage.set(key,contact);
  }

  public remove(key: string){
    return this.storage.remove(key)
  }

  public getAll() {
    let contacts: Contactlist[] = [];
    this.storage.forEach((value: Contact, key: string, itrationNumber: Number) => {
      let contact = new Contactlist();
      contact.key = key;
      contact.contact = value;
      contacts.push(contact);
    })
      .then(() => {
        return Promise.resolve(contacts);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}

export class Contact{
  name: string;
  phone: number;
  birth: Date;
  active: boolean;
}

export class Contactlist{
 key: string;
 contact: Contact;
}
