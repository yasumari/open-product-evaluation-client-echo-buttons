import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable({
  providedIn: 'root'
})

export class MessageService {
    private subject = new Subject<string>();
 
    /**
     * Message subscriben
     * @param message übermittelte Nachricht von der Socket-Kommunikation
     */
    sendMessage(message: string) {
        this.subject.next(message);
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}