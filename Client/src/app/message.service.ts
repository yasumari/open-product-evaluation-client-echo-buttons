import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable({
  providedIn: 'root'
})

export class MessageService {
    private subject = new Subject<string>();
 
    sendMessage(message: string) {
        console.log("gesendet: " + message);
        this.subject.next(message);
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}