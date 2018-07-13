import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs/Subjects';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private url = 'http://localhost:3001';
  private socket;

  getMessages(){
    let observable=new Observable(observer=>{
      this.socket=io(this.url);
      this.socket.on('message', (data)=>{
        observer.next(data);
      })
    return ()=>{
      this.socket.disconnect();
    }
  })
  return observable;
  }
  constructor() { }
}
