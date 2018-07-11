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
    console.log("Wird disconnected")
  }

  getMessages(){
    
    let observable=new Observable(observer=>{
      this.socket.on('message', (data)=>{
        observer.next(data);
      })
    // return ()=>{
    //   this.socket.disconnect();
    // }
  })
  return observable;
  }


  constructor(private dataService: DataService) { }
}
