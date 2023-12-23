import { ObjectId } from "mongodb";
import Post from "../models/schemas/Post.schema.js";
import databaseService from "./database.service.js";
import Hashtag from "../models/schemas/Hashtag.schema.js";

class PostService {
  async validateandCreateHashtag(hashtags) {
    const hashtagsDoc = await Promise.all(
      hashtags.map((hashtag) =>
        databaseService.hashtags.findOneAndUpdate(
          {
            name: hashtag,
          },
          {
            $setOnInsert: new Hashtag({ name: hashtag }),
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        )
      )
    );
    const hashtagId = hashtagsDoc.map((hashtag) => hashtag._id);
    console.log(hashtagId);
    return hashtagId;
  }
  async createPost(user_id, body) {
    const hashtags = await this.validateandCreateHashtag(body.hashtags);
    const result = await databaseService.posts.insertOne(
      new Post({ user_id, content: body.content, hashtags })
    );
    const post = databaseService.posts.findOne({
      _id: new ObjectId(result.insertedId),
    });
    return post;
  }

  async getPostById(id = ""){
      if (id == null || id === "") {
          return [];
      }

      return databaseService.posts.aggregate([
          {
              $match: {
                  _id: new ObjectId(id)
              }
          },
          {
              $lookup: {
                  from: "hashtags",
                  localField: "hashtags",
                  foreignField: "_id",
                  as: "hashtags"
              }
          }
      ]).toArray();
  }
}

const postService = new PostService();
export default postService;
