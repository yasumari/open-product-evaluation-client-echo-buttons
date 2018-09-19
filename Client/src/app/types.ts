export type Survey = {
  id: string;
  title: string;
  description: string;
  isPublic: boolean,
  votes: Vote[];
  types: string[];
  questions: Question[]
  }

  export type Context={
    name: string;
    id: string;
    activeSurvey: Survey
  }
export type Device={
  name: string;
  token: string;
  id: string;
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
    id: string;
    label: string;
    image: Image;
    value: number;
  }

  export type Choice={
    code: string;
    image:  Image;
    label: string;
    id: string;
  }

  export type Item={
    id: string;
    label: string; 
    image: Image;
  }
  
  export type Image={
    id: string;
    name: string;
    url: string;
  }

  export type Vote={
      _id: any;
      context: string;
      answers: Answer[];
  }

  export type Answer={
    question: number,
    liked: boolean,
    choice: string,
    rating: number;
    normalized: number;
    rankedItems: string[];
    favoriteItem: string;
    __typename:string;
  }