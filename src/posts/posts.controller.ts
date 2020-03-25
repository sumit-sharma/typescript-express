import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Post from './posts.interface';
import postModel from "./posts.model";


class PostController {

    public path = "/posts";

    public router = express.Router();

    private post = postModel;

    constructor() {
        this.initializeRoutes();
    }


    public initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.put(`${this.path}/:id`, this.modifyPost);
        this.router.post(this.path, this.createPost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
    }



    private getAllPosts = (request: express.Request, response: express.Response) => {
        this.post.find()
            .then((posts) => {
                response.send(posts);
            });
    };


    private modifyPost = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        req.body.updated_at = new Date().toUTCString();
        const postData: Post = req.body
        this.post.findByIdAndUpdate(id, postData, { new: true })
            .then((post) => {
                res.send(post);
            });
    };

    private getPostById = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.post.findById(id)
            .then((post) => {
                res.send(post);
            });
    };


    private createPost = (req: express.Request, res: express.Response) => {
        // req.body.created_at = new Date().toUTCString();
        const postData: Post = req.body;
        console.log(postData);
        
        const createdPost = new this.post(postData);
        createdPost.save()
            .then((savedPost) => {
                res.send(savedPost);
            });
    };



    private deletePost = (req: express.Request, res: express.Response) => {
        const id = req.params.id;
        this.post.findByIdAndDelete(id)
            .then((sucessResponse) => {
                if (sucessResponse) {
                    res.send(200);
                } else {
                    res.send(404);
                }
            })
    };
}

export default PostController;
