const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (![title, content].every((item) => item.trim() !== "")) {
      res.status(404).send({ message: "Invalid parameters" });
      return;
    }

    const newPost = await Post.create({
      title,
      content,
      authorId: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (e) {
    if (e?.errors) {
      res.status(500).json(e.errors.map((err) => err.path));
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

// update post
router.put("/update", withAuth, async (req, res) => {
  try {
    const { id, title, content } = req.body;

    const postCheck = await Post.findOne({
      where: { id, authorId: req.session.user_id },
    });

    // check if user have access to this post
    if (!postCheck) {
      res.status(404).json({
        message:
          "No post found with this id or you don't have access to this post!",
      });
      return;
    }

    const postData = await Post.update(
      { title, content },
      {
        where: {
          id,
          authorId: req.session.user_id,
        },
      }
    );

    if (!postData) {
      res.status(404).json({
        message:
          "No post found with this id or you don't have access to this post!",
      });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/delete", withAuth, async (req, res) => {
  try {
    const { id } = req.body;

    const postData = await Post.findOne({
      where: {
        id,
        authorId: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({
        message:
          "No post found with this id or you don't have access to this post!",
      });
    }
    const commentData = await Comment.destroy({
      where: {
        postID: id,
      },
    });

    const post = await Post.destroy({
      where: {
        id,
        authorId: req.session.user_id,
      },
    });

    res.status(200).json({ post, commentData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
