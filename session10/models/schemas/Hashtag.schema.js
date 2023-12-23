import { ObjectId } from "mongodb";

export default class Hashtag {
  constructor({ _id, name, created_at }) {
    this._id = _id || new ObjectId();
    this._name = name;
    this._created_at = created_at || new Date();
  }
}
