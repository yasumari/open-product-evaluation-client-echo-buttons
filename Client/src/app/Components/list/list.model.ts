import gql from 'graphql-tag';

/**
 * @description Neues Gerät hinzufügen
 */
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

/**
 * @description alle Projekte abfragen
 */
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