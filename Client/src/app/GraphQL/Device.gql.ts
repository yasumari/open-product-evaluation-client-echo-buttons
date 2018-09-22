import gql from 'graphql-tag';

/**
 * @description Server: ein neues Device anlegen
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

export const deleteDevice: any = gql`
mutation deleteDeviceMutation ($deviceID: ID!){
  deleteDevice(deviceID: $deviceID){
    status
  }
}`;

/**
 * @description Server: ein Device mit der KontextID aktualisieren
 */
export const updateDevice: any = gql`
mutation updateDeviceMutation ($deviceID: ID!, $context: ID){
  updateDevice(data: 
    {
      context: $context
    }, deviceID: $deviceID){
    device {
      name
      id
      creationDate
    }
    }
  }`;