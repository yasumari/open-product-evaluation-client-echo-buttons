import gql from 'graphql-tag';

//Mutation Answer FavoriteQuesion
export const favoriteAnswerMutate = gql`
mutation($questionID: ID!, $favoriteItem: ID!){
  createAnswer(data: {
    questionID: $questionID,
    favoriteItem: $favoriteItem
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
mutation($questionID: ID!, $choice: ID!){
  createAnswer(data: {
    questionID: $questionID
    choice: $choice
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
mutation($questionID: ID!, $rankedItems: [ID!]){
  createAnswer(data: {
     questionID: $questionID,
     rankedItems: $rankedItems
     }){
       __typename
       answer{
         __typename
         question
       }
     }
 }`;