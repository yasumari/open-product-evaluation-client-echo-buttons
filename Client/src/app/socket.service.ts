import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs/Subjects';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})


export class SocketService {
  private url = 'http://localhost:3001';
  private socket;

  connect(){
    this.socket=io(this.url);
  }
  disconnect(){
    this.socket.disconnect();
    console.log("Sockets disconnected")
  }

  getMessages(){
    let observable=new Observable(observer=>{
      this.socket.on('message', (data)=>{
        console.log(data.pressedButton + " und " + data.numbers);
        observer.next(data.pressedButton);
      })
  })
  return observable;
  }


  constructor() { }
}
