import { QuestionStrategy } from "./QuestionStrategy";

export class likeDislikeStrategy extends QuestionStrategy {
    
    answer(answerQuestion: any){
        console.log("HALLO AUS DER LIKEDISLIKE STRATEGY");
    }
    support(questiontype:string){
        console.log("JA supported");
        if (questiontype=="LikeDislikeQuestion"){
            return true;
        }
    }
}