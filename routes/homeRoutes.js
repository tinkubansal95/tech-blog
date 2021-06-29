const router = require("express").Router();
const { Post, User } = require("../models");

const withAuth = require("../utils/auth");
var moment = require("moment");

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;
    const allPosts = await Post.findAll({
      attributes: ["id", "title", "content", "publishedAt"],
      where: { authorId: req.session.user_id },
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    const posts = allPosts.map((post) => ({
      ...post.get({ plain: true }),
      publishedAt: moment.parseZone(post.publishedAt).format("D/MM/YYYY"),
      link: `updatePost/${post.id}`,
    }));
    res.render("dashboard", { loggedIn, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;
    const allPosts = await Post.findAll({
      attributes: ["title", "content", "publishedAt"],
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    const posts = allPosts.map((post) => ({
      ...post.get({ plain: true }),
      publishedAt: moment.parseZone(post.publishedAt).format("D/MM/YYYY"),
    }));
    res.render("homepage", { loggedIn, posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/createPost", withAuth, async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;
    res.render("createPost", { loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/updatePost/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: "No post with this id!" });
      return;
    }
    const post = postData.get({ plain: true });
    const loggedIn = req.session.loggedIn;
    res.render("updatePost", { loggedIn, post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signUp", async (req, res) => {
  try {
    res.render("signUp");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
