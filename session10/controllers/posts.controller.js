import postService from "../services/posts.service.js";

export const createPostController = async (req, res, next) => {
  const { user_id } = req.decode_authorization;
  const result = await postService.createPost(user_id, req.body);
  return res.json({
    message: "Create post successfully",
    result,
  });
};

export const getPostDetailsController = async (req,res, next) => {
  const post = await postService.getPostById(req.params.id);
  return res.json({
    results: post,
    status: Array.isArray(post) && post.length > 0 ? 200 : 404
  });
};
