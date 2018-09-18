import gql from 'graphql-tag';

//Mutation Answer FavoriteQuesion
export const favoriteAnswerMutate = gql`
mutation($questionID: ID!, $favoriteImage: ID!){
  createAnswer(data: {
    questionID: $questionID,
    favoriteImage: $favoriteImage
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//Mutation Answer LikeDislikeQuestion
export const likeDislikeAnswerMutate = gql`
mutation($questionID: ID!, $liked: Boolean!){
  createAnswer(data: {
    questionID: $questionID,
    liked: $liked
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//Mutation Answer LikeQuestion
export const likeAnswerMutate = gql`
mutation($questionID: ID!, $liked: Boolean){
  createAnswer(data: {
    questionID: $questionID,
    liked: $liked
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//Mutation Answer RegulatorQuestion
export const regulatorAnswerMutate = gql`
mutation($questionID: ID!, $rating: Float!){
  createAnswer(data: {
    questionID: $questionID,
    rating: $rating 
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//Mutation Answer ChoiceQuestion
export const choiceAnswerMutate = gql`
mutation($questionID: ID!, $choiceCode: String!){
  createAnswer(data: {
    questionID: $questionID
    choiceCode: $choiceCode
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//Mutation Answer RankingQuestion
export const rankingAnswerMutate = gql`
mutation($questionID: ID!, $rankedImages: [String!]){
  createAnswer(data: {
     questionID: $questionID,
     rankedImages: $rankedImages
     }){
       __typename
       answer{
         __typename
         question
       }
     }
 }`;