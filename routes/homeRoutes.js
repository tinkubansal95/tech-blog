const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;
    res.render("dashboard", { loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home", async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;
    res.render("homepage", { loggedIn });
  } catch (err) {
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
