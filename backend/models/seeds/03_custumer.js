const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Khach")
    .del()
    .then(function () {
      // Inserts seed entries
      let salt = bcrypt.genSaltSync(10);
      return knex("Khach").insert([
        { phonenumber: "0965823651", name: "Vũ Quang Huy", email: "fleurent@mracc.it", country: "Việt Nam", idNumber: "123365485"},
        { phonenumber: "0965842582", name: "Nguyễn Thế Đức", email: "Somes1933@cuvox.de", country: "Việt Nam", idNumber: "155355128"},
        { phonenumber: "0866120915", name: "Nguyễn Kỳ Tùng", email: "hivehe8045@drluotan.com", country: "Việt Nam", idNumber: "123625235"},
        { phonenumber: "0382393033", name: "Nguyễn Hoàng Thuận", email: "dshervincharles7g@vixo.net", country: "Việt Nam", idNumber: "953684236"},
        { phonenumber: "0862047484", name: "Nguyễn Minh Hiếu", email: "chinanumber2g@forex-ecn.com", country: "Việt Nam", idNumber: "123547895"},
        { phonenumber: "0976024778", name: "Nguyễn Kỳ Hiếu", email: "chinanumber2g@forex-ecn.com", country: "Việt Nam", idNumber: "236533587"},
        { phonenumber: "0867848099", name: "Nguyễn Thế Tùng", email: "fleurent@mracc.it", country: "Việt Nam", idNumber: "362354878"},
        { phonenumber: "0343323632", name: "Vũ Quang Thuận", email: "dshervincharles7g@forex-ecn.com", country: "Việt Nam", idNumber: "1235478202"},
        { phonenumber: "0865864039", name: "Nguyễn Minh Đăng", email: "chinanumber2g@wimbl.com", country: "Việt Nam", idNumber: "123698572"},
        { phonenumber: "0865800090", name: "Nguyễn Minh Đức", email: "Somes1933@cuvox.de", country: "Việt Nam", idNumber: "153987561"},
        { phonenumber: "0374411386", name: "Vũ Minh Đức", email: "dshervincharles7g@vixo.net", country: "Việt Nam", idNumber: "965784258"},
        { phonenumber: "0389230266", name: "Vũ Thế Hiếu", email: "dshervincharles7g@forex-ecn.com", country: "Việt Nam", idNumber: "965843672"},
        { phonenumber: "0869942414", name: "Salman Whitney", email: "Somes1933@cuvox.de", country: "Hoa Kỳ", idNumber: "95875686442"},
        { phonenumber: "0988959843", name: "Parker Ramirez", email: "hivehe8045@drluotan.com", country: "Hoa Kỳ", idNumber: "465448151467"},
        { phonenumber: "0379413786", name: "Lewie Peralta", email: "fleurent@mracc.it", country: "Hoa Kỳ", idNumber: "123655898541"},
        { phonenumber: "0973040820", name: "Scarlett Carney", email: "dshervincharles7g@forex-ecn.com", country: "Hoa Kỳ", idNumber: "59867835782"},
        { phonenumber: "0975676894", name: "Reya Salazar", email: "dshervincharles7g@vixo.net", country: "Hoa Kỳ", idNumber: "96895812368"},
        { phonenumber: "0978973647", name: "Jada Holding", email: "Somes1933@cuvox.de", country: "Hoa Kỳ", idNumber: "98759982365"},
        { phonenumber: "0337240439", name: "Barack Obama", email: "hivehe8045@drluotan.com", country: "Hoa Kỳ", idNumber: "986325877988"},
      ]);
    });
};