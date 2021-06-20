// Model imports
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// user to post
Post.belongsTo(User, {
  foreignKey: "authorId",
});

// User have many Posts
User.hasMany(Post, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
});

// user to comment
Comment.belongsTo(User, {
  foreignKey: "authorId",
});

// User have many Comments
User.hasMany(Comment, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
});

// Post to comment
Comment.belongsTo(Post, {
  foreignKey: "postId",
});

// User have many Comments
Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});
