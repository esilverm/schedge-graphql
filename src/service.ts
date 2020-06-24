import cors from 'cors';
import express from 'express';
// import graphqlHTTP from 'express-graphql';

const app: express.Application = express();

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => res.send('hello world'));

export default app;
