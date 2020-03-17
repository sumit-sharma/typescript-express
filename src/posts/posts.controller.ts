import * as express from 'express';
import Post from './posts.interface';

class PostController {

    public path = "/posts";

    public router = express.Router();

    private posts: Post[] = [
        {
            "author": "anmol rawat",
            "content": "fictional",
            "title": "unprivilaged child",
            "time": new Date().toUTCString(),
        }
    ];

    constructor() {
        this.initializeRoutes();
    }


    public initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createAPost);
    }



    getAllPosts = (request: express.Request, response: express.Response) => {
        // this.posts.pop();
        response.send(this.posts);
    };


    createAPost = (req: express.Request, res: express.Response) => {
        req.body.time = new Date().toUTCString();
        const post: Post = req.body;
        this.posts.push(post);
        res.send(post);
    };
}

export default PostController;
