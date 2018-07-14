import gql from 'graphql-tag';

export const newDeviceMutation: any = gql`
mutation addNewDevice ($deviceName: String!){
	createDevice(data: {
  	name: $deviceName
  }){
    device{
      id
      name
      creationDate
    }
    token
  } 
}`;
/*
export const queryAllSurveys: any=gql`
query list{
    surveys{
        id
        title
        description
        creator{
          lastName
          firstName
        }
    }
}
`;*/

export const queryAllSurveys: any=gql`
query{
  contexts{
    id
    activeSurvey{
      id
      description
      creator{
        lastName
        firstName
      }
      title
    }
  }
}`;