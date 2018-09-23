import { Injectable, Inject, Renderer2 } from "@angular/core";
import { QuestionStrategy } from "../../QuestionStrategy/QuestionStrategy";
import { Apollo } from "apollo-angular";
import { DataService } from "../../Services/data.service";
import { Router } from "@angular/router";

@Injectable()
export class QuestionService {

    constructor(private router: Router, private renderer:Renderer2, private dataservice: DataService, private apollo: Apollo, @Inject(QuestionStrategy) private strategies: Array<QuestionStrategy>) {
    }

    answer(type:string, answerQuestion: any, buttonNumber: number, apollo: Apollo, renderer: Renderer2, dataservice:DataService, router: Router): void {
        const strategy = this.strategies.find((strategy) => {
            //console.log(strategy);
            return strategy.support(type);
        });
        strategy.answer(router, apollo, answerQuestion, buttonNumber, renderer, dataservice);
    }
}