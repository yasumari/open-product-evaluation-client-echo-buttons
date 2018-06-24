export type Survey = {
  id: number;
  title: string;
  description: string;
  isPublic: boolean,
  creator: Owner,
  images: Image[],
  votes: Vote;
  }
  export type Image={
    url:string;
    date: Data;
  }

  export type Data={
    id: string;
    name: string;
    type: string;
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
  id: string;
}

  export type State={
    key: string;
    value: string;
  }
  export type Question ={
    id: number;
    sequence: number;
    value: string;
    description:string; 
    images: Images[];
    owner: Owner;
    answer: Answer;
  }
  export type Owner={
    firstname: string;
    lastname: string;
    email: string
  }
  export type Images={
    _id: number;
    filename: string
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
    contextID: string,
    deviceID: string,
    questionID: number,
    itemCode: string,
    choiceCode: string
  }