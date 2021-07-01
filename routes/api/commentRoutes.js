const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/post", withAuth, async (req, res) => {
  try {
    const { postId, content } = req.body;

    if (content === "") {
      res.status(404).send({ message: "Invalid parameters" });
      return;
    }

    const newComment = await Comment.create({
      postId,
      content,
      authorId: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (e) {
    console.log(e);
    if (e?.errors) {
      res.status(500).json(e.errors.map((err) => err.path));
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
