import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../Services/message.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-button-register',
  templateUrl: './button-register.component.html',
  styleUrls: ['./button-register.component.css']
})
export class ButtonRegisterComponent implements OnInit {
sub: Subscription;
  constructor(private messageService: MessageService, private router: Router) { 
    this.sub=this.messageService.getMessage().subscribe( message => {
      console.log("Liste: " + message);
      this.router.navigate(['/']);
  })
}


  ngOnInit() {
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
