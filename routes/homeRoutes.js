const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const withAuth = require("../utils/auth");
var moment = require("moment");

router.get("/", withAuth, async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;
    const userPosts = await Post.findAll({
      where: { author_id: req.session.user_id },
    });
    const posts = userPosts.map((post) => ({
      ...post.get({ plain: true }),
      author: "abc",
      publishedAt: moment.parseZone(post.publishedAt).format("D/MM/YYYY"),
    }));
    console.log(posts);
    res.render("dashboard", { loggedIn, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home", async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;
    const allPosts = await Post.findAll({
      include: [{ model: User }],
    });
    /*   const posts = allPosts.map((post) => ({
      ...post.get({ plain: true }),
      author: "abc",
      publishedAt: moment.parseZone(post.publishedAt).format("D/MM/YYYY"),
    }));*/
    // console.log(await find_author(1));
    console.log(allPosts);
    res.render("homepage", { loggedIn });
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
