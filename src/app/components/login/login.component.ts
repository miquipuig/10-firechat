import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent  {

  constructor(public cs: ChatService ) { }

  ingresar( proveedor: string ) {
  
    this.cs.login(proveedor);
    console.log(proveedor);
  }

}
