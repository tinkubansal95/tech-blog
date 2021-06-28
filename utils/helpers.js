const User = require("../models/User");

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  find_author: async (id) => {
    const user = (
      await User.findOne({
        where: { id },
        attributes: ["username"],
      })
    ).get({ plain: true });
    console.log(user.username);
    return user.username;
  },
};
