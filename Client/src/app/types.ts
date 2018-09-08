export type Survey = {
  id: number;
  title: string;
  description: string;
  isPublic: boolean,
  creator: Owner,
  images: Image[],
  votes: Vote[];
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
    choices: Choice[];
    likeIcon: Image;
    dislikeIcon: Image;
    labels: Label[];
    stepSize: number;
    min: number;
    max: number;
    votes: Vote[];
  }

  export type Label={
    text: string;
    image: Image;
    value: number;
  }

  export type Choice={
    code: string;
    image:  Image;
    label: string;
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
      questions: Question[]
  }

  export type Vote={
      _id: any;
      context: string;
      answers: Answer[];
  }

  export type Answer={
    questionID: number,
    liked: boolean,
    choiceCode: string,
    rating: number;
    normalized: number;
    rankedImages: string[];
    favoriteImage: string;
    __typename: string;
  }