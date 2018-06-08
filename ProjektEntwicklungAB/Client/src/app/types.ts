export type Survey = {
id: number;
name: string;
description: string;
questions: Question[];
}

export type Question ={
  id: number;
  sequence: number;
  value: string;
  description:string; 
  images: Images[];
  owner: Owner
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
}
