// Model imports
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Post.hasOne(Usedsdsdr, {
  foreignKey: "authorId",
});
User.belongsTo(Post, {
  foreignKey: "authorId",
});

// user to post
// Post.belongsTo(User, {
//   foreignKey: "authorId",
// });

// // User have many Posts
// User.hasMany(Post, {
//   foreignKey: "authorId",
//   onDelete: "CASCADE",
// });

// // user to comment
// Comment.belongsTo(User, {
//   foreignKey: "author_id",
// });

// // User have many Comments
// User.hasMany(Comment, {
//   foreignKey: "author_id",
//   onDelete: "CASCADE",
// });

// // Post to comment
// Comment.belongsTo(Post, {
//   foreignKey: "post_id",
// });

// // User have many Comments
// Post.hasMany(Comment, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });

module.exports = { Post, User };
