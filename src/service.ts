import cors from 'cors';
import express from 'express';
// import graphqlHTTP from 'express-graphql';

const app: express.Application = express();

app.use(cors({ origin: '*' }));

// app.use('/', graphqlHTTP({ schema graphiql: true }));

export default app;
