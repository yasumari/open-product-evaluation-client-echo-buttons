import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './Services/socket.service';
import { Subscription } from 'rxjs';
import { MessageService } from './Services/message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnDestroy{
  sub: Subscription;
  subscription: Subscription;

  title = 'app';
  constructor(private socketService: SocketService, private messageService: MessageService){}
  

  ngOnInit(){

    this.socketService.connect();
    /**
     * Socket Connection, eingehende Nachricht an MessageService übergeben, 
     * subscription der einzelnen Komponenten
     */
    this.socketService.getMessages().subscribe((message: string) => {
      this.messageService.sendMessage(message);
  })
   
  }
  ngOnDestroy(){
  }
}
