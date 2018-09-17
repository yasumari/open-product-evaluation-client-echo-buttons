import { Injectable, Inject } from "@angular/core";
import { QuestionStrategy } from "../../QuestionStrategy/QuestionStrategy";
import { Apollo } from "apollo-angular";

@Injectable()
export class QuestionService {

    constructor(private apollo: Apollo, @Inject(QuestionStrategy) private strategies: Array<QuestionStrategy>) {
    }

    answer(type:string, answerQuestion: any, apollo: Apollo): void {
        const strategy = this.strategies.find((strategy) => {
            console.log(strategy);
            return strategy.support(type);
        });
        strategy.answer(apollo, answerQuestion);
    }
}