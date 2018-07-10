import { Component, OnInit } from '@angular/core';
//import * as socketIo from 'socket.io-client';

import { Observable, of } from 'rxjs'
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {//implements OnInit{
  //title = 'app';
   private socket;
  ngOnInit(): void{
    // this.socket  = socketIo('http://localhost:3000');
    console.log('I am in ngInit method');
 //   socket.on('hello', (data)=> console.log(data));
 this.socket = io('http://localhost:3000');
 this.getMessages();

  }

    getMessages() {
      console.log('I am in getMsg method');

      this.socket.on('message', (data) => {
        console.log(data);
      });
      return () => {
        this.socket.disconnect();
      };  
  
  }
} 
