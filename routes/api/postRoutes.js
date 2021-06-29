const router = require("express").Router();
const Post = require("../../models/Post");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (![title, content].every((item) => item.trim() !== "")) {
      res.status(404).send({ message: "Invalid parameters" });
      return;
    }

    const newPost = await Post.create({
      ...req.body,
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
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
          authorId: req.session.user_id,
        },
      }
    );

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        authorId: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
