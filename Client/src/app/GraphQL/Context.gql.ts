import gql from 'graphql-tag';

/**
 * @description Server: alle KontextIDs abfragen
 */
export const queryContextID: any = gql`
query{
  contexts{
    id
  }
}
`;

/**
 * @description alle Projekte abfragen
 */
export const queryAllSurveys: any=gql`
query{
  contexts(types: [LIKE, LIKEDISLIKE, FAVORITE, REGULATOR, RANKING, CHOICE]) {
    id
    activeSurvey{
      id
      description
      title
    }
  }
}`;

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

/**
 * @description Server: Query: das Projekt mittels der KontextID abfragen
 */
export const currentProjectData: any = gql`
query gContexts ($contextID: ID!){
  context(contextID: $contextID) {
    id
    name
    activeSurvey {
      id
      description
      title
      types
      questions {
        id
        description
        value
        items {
          image {
            url
            id
          }
          label
        }
        ... on LikeQuestion {
          likeIcon {
            id
            url
          }
        }
        ... on LikeDislikeQuestion {
          likeIcon {
            id
            url
          }
          dislikeIcon {
            id
            url
          }
        }
        ... on ChoiceQuestion {
          choices {
            id
            image {
              url
            }
            label
            code
          }
        }
        ... on RegulatorQuestion {
          labels {
            image {
              url
            }
            value
          }
          default
          max
          min
          stepSize
        }
        items {
          id
          image {
            url
          }
          label
        }
      }
      votes{
        answers{
          question
          __typename
          ...on LikeDislikeAnswer{
            liked
          }
          ...on LikeAnswer{
            liked
          }
          ...on ChoiceAnswer{
            choice
          }
          ...on RegulatorAnswer{
            rating
            normalized
          }
          ...on RankingAnswer{
            rankedItems
          }
          ...on FavoriteAnswer{
            favoriteItem
          }
        }
      }
    }
  }
}`;