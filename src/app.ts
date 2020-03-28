import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from "./middleware/error.middleware";

class App {
    public app: express.Application;
    public port: any;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();

    }


    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening to port ${this.port}`);
        });
    }

    private connectToDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = process.env;

        mongoose.connect(`mongodb://${MONGO_PATH}`);
    }



}

export default App;