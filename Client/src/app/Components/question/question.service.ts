import { Injectable, Inject, Renderer2 } from "@angular/core";
import { QuestionStrategy } from "../../QuestionStrategy/QuestionStrategy";
import { Apollo } from "apollo-angular";
import { DataService } from "../../Services/data.service";

@Injectable()
export class QuestionService {

    constructor(private renderer:Renderer2, private dataservice: DataService, private apollo: Apollo, @Inject(QuestionStrategy) private strategies: Array<QuestionStrategy>) {
    }

    answer(type:string, answerQuestion: any, buttonNumber: number, apollo: Apollo, renderer: Renderer2, dataservice:DataService): void {
        const strategy = this.strategies.find((strategy) => {
            //console.log(strategy);
            return strategy.support(type);
        });
        strategy.answer(apollo, answerQuestion, buttonNumber, renderer, dataservice);
    }
}