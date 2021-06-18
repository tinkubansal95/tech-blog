const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home", async (req, res) => {
  try {
    res.render("homepage");
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
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
