const { Post, User, Comment } = require("../../models");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (![username, password].every((item) => item.trim() !== "")) {
      res.status(404).send({ message: "Invalid parameters" });
      return;
    }

    const usernameUser = await User.findOne({
      where: { username },
    });

    if (usernameUser) {
      res.status(404).json({ message: "That username is already taken" });
      return;
    }

    const user = await User.create({
      username,
      password,
    });

    const { id } = user.get({ plain: true });

    req.session.save(() => {
      req.session.user_id = id;
      req.session.loggedIn = true;

      res.status(200).json({
        status: "success",
        user: { username },
      });
    });
  } catch (e) {
    if (e?.errors) {
      res.status(500).json(e.errors.map((err) => err.path));
      return;
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (![username, password].every((item) => item.trim() !== "")) {
      res.status(404).send({ message: "Invalid parameters" });
      return;
    }

    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: "Invalid username or password" });
      return;
    }

    if (!(await user.checkPassword(password))) {
      res.status(404).json({ message: "Invalid username or password" });
      return;
    }

    const { id } = await user.get({
      plain: true,
    });

    req.session.save(() => {
      req.session.user_id = id;
      req.session.loggedIn = true;
      res
        .status(200)
        .json({ user: username, message: "You are now logged in!" });
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
