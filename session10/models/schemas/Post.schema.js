import { ObjectId } from "mongodb";

export default class Post {
  constructor({ _id, user_id, content, hashtags, created_at, updated_at }) {
    this._id = _id || new ObjectId();
    this.user_id = user_id;
    this.content = content;
    this.hashtags = hashtags || [];
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
  }
}
