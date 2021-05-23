const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("NV")
    .del()
    .then(function () {
      // Inserts seed entries
      let salt = bcrypt.genSaltSync(10);
      return knex("NV").insert([
        {name: "Vũ Quang Huy", birthday: "1999-08-21", address: "Hải Dương", idNumber: "20173178", description: "Nhân viên vjp pro", phonenumber: "0956323632", role: "Bảo vệ", status: "Đang làm việc"},
        {name: "Nguyễn Thế Đức", birthday: "1999-3-7", address: "Hưng Yên", idNumber: "20170057", description: "Nhân viên vjp pro", phonenumber: "0956323633", role: "Lễ Tân", status: "Đang làm việc"},
        {name: "Nguyễn Minh Hiếu", birthday: "1999-07-26", address: "Hải Dương", idNumber: "20173115", description: "Nhân viên vjp pro", phonenumber: "0956323634", role: "Lao Công", status: "Đã nghỉ việc"},
        {name: "Nguyễn Kỳ Tùng", birthday: "1999-07-03", address: "Bắc Ninh", idNumber: "20173455", description: "Nhân viên vjp pro", phonenumber: "0956323452", role: "Bảo vệ", status: "Đang làm việc"},
        {name: "Nguyễn Minh Đăng", birthday: "1999-01-22", address: "Bắc Ninh", idNumber: "20173245", description: "Nhân viên vjp pro", phonenumber: "0956213632", role: "Bảo vệ", status: "Đang làm việc"},
        {name: "Nguyễn Hoàng Thuận", birthday: "1999-03-15", address: "Hải Phòng", idNumber: "20173393", description: "Nhân viên vjp pro", phonenumber: "0956569832", role: "Lễ Tân", status: "Đang làm việc"},
        {name: "Nguyễn Kỳ Hiếu", birthday: "1990-05-19", address: "Hải Dương", idNumber: "20173365", description: "Nhân viên vjp pro", phonenumber: "0956123532", role: "Bảo vệ", status: "Đã nghỉ việc"},
        {name: "Vũ Quang Thuận", birthday: "1995-10-27", address: "Hải Dương", idNumber: "20173258", description: "Nhân viên vjp pro", phonenumber: "0123923632", role: "Lao công", status: "Đang làm việc"},
        {name: "Cristiano Ronaldo", birthday: "1985-03-21", address: "Hải Dương", idNumber: "20173958", description: "Nhân viên vjp pro", phonenumber: "0912363632", role: "Bảo vệ", status: "Đang làm việc"},
        {name: "Leonardo Messi", birthday: "1986-05-25", address: "Hải Dương", idNumber: "20171258", description: "Nhân viên vjp pro", phonenumber: "0951236632", role: "Lễ Tân", status: "Đã nghỉ việc"},
      ]);
    });
};