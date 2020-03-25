import  * as mongoose from "mongoose";
import Post  from "./posts.interface";

const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    title: String
},{
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);
export default postModel;