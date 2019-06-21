import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Mensaje } from '../interface/mensaje.interface';

// import { Observable } from 'rxjs';
 import { map } from 'rxjs/operators';
// import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {
 
  }

  cargarMensajes() {
    // this.itemsCollection = this.afs.collection<Mensaje>('chats');
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
        map( (mensajes: Mensaje[]) => {
            console.log(mensajes);
            this.chats = [];
            for (let mensaje of mensajes){
              this.chats.unshift(mensaje);
            }
            return this.chats; //opcional
        })
    );
  }
//TODO falta el UID del usuario
  agregarMensaje( texto: string){
    let mensaje: Mensaje = {
    nombre: 'Demo',
    mensaje: texto,
    fecha: new Date().getTime()
    };
    return this.itemsCollection.add(mensaje);
  }
}

