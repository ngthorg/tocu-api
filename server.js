import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import config from './config';
import Schema from './graphql/schema';
import loaders from './graphql/loaders';

const app = express();

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use('/accountkit/sendcode', (req, res) => res.send('Hello world!!!'))
  .use('/', graphqlHTTP(req => ({
    schema: Schema,
    pretty: true,
    graphiql: true,
    rootValue: {
      access_token: req.query.access_token || null,
    },
    context: { loaders },
    // formatError: error => ({
    //   message: error.message,
    //   locations: error.locations,
    //   stack: error.stack,
    //   name: error.name
    // })
  })));

app.set('port', config.main.port || process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Node app listening at ${config.main.siteUrl}
    with NodeJS ${process.version}`);
});
