/*const {GraphQLServer} = require('graphql-yoga')
const {express: middleware} = require('graphql-voyager/middleware')

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {}
})

server.express.use('/voyager', middleware({endpointUrl: '/'}))

server.start({port: 3000}, () => console.log('Server is running on http://localhost:3000'))*/

var express = require('express');
var cors = require('cors')
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
type Question {
    _id : ID!
    survey : Survey!
    value: String!
    description : String!
    sequence : Int!
    evaluationMethod : EvaluationMethod!
    images : [Image!]!
}

type EvaluationMethod {
    _id : ID!
    type : EvaluationType!
    stepSize: Float!
    stepDescriptions: [StepDescription!]!
    default: Float
    min: Float!
    max: Float!
}

enum EvaluationType {
    LIKE
    LIKE_DISLIKE
    STEPS
    REGULATOR
    RANKING
    FAVORITE
}

type StepDescription {
    value : String!
    image : Image
    sequence : Int!
}

type Survey {
    id : ID!
    name : String!
    description : String!
    owner : User!
    active : Boolean!
    public : Boolean!
    questions : [Question!]!
    votes : [Vote!]!
    images : [Image!]!
}

type User {
    _id : ID!
    firstname : String!
    lastname : String!
    email : String!
    password : String!
}

type Vote {
    _id : ID!
    survey : Survey!
}
type Image {
    _id : ID!
    filename : String!
    type : String!
    hash : String!
}


    type Query {
        survey(id: Int): Survey
        surveys: [Survey]
    }
`);

var surveysData = [
   {
    id : 1,
    name : 'Projekt Entwicklung 1',
    description : 'Das ist ein Projekt für Entwicklung!',
    owner : {
            _id : 1,
            firstname : 'Alexander',
            lastname : 'Baum',
            email : 'a.b@ab.com'
    },
    active : 'true',
    public : 'true',
    questions : [{
                _id : 1,
                value: 'In welchem Bild sind die Farben besser?',
                description : 'StyleGuide',
                sequence : 1,
                images : 
                    [{
                    _id : 1,
                    filename : '1.png'},
                    {
                    _id : 2,
                    filename : '2.png'
                    }]
                },
                {
                _id : 2,
                value: 'Was gefällt Ihnen besser?',
                description : 'Geschmack',
                sequence : 2,
                images : 
                    [{
                    _id : 3,
                    filename : '3.png'},
                    {
                    _id : 4,
                    filename : '4.png'
                    }]
                }]
},
    {
        id : 2,
    name : 'Projekt Entwicklung 2',
    description : 'Das ist zweite Projekt für Entwicklung!',
    owner : {
            _id : 1,
            firstname : 'ZZ',
            lastname : 'XX',
            email : 'a.b@ab.com'
    },
    active : 'true',
    public : 'true',
    questions : [{
                _id : 1,
                value: 'Lieber links oder rechts??',
                description : 'StyleGuide',
                sequence : 1,
                images : 
                    [{
                    _id : 1,
                    filename : '1.png'},
                    {
                    _id : 2,
                    filename : '2.png'
                    }]
                },
                {
                _id : 2,
                value: 'Was gefällt Ihnen besser?',
                description : 'Geschmack',
                sequence : 2,
                images : 
                    [{
                    _id : 3,
                    filename : '3.png'},
                    {
                    _id : 4,
                    filename : '4.png'
                    }]
                }]
    }
]

var getSurvey = function(args) { 
    console.log("getSurvey");
    
    if (args.id>0 || surveysData.length==0){
            var id = args.id;
    }
    else {
        var id=1;
    }
    return surveysData.filter(survey => {
        return survey.id == id;
    })[0];
}

var getSurveys = function(args) {
    console.log("alle Surveys");
    if (args.topic) {
        var name = args.name;
        return surveysData.filter(survey => survey.name === name);
    } else {
        return surveysData;
    }
}

var root = {
    survey: getSurvey,
    surveys: getSurveys
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));