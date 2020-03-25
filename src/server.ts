import 'dotenv/config';
import App from './app';

import PostController from "./posts/posts.controller";



const app = new App(
    [
        new PostController(),

    ]
);

app.listen();














// import * as express from 'express';
// import * as bodyParser from 'body-parser';

// function loggerMiddleware(request: express.Request, response: express.Response, next) {
//     console.log(`${request.method} ${request.path}`);
//     next();
// }
// const app = express();
// app.use(loggerMiddleware);

// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });


// app.post('/', (req, res) => {
//     res.send(req.body.title)
// });

// app.listen(5000);