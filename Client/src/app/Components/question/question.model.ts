import gql from 'graphql-tag';

//Mutation Answer FavoriteQuesion
export const favoriteAnswerMutateTests = gql`
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

//Mutation Answer FavoriteQuesion
export const favoriteAnswerMutate = gql`
mutation($questionID: ID!, $favoriteImage: ID!, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID
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
mutation($questionID: ID!, $liked: Boolean!, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID,
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
mutation($questionID: ID!, $liked: Boolean, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID,
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
mutation($questionID: ID!, $rating: Float!, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID,
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
mutation($questionID: ID!, $choiceCode: String!, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID,
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
mutation($questionID: ID!, $deviceID: ID!, $contextID: ID!, $rankedImages: [String!]){
  createAnswer(data: {
     questionID: $questionID,
     deviceID: $deviceID,
     contextID: $contextID,
     rankedImages: $rankedImages
     }){
       __typename
       answer{
         __typename
         question
       }
     }
 }`;