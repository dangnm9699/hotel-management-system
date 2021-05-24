const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("account")
    .del()
    .then(function () {
      // Inserts seed entries
      let salt = bcrypt.genSaltSync(10);
      return knex("account").insert([
        {
          "username": "admin",
          "password": bcrypt.hashSync("123456", salt),
          "acctype": "Quản trị viên",
        },
        {
          "username": "letan1",
          "password": bcrypt.hashSync("123456", salt),
          "acctype": "Lễ tân",
        },
      ]);
    });
};
