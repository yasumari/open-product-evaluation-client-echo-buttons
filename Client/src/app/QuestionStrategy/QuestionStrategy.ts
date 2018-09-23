import { Apollo } from 'apollo-angular';
import { Renderer2 } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';

export abstract class QuestionStrategy {
    abstract answer(router: Router, apollo: Apollo, answerQuestion: any, buttonNumber: number, renderer: Renderer2, dataService: DataService): void;
    abstract support(type: string): boolean;
}