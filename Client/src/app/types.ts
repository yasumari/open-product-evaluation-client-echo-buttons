export type Survey = {
  id: number;
  title: string;
  description: string;
  isPublic: boolean,
  creator: Owner,
  images: Image[],
  votes: Vote;
  questions: Question[]
  }

  export type Context={
    name: string;
    id: string;
    lastUpdate: Date;
    creationDate: Date;
    activeQuestion: Question,
    activeSurvey: Survey,
    owners: Owner[],
    devices: Device[],
    states: State[]
  }
export type Device={
  name: string;
  token: string;
  id: string;
}

  export type State={
    key: string;
    value: string;
  }
  export type Question ={
    id: number;
    value: string;
    description:string; 
    __typename: string;
    items: Item[];
  }
  export type Owner={
    firstname: string;
    lastname: string;
    email: string
  }
  export type Item={
    label: string; 
    image: Image;
  }
  
  export type Image={
    id: string;
    name: string;
    type: string; 
    hash: string;
    tags: string;
    url: string;
  }
  export type Query={
      surveys: Survey[];
      survey: Survey;
      questions: Question[];
      votes: Vote;
  }
  export type Vote={
      _id: any;
      survey: Survey;
  }

  export type Answer={
    questionID: number,
    contextID: string,
    deviceID: string
  }