// Model imports
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

//user to post
Post.belongsTo(User, {
  foreignKey: "authorId",
});
// User have many Posts
User.hasMany(Post, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "authorId",
});

User.hasMany(Comment, {
  foreignKey: "authorId",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

module.exports = { Post, User, Comment };
