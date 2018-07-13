import { Component, OnInit } from '@angular/core';
import { SocketServiceService} from './socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SocketServiceService]
})
export class AppComponent implements OnInit{
  messages=[];
  connection;
  message; 

  constructor(private socketService: SocketServiceService){}

  ngOnInit(): void{
  this.connection=this.socketService.getMessages().subscribe(message=>{
    console.log(message);
    this.messages.push(message);
  })    
  }


} 
