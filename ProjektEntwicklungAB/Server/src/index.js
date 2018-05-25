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
type Image {
    _id : ID!
    filename : String!
    type : String!
    hash : String!
}

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
    active : Boolean!
    public : Boolean!
}
    type Query {
        survey(id: Int!): Survey
        surveys: [Survey]
    }
`);
var surveysData = [
    {
        id : 1,
    name : 'Projekt Entwicklung 1',
    description : 'Das ist ein Projekt für Entwicklung!',
    active : 'true',
    public : 'true'
    },
    {
        id : 2,
    name : 'Projekt Entwicklung 2',
    description : 'Das ist das zweite Projekt für Entwicklung!',
    active : 'true',
    public : 'true'
    },
    {
        id : 3,
    name : 'Projekt Entwicklung 3',
    description : 'Das ist das dritte Projekt für Entwicklung!',
    active : 'true',
    public : 'true'
    }
]
var getSurvey = function(args) { 
    var id = args.id;
    return surveysData.filter(survey => {
        return survey.id == id;
    })[0];
}
var getSurveys = function(args) {
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