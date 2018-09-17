import { Apollo } from 'apollo-angular';

export abstract class QuestionStrategy {
    abstract answer(apollo: Apollo, answerQuestion: any): void;
    abstract support(type: string): boolean;
}